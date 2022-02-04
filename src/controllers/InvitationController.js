import { invitationCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import {
    URL_INVITATIONS,
    URL_CONTRACTS,
    URL_USERS,
    URL_ORGANIZATIONS,
} from '../utils/urls';
import Invitation from '../entities/Invitation';
import Logger from '../utils/Logger';

export default class InvitationController extends Controller {
    constructor() {
        super();

        this.url = URL_INVITATIONS;
        this.customErrors = invitationCustomErrors;
    }

    post(entity = new Invitation()) {
        Logger.debug('InvitationController.post()', { entity });

        const { email, ...rest } = entity;

        // Required fields to create entity
        const required = { email };

        const params = {
            contract: rest.contract
                ? `${URL_CONTRACTS}/${rest.contract}`
                : rest.contract,
            createdBy: rest.createdBy
                ? `${URL_USERS}/${rest.createdBy}`
                : rest.createdBy,
            organization: rest.organization
                ? `${URL_ORGANIZATIONS}/${rest.organization}`
                : rest.organization,
        };

        return super.post({ ...entity, ...params }, required, Invitation);
    }
}
