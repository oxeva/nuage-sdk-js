import { newsletterCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import { URL_NEWSLETTER } from '../utils/urls';
import Entity from './Entity';

export default class Newsletter extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Newsletter.constructor()', { entity });

        const {
            id,
            email,
            firstName,
            lastName,
            company,
            pleziVisitor,
            pleziVisit,
        } = entity;

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.company = company;
        this.pleziVisitor = pleziVisitor;
        this.pleziVisit = pleziVisit;

        this.className = 'Newsletter';
        this.url = URL_NEWSLETTER;
        this.customErrors = newsletterCustomErrors;
        this.original = { ...this };
    }

    flush() {
        Logger.debug('Newsletter.flush()');

        return super.flush(null, 'patch');
    }
}
