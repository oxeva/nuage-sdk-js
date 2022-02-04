import { sponsorshipCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_SPONSORSHIPS } from '../utils/urls';
import Entity from './Entity';

export default class Sponsorship extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Sponsorship.constructor()', { entity });

        const { id, sponsor, value } = entity;

        this.id = trimUrl(id);
        this.sponsor = sponsor;
        this.value = value;

        this.className = 'Sponsorship';
        this.url = URL_SPONSORSHIPS;
        this.customErrors = sponsorshipCustomErrors;
        this.original = { ...this };
    }
}
