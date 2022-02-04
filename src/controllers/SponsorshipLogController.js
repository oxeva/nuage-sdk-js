import { sponsorshipLogCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_SPONSORSHIPLOGS } from '../utils/urls';

export default class SponsorshipLogController extends Controller {
    constructor() {
        super();

        this.url = URL_SPONSORSHIPLOGS;
        this.customErrors = sponsorshipLogCustomErrors;
    }
}
