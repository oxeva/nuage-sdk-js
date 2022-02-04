import { sponsorshipCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_SPONSORSHIPS } from '../utils/urls';
import Logger from '../utils/Logger';
import Sponsorship from '../entities/Sponsorship';

export default class SponsorshipController extends Controller {
    constructor() {
        super();

        this.url = URL_SPONSORSHIPS;
        this.customErrors = sponsorshipCustomErrors;
    }

    verify(id) {
        Logger.debug('SponsorshipController.verify()', { id });

        this.promise = this.Request.get(`${URL_SPONSORSHIPS}/${id}`)
            .then(({ response }) => {
                const error = this.getError(response);

                if (error) {
                    throw error;
                }

                Logger.info('Your sponsorship exists.');

                return { data: new Sponsorship(response), error };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: undefined, error };
            });

        return this;
    }
}
