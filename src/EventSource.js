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

    // List of active subscription topics and callbacks.
    static subscriptions = [];

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
    static async login(url) {
        Logger.debug('EventSource.login()', { url });

        this.unsubscribe({ resetSubscriptions: false });
        this.lastEventId = null;

        const { response } = await Request.get(URL_TOKEN_EVENT);
        Request.eventToken = response?.token;

        this.subscribe(url);
    }

    /**
     * Clears all information related to the current EventSource
     */
    static logout() {
        Logger.debug('EventSource.logout()');

        this.unsubscribe({ resetSubscriptions: true });
        Request.eventToken = undefined;
        this.lastEventId = null;
    }

    /**
     * Closes the subscription
     */
    static unsubscribe({ resetSubscriptions }) {
        Logger.debug('EventSource.unsubscribe()', { resetSubscriptions });

        this.isOpen = false;

        if (resetSubscriptions) {
            this.subscriptions = [];
        }

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

        this.unsubscribe({ resetSubscriptions: false });

        window.removeEventListener('offline', this.offlineListener);
    }

    /**
     * Resume the subscription when the internet network is restored
     */
    static onlineListener(url) {
        Logger.debug('EventSource.onlineListener()', { url });

        this.subscribe(url);

        window.removeEventListener('online', this.onlineListener);
    }

    /**
     * Performed when opening a new EventSource
     */
    static onOpen(url) {
        Logger.debug('EventSource.onOpen()', { url });

        window.addEventListener('offline', () => {
            this.offlineListener();
        });

        window.addEventListener('online', () => {
            this.onlineListener(url);
        });

        window.addEventListener('beforeunload', () => {
            this.isReloading = true;
        });
    }

    /**
     * Performed when connection to the EventSource is lost
     */
    static onError({ event, url }) {
        Logger.debug('EventSource.onError()', { event, url });

        this.unsubscribe({ resetSubscriptions: false });

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

        this.subscribe(url);
    }

    /**
     * Format data to retrieve entity assumed
     */
    static async formatData({ event = {}, url = '' }) {
        Logger.debug('EventSource.formatData()', { event, url });

        // Retrieve type of the entity
        let entityName = event?.['@type'];
        const id = event?.['@id'];
        const topic = event?.['@id'];

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
            await this.login(url);
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

        return { topic, data: entity };
    }

    /**
     * Adds a new callback to be executed when we have a matching topic.
     */
    static subscribeToTopic({ topic, key, callback }) {
        Logger.debug('EventSource.subscribeToTopic()', { topic, key, callback });

        const alreadyExists = this.subscriptions.find(
            (subscription) => (
                subscription.callback.toString() === callback.toString()
                && subscription.topic === topic
            ),
        );

        if (!alreadyExists) {
            this.subscriptions.push({ topic, key, callback });
        }
    }

    /**
     * Removes an active subscription.
     */
    static unsubscribeFromTopic({ key }) {
        Logger.debug('EventSource.unsubscribeFromTopic()', { key });

        const index = this.subscriptions.findIndex((subscription) => subscription.key === key);

        if (index > -1) {
            this.subscriptions.splice(index, 1);
        }
    }

    /**
     * Dispatches events to callbacks in subscriptions array matching the topic.
     */
    static dispatchEvent({ eventData, eventTopic }) {
        Logger.debug('EventSource.dispatchEvent()', { eventData, eventTopic });

        this.subscriptions.map((subscription) => {
            try {
                if (eventTopic.includes(subscription.topic)) {
                    subscription.callback(false, eventData);
                }
            } catch (error) {
                Logger.error('Error occurred in the callback event', error);
            }
            return this;
        });
    }

    /**
     * Performed when an event is retrieved
     */
    static onMessage({ event, url }) {
        Logger.debug('EventSource.onMessage()', { event, url });

        this.formatData({
            event: JSON.parse(event.data),
            url,
        }).then(({ topic, data }) => {
            this.lastEventId = event.lastEventId;

            try {
                if (this.isOpen) {
                    this.dispatchEvent({ eventData: data, eventTopic: topic });
                }
            } catch (error) {
                Logger.error('Error occurred in the callback event', error);
            }
        });
    }

    /**
     * Open the events connection.
     * We only keep one incoming stream of data and then dispatch it to active subscriptions.
     */
    static subscribe(hubUrl) {
        Logger.debug('EventSource.subscribe()', { hubUrl });

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
            this.unsubscribe({ resetSubscriptions: false });
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

        this.stream.onopen = () => this.onOpen(url);
        this.stream.onerror = (event) => this.onError({ event, url });
        this.stream.onmessage = (event) => this.onMessage({ event, url });
    }
}
