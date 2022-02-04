import { newsletterCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_NEWSLETTER } from '../utils/urls';
import Newsletter from '../entities/Newsletter';
import Logger from '../utils/Logger';

export default class NewsletterController extends Controller {
    constructor() {
        super();

        this.url = URL_NEWSLETTER;
        this.customErrors = newsletterCustomErrors;
    }

    post(entity = new Newsletter()) {
        Logger.debug('NewsletterController.post()', entity);

        const { email } = entity;

        // Required fields to create entity
        const required = { email };

        return super.post(entity, required, Newsletter);
    }
}
