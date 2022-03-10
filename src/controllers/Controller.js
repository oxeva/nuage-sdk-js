import { v4 as uuidv4 } from 'uuid';
import Logger from '../utils/Logger';
import Request from '../Request';
import EventSource from '../EventSource';
import { URL_INVITATIONS, URL_TOKEN_EVENT } from '../utils/urls';
import Invitation from '../entities/Invitation';

export default class Controller {
    Request = Request;

    // Should defined in child class
    url = null;

    // Used to correctly dispatch events to matching event topics.
    topicUrl = null;

    // Used to correctly remove callback in EventSource.subscriptions array.
    updateKey = null;

    // Should defined in child class
    #customErrors = null;

    set customErrors(value) {
        this.#customErrors = value;
    }

    #areFieldsValid = false;

    #promise;

    set promise(value) {
        if (value instanceof Promise) {
            this.#promise = value;
        }
    }

    /**
     * Returns custom error
     */
    getError(res = {}) {
        Logger.debug('Controller.getError()', { res });

        // No data retrived from the API
        const hasNoData = !('@id' in res);

        // An custom error exists for this exception
        const hasCustomError = res.status && this.#customErrors?.[res.status];

        // Houston, have we a problem ?
        const hasError = hasNoData && hasCustomError;

        // Returns the custom error if there are a problem
        return hasError ? new this.#customErrors[res.status](res) : false;
    }

    /**
     * Check properties of the entity before to send request
     */
    #checkFields(entity, required = {}) {
        Logger.debug('Controller.#checkFields()', {
            entity,
            required,
        });

        // Check if a field is missing
        const missing = Object.keys(required).filter(
            (key) => !entity[key] && typeof entity[key] !== 'boolean',
        );

        // Format missing fields
        const missingFields = missing.map((item) => `"${item}"`).join(', ');

        // Check if a required field is missing
        if (missingFields.length) {
            Logger.error(`Missing fields to post: ${missingFields}.`);
        }

        this.#areFieldsValid = Boolean(!missingFields.length);
    }

    async setMercureTokenUnlogged(id) {
        Logger.debug('Controller.setMercureTokenUnlogged()', { id });

        EventSource.unsubscribe({ resetSubscriptions: false });

        await this.Request.post(
            URL_TOKEN_EVENT,
            JSON.stringify([`${URL_INVITATIONS}/${id}`]),
        ).then(({ response }) => {
            this.Request.eventToken = response?.token;
        });
    }

    async setMercureTokenLogged() {
        Logger.debug('Controller.setMercureTokenLogged()');

        EventSource.unsubscribe({ resetSubscriptions: false });

        await this.Request.get(URL_TOKEN_EVENT).then(({ response }) => {
            this.Request.eventToken = response?.token;
        });
    }

    /**
     * Retrieve entity
     */
    async #getSingle(param, Entity) {
        Logger.debug('Controller.#getSingle()');

        const queryUrl = `${this.url}/${param}`;
        this.topicUrl = queryUrl;

        this.promise = this.Request.get(queryUrl)
            .then(async ({ response, hubUrl }) => {
                // Get custom error
                const error = this.getError(response);

                // Format response
                const data = new Entity(response);

                if (error) {
                    throw error;
                }

                if (Entity === Invitation && !this.Request.token) {
                    await this.setMercureTokenUnlogged(param);
                }

                return { data, error, hubUrl };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: undefined, error };
            });
    }

    /**
     * Retrieve entity from the API
     */
    getById(id, Entity) {
        Logger.debug('Controller.getById()', { id, Entity });

        this.#getSingle(id, Entity);

        return this;
    }

    getByName(name, Entity) {
        Logger.debug('Controller.getByName()', { name, Entity });

        this.#getSingle(name, Entity);

        return this;
    }

    /**
     * Retrieve the collection of entity
     */
    getAll(Entity, filters = {}) {
        Logger.debug('Controller.getAll()', { Entity, filters });

        const queryUrl = this.url;
        this.topicUrl = queryUrl;

        this.promise = this.Request.get(queryUrl, filters)
            .then(({ response, hubUrl }) => {
                // Get custom error
                const error = this.getError(response);

                // Format response
                const data = response?.['hydra:member']?.map(
                    (item) => new Entity(item),
                ) || response;

                if (error) {
                    throw error;
                }

                return { data, error, hubUrl };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: undefined, error };
            });

        return this;
    }

    /**
     * Send a new entity to API to create it
     */
    post(entity, required, Base) {
        Logger.debug('Controller.post()', { entity, required, Base });

        this.#checkFields(entity, required);

        const opts = JSON.stringify({ ...entity, ...required });

        if (!this.#areFieldsValid) {
            this.promise = { data: entity };

            return this;
        }

        this.promise = this.Request.post(this.url, opts)
            .then(({ response }) => {
                // Get custom error
                const error = this.getError(response);

                if (error) {
                    throw error;
                }

                // Format response
                const data = new Base(response);

                return { data, error };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: entity, error };
            });

        return this;
    }

    /**
     * Await a response about request in progress
     */
    onReady(callback) {
        Logger.debug('Controller.onReady()', { callback });

        // This is not callback expected
        if (typeof callback !== 'function') {
            Logger.error('Callback expected should be a function.');

            return this;
        }

        if (this.#promise instanceof Promise) {
            this.#promise.then(({ error, data }) => {
                callback(error, data);
            });
        }

        return this;
    }

    /**
     * Await a response
     */
    onUpdate(callback) {
        Logger.debug('Controller.onUpdate', { callback });

        this.updateKey = uuidv4();

        // This is not callback expected
        if (typeof callback !== 'function') {
            return this;
        }

        EventSource.subscribeToTopic({ topic: this.topicUrl, key: this.updateKey, callback });

        if (!EventSource.isOpen) {
            this.#promise.then(({ hubUrl }) => {
                if (!hubUrl) {
                    return;
                }

                EventSource.subscribe(hubUrl);
            });
        }

        return this;
    }

    /**
     * Unsubscribe from onUpdate events
     */
    unsubscribe() {
        Logger.debug('Controller.unsubscribe()');

        EventSource.unsubscribeFromTopic({ key: this.updateKey });
    }
}
