import JWT from 'jsonwebtoken';
import NuageError from './errors/NuageError';
import Logger from './utils/Logger';
import { URL_TOKEN_EVENT, URL_TOKEN_REFRESH } from './utils/urls';

export default class Request {
    /**
     * Base URL of the API
     */
    static baseUrl;

    /**
     * Percentage to fail a request
     */
    static percentageError = 0;

    /**
     * Current token of customer
     */
    static token;

    /**
     * Current refresh token of customer
     */
    static refreshToken;

    /**
     * Current refresh token of customer
     */
    static onRefreshTokenChange() {}

    /**
     * Current event token
     */
    static eventToken;

    /**
     * Is the token being modified
     */
    static isRefreshing = false;

    /**
     * Get delay before end of the session
     * */
    static get tokenDelayExpiration() {
        if (!this.token) {
            return false;
        }

        const { exp } = JWT.decode(this.token);
        const now = Date.now();

        return Math.round((exp - now / 1000) * 100) / 100 / 60;
    }

    static get simulateError() {
        // Percentage to fail the request
        const percentage = Number(this.percentageError);

        // Percentage is not an integer or less than 0
        if (Number.isNaN(percentage) || percentage < 0) {
            return false;
        }

        // Generate a random number between 1 at 100
        const random = Math.ceil(Math.random() * 100);

        // Does it have to fail ?
        return random < percentage;
    }

    /**
     * Returns formatted response from request failed
     */
    static async errorResponse(e) {
        Logger.debug('Request.errorResponse()', { e });

        const { status } = e;
        const response = (status && status !== 404 && (await e.json())) || {};

        return {
            status,
            ...response,
        };
    }

    /**
     * Method to generate new token/refreshToken
     */
    static async refreshTokenMethod() {
        Logger.debug('Request.refreshTokenMethod()');

        this.isRefreshing = true;

        this.token = undefined;

        const { response } = await this.refresh({
            refresh_token: this.refreshToken,
        });

        this.token = response.token;
        this.refreshToken = response.refresh_token;
        this.onRefreshTokenChange(response.refresh_token);

        Logger.info(
            `Your token has been refreshed. This is your new refresh token:\n${this.refreshToken}`,
        );

        if (this.eventToken) {
            const { response: res } = await this.get(URL_TOKEN_EVENT);

            this.eventToken = res.token;
        }
    }

    /**
     * Function that waits for the new token
     */
    static pendingToken(ms = 1000) {
        Logger.debug('Request.pendingToken()', { ms });

        return new Promise((resolve) => {
            setTimeout(() => {
                if (this.token) {
                    resolve();
                    this.isRefreshing = false;
                }
            }, ms);
        });
    }

    /**
     * Create a fetch request to the API
     */
    static async req(query, options) {
        Logger.debug('Request.req()', { query, options });

        let hubUrl;

        const response = await fetch(this.baseUrl + query, options)
            .then((data) => {
                // Retrieve mercure URL for subscribe to events
                hubUrl = data.headers
                    .get('Link')
                    ?.match(
                        /<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/,
                    )?.[1];

                // Deletion successful
                if (data.status === 204) {
                    return {};
                }

                // Error occurred
                if (!data.ok) {
                    return this.errorResponse(data);
                }

                return data?.json();
            })
            .catch(() => ({
                status: 'network',
                message: 'Failed to fetch',
            }));

        return {
            response,
            hubUrl,
        };
    }

    /**
     * Prepare options/headers to the request to fetch
     */
    static async prepareQuery(query, options = {}) {
        // Generate new token when current token is expired
        if (
            !this.isRefreshing
            && this.tokenDelayExpiration <= 0
            && this.refreshToken
        ) {
            Logger.info('Your token is expired. Generation of a new token.');

            this.refreshTokenMethod();
        }
        // Await the end of the new token generation to continue
        if (this.isRefreshing && !query.includes('refresh')) {
            await this.pendingToken();
        }

        // Define mandatory options to request
        const opts = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/ld+json',
            },
        };

        //
        if (this.token) {
            opts.headers['Content-Type'] = 'application/ld+json';
            opts.headers.Authorization = `Bearer ${this.token}`;
        }

        if (options.headers) {
            opts.headers = {
                ...opts.headers,
                ...options.headers,
            };
        }

        // Do not execute the request, returns an error instead
        if (this.simulateError) {
            return new Promise((resolve, reject) => {
                reject(new NuageError({}, `Error simulated on: ${query}`));
            });
        }

        return this.req(query, opts);
    }

    /**
     * Stringify filters
     */
    static formatOptions(options) {
        Logger.debug('Request.formatOptions()', { options });

        if (!options) {
            return '';
        }

        const {
            order, direction, id, ...filters
        } = options;

        const filter = new URLSearchParams(filters);

        // Handle query by multiple ids. Example: client.users({ id: ['abc', 'xyz'] }).
        if (id && Array.isArray(id)) {
            id.forEach((idItem) => {
                filter.append('id[]', idItem);
            });
        } else if (id && typeof id === 'string') {
            filter.append('id', id);
        }

        const hasOrderDirection = ['asc', 'desc'].includes(direction);

        if (order) {
            const dir = hasOrderDirection ? direction : 'asc';
            filter.append(`order[${order}]`, dir);
        }

        if (direction && !hasOrderDirection) {
            filter.append('direction', direction);
        }

        return decodeURIComponent(filter)
            ? `?${decodeURIComponent(filter)}`
            : '';
    }

    /**
     * Prepare a GET request method
     */
    static get(query, options) {
        Logger.debug('Request.get()', { query, options });

        return Request.prepareQuery(query + Request.formatOptions(options));
    }

    /**
     * Prepare a POST request method
     */
    static post(query, options) {
        Logger.debug('Request.post()', { query, options });

        const opts = {
            method: 'POST',
            body: options,
        };

        return Request.prepareQuery(query, opts);
    }

    /**
     * Prepare a PUT request method
     */
    static put(query, options) {
        Logger.debug('Request.put()', { query, options });

        const opts = {
            method: 'PUT',
            body: options,
        };

        return Request.prepareQuery(query, opts);
    }

    /**
     * Prepare a PATCH request method
     */
    static patch(query, options) {
        Logger.debug('Request.patch()', { query, options });

        const opts = {
            method: 'PATCH',
            body: options,
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
        };

        return Request.prepareQuery(query, opts);
    }

    /**
     * Prepare a DELETE request method
     */
    static delete(query) {
        Logger.debug('Request.delete()', { query });

        const options = {
            method: 'DELETE',
        };

        return Request.prepareQuery(query, options);
    }

    /**
     * Refresh token
     */
    static refresh(auth = {}) {
        Logger.debug('Request.refresh()', { auth });

        const opts = JSON.stringify({ refresh_token: auth.refresh_token });

        return this.post(URL_TOKEN_REFRESH, opts);
    }
}
