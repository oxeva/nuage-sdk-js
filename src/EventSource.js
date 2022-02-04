import EventSourceHeader from 'eventsource';

import Request from './Request';
import EntityFactory from './utils/EntityFactory';
import lcfirst from './utils/lcfirst';
import Logger from './utils/Logger';
import {
    URL_INVITATIONS,
    URL_IPS,
    URL_KEYPAIRS,
    URL_ORGANIZATIONS,
    URL_PROJECTS,
    URL_PROJECTS_USAGES,
    URL_SECURITY_GROUPS,
    URL_SERVERS,
    URL_TOKEN_EVENT,
    URL_USERS,
} from './utils/urls';

export default class EventSource {
    // CurrentEnventSource Stream
    static stream;

    // Is a subscription in progress
    static isOpen = false;

    // Is the current page reloading, so we know to not try to reconnect when true.
    static isReloading = false;

    // The last event id returned by Mercure
    static lastEventId;

    // The list of entities that support Mercure events
    static entitiesSubscriptionList = [
        { url: URL_INVITATIONS, name: 'Invitation' },
        { url: URL_KEYPAIRS, name: 'Keypair' },
        { url: URL_ORGANIZATIONS, name: 'Organization' },
        { url: URL_PROJECTS, name: 'Project' },
        { url: URL_USERS, name: 'User' },
        { url: URL_IPS, name: 'Ip' },
        { url: URL_SECURITY_GROUPS, name: 'SecurityGroup' },
        { url: URL_PROJECTS_USAGES, name: 'ProjectUsage' },
        { url: URL_SERVERS, name: 'Server' },
    ];

    /**
     * Store last event id recieved from the latest request send
     */
    set lastEventId(lastEventId) {
        Logger.debug('EventSource.lastEventId()', { lastEventId });

        this.lastEventId = lastEventId;
    }

    /**
     * Allows us to generate a new Mercure token
     */
    static async login(url, callback) {
        Logger.debug('EventSource.login()', { url, callback });

        this.logout();

        const { response } = await Request.get(URL_TOKEN_EVENT);
        Request.eventToken = response?.token;

        this.subscribe(url, callback);
    }

    /**
     * Clears all information related to the current EventSource
     */
    static logout() {
        Logger.debug('EventSource.logout()');

        this.unsubscribe();
        Request.eventToken = undefined;
        this.lastEventId = null;
    }

    /**
     * Closes the subscription
     */
    static unsubscribe() {
        Logger.debug('EventSource.unsubscribe()');

        this.isOpen = false;

        if (!this.stream) {
            return;
        }

        if (typeof this.stream.close === 'function') {
            this.stream.close();
        }

        this.stream = null;
    }

    /**
     * Stop the subscription when internet connection is lost
     */
    static offlineListener() {
        Logger.debug('EventSource.offlineListener()');

        this.unsubscribe();

        window.removeEventListener('offline', this.offlineListener);
    }

    /**
     * Resume the subscription when the internet network is restored
     */
    static onlineListener(url, callback) {
        Logger.debug('EventSource.onlineListener()', { url, callback });

        this.subscribe(url, callback);

        window.removeEventListener('online', this.onlineListener);
    }

    /**
     * Performed when opening a new EventSource
     */
    static onOpen(url, callback) {
        Logger.debug('EventSource.onOpen()', { url, callback });

        window.addEventListener('offline', () => {
            this.offlineListener();
        });

        window.addEventListener('online', () => {
            this.onlineListener(url, callback);
        });

        window.addEventListener('beforeunload', () => {
            this.isReloading = true;
        });
    }

    /**
     * Performed when connection to the EventSource is lost
     */
    static onError({ event, url, callback }) {
        Logger.debug('EventSource.onError()', { event, url, callback });

        this.unsubscribe();

        // Don't try to reconnect when already connected,
        // reloading page, access forbidden, or offline.
        if (
            this.isOpen
            || this.isReloading
            || event.status === 401
            || !navigator.onLine
        ) {
            return;
        }

        Logger.info(
            'Connection to retrieve data in real-time lost. Trying to reconnect.',
        );

        this.subscribe(url, callback);
    }

    /**
     * Format data to retrieve entity assumed
     */
    static async formatData({ event = {}, url = '', callback = () => {} }) {
        Logger.debug('EventSource.formatData()', { event, url, callback });

        // Retrieve type of the entity
        let entityName = event?.['@type'];
        const id = event?.['@id'];

        if (!entityName) {
            this.entitiesSubscriptionList.forEach((entityInfo) => {
                if (!id?.startsWith(entityInfo.url) || entityName) {
                    return;
                }

                entityName = entityInfo.name;
            });
        }

        const Entity = EntityFactory.use(lcfirst(entityName));

        if (!Entity) {
            Logger.notice('New event received but unknown', event);

            return null;
        }

        if (entityName === 'Project') {
            await this.login(url, callback);
        }

        const entity = new Entity({ ...event, id });

        // Clean up properties
        Object.keys(entity).forEach((key) => {
            // Remove undefined properties
            // and empty arrays
            if (
                entity[key] === undefined
                || (Array.isArray(entity[key]) && !entity[key].length)
            ) {
                delete entity[key];
            }
        });

        Logger.notice(`New event received from ${entityName}`, entity);

        return entity;
    }

    /**
     * Performed when an event is retrieved
     */
    static onMessage({ event, url, callback }) {
        this.formatData({
            event: JSON.parse(event.data),
            url,
            callback,
        }).then((data) => {
            this.lastEventId = event.lastEventId;

            try {
                if (this.isOpen) {
                    callback(false, data);
                }
            } catch (error) {
                Logger.error('Error occurred in the callback event', error);
            }
        });
    }

    /**
     * Open the subscription connection
     */
    static subscribe(hubUrl, callback) {
        Logger.debug('EventSource.subscribe()', { hubUrl, callback });

        if (typeof callback !== 'function') {
            return;
        }

        // Should be string but the onError() method return an object when retrying...
        let formattedHubUrl = hubUrl;
        if (typeof hubUrl === 'object' && hubUrl?.origin && hubUrl?.pathname) {
            formattedHubUrl = hubUrl.origin + hubUrl.pathname;
        }

        const url = new URL(formattedHubUrl);
        url.searchParams.set('topic', '*');

        if (this.lastEventId) {
            url.searchParams.set('Last-Event-ID', this.lastEventId);
        }

        if (this.stream) {
            this.unsubscribe();
        }

        // Create the connection with authentication
        this.stream = new EventSourceHeader(url.toString(), {
            headers: {
                Authorization: `Bearer ${Request.eventToken}`,
            },
        });

        if (!this.stream) {
            return;
        }

        this.isOpen = true;

        this.stream.onopen = () => this.onOpen(url, callback);
        this.stream.onerror = (event) => this.onError({ event, url, callback });
        this.stream.onmessage = (event) => this.onMessage({ event, url, callback });
    }
}
