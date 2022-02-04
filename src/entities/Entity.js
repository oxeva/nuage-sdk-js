import Logger from '../utils/Logger';
import Request from '../Request';

export default class Entity {
    #Request = Request;

    get Request() {
        return this.#Request;
    }

    // Should be defined in child class
    #url = null;

    // Should be defined in child class
    #className = null;

    set className(value) {
        this.#className = value;
    }

    get className() {
        return this.#className;
    }

    /**
     * @memberof Entity
     */
    set url(value) {
        this.#url = value;
    }

    // Should be defined in child class
    #customErrors = null;

    #promise;

    set promise(value) {
        if (value instanceof Promise) {
            this.#promise = value;
        }
    }

    set customErrors(value) {
        this.#customErrors = value;
    }

    #original = null;

    set original(value) {
        this.#original = value;
    }

    get original() {
        return this.#original;
    }

    /**
     * Update entity
     */
    flush(options, method = 'put') {
        Logger.debug('Entity.flush()', { options, method });

        const patchOptions = {};
        if (method === 'patch' && !options) {
            Object.keys(this).forEach((key) => {
                if (this[key] === this.#original[key]) {
                    return;
                }

                patchOptions[key] = this[key];
            });
        }

        const opts = JSON.stringify(
            Object.keys(patchOptions).length ? patchOptions : options || this,
        );

        const req = this.#Request[method];

        this.promise = req(`${this.#url}/${this.id}`, opts)
            .then(({ response }) => {
                const error = (response?.status
                        && this.#customErrors?.[response.status]
                        && new this.#customErrors[response.status](response))
                    || false;

                if (error) {
                    throw error;
                }

                this.#original = new this.constructor({
                    ...this.#original,
                    ...response,
                });

                return { data: this.#original, error };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: this, error };
            });

        return this;
    }

    /**
     * Delete the entity
     */
    delete() {
        Logger.debug('Entity.delete()');

        this.promise = this.#Request
            .delete(`${this.#url}/${this.id}`)
            .then(({ response }) => {
                const error = (response?.status
                        && this.#customErrors?.[response.status]
                        && new this.#customErrors[response.status](response))
                    || false;

                if (error) {
                    throw error;
                }

                Logger.info(`Your ${this.className} has been deleted.`);

                return { error };
            })
            .catch((error) => {
                Logger.error(error);

                return { error };
            });

        return this;
    }

    /**
     * Await a response about request in progress
     */
    onReady(callback) {
        Logger.debug('Entity.onReady(callback)', { callback });

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
}
