import { sponsorshipCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_SPONSORSHIPLOGS } from '../utils/urls';
import Entity from './Entity';

export default class SponsorshipLog extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('SponsorshipLog.constructor()', { entity });

        const {
            id,
            targetOrganization,
            createdAt,
            payedAt,
            amount,
            currency,
            state,
            reason,
            user,
        } = entity;

        this.id = trimUrl(id);
        this.targetOrganization = targetOrganization;
        this.createdAt = createdAt;
        this.payedAt = payedAt;
        this.amount = amount;
        this.currency = currency;
        this.state = state;
        this.reason = reason;
        this.user = user;

        this.className = 'SponsorshipLog';
        this.url = URL_SPONSORSHIPLOGS;
        this.customErrors = sponsorshipCustomErrors;
        this.original = { ...this };
    }
}
