import jwt from 'jsonwebtoken';

import { RefreshTokenNotFound, TokenNotFound } from '../errors/notFound';
import { UserAccountDisabled } from '../errors/disabled';
import EventSource from '../EventSource';
import Logger from '../utils/Logger';
import {
    URL_TOKEN_AUTH,
    URL_CRISP_SIGN_EMAIL,
    URL_UPVOTY_SIGN_EMAIL,
} from '../utils/urls';
import Controller from './Controller';

export default class AuthController extends Controller {
    #credential = null;

    getTokenData(data) {
        Logger.debug('AuthController.getTokenData()');

        if (!data.token) {
            this.#credential = undefined;
        }

        const { roles, userId, organizationId } = jwt.decode(data.token) || {};

        if (!roles || !userId) {
            this.#credential = undefined;

            return;
        }

        this.#credential = {
            refresh_token: data.refresh_token,
            userId,
            organizationId,
        };
    }

    setSession(response = {}) {
        Logger.debug('AuthController.setSession()');

        this.Request.token = response.token;
        this.Request.refreshToken = response.refresh_token;
        this.Request.onRefreshTokenChange(response.refresh_token);
    }

    login(credential = {}) {
        Logger.debug('AuthController.login()');

        const { name, password, organization } = credential;

        const opts = JSON.stringify({ name, password, organization });

        this.promise = this.Request.post(URL_TOKEN_AUTH, opts)
            .then(async ({ response }) => {
                this.getTokenData(response);

                const data = this.#credential;

                const ErrorType = response?.message?.includes(
                    'User account disabled',
                )
                    ? UserAccountDisabled
                    : TokenNotFound;

                const error = this.#credential
                    ? false
                    : new ErrorType(response);

                if (!error) {
                    Logger.info(
                        `You are currently logged with "${name}" account.`,
                    );

                    this.setSession(response);
                    await this.setMercureTokenLogged();
                } else {
                    throw error;
                }

                return { data, error };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: undefined, error };
            });

        return this;
    }

    refresh(auth = {}) {
        Logger.debug('AuthController.refresh()');

        this.promise = this.Request.refresh(auth)
            .then(async ({ response }) => {
                this.getTokenData(response);

                const data = this.#credential;
                const error = this.#credential
                    ? false
                    : new RefreshTokenNotFound(response);

                if (!error) {
                    Logger.info(
                        `Your token has been refreshed. This is your new refresh token:\n${response.refresh_token}`,
                    );

                    this.setSession(response);
                    await this.setMercureTokenLogged();
                } else {
                    throw error;
                }

                return { data, error };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: undefined, error };
            });

        return this;
    }

    logout() {
        Logger.debug('AuthController.logout()');

        this.setSession();
        EventSource.logout();

        this.Request.baseUrl = undefined;
        this.Request.percentageError = 0;
    }

    signCrispEmail() {
        Logger.debug('AuthController.signCrispEmail()');

        this.promise = this.Request.get(URL_CRISP_SIGN_EMAIL)
            .then(({ response }) => {
                const error = this.getError(response);

                if (error) {
                    throw error;
                }

                return { data: response, error };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: undefined, error };
            });

        return this;
    }

    signUpvotyEmail() {
        Logger.debug('AuthController.signUpvotyEmail()');

        this.promise = this.Request.get(URL_UPVOTY_SIGN_EMAIL)
            .then(({ response }) => {
                const error = this.getError(response);

                if (error) {
                    throw error;
                }

                return { data: response, error };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: undefined, error };
            });

        return this;
    }
}
