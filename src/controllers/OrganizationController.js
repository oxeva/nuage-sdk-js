import { URL_ORGANIZATIONS, URL_ORGANIZATIONS_CHECK } from '../utils/urls';
import Logger from '../utils/Logger';
import { organizationCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import Organization from '../entities/Organization';

export default class OrganizationController extends Controller {
    constructor() {
        super();

        this.url = URL_ORGANIZATIONS;
        this.customErrors = organizationCustomErrors;
    }

    verify(name) {
        Logger.debug('OrganizationController.verify()', { name });

        this.promise = this.Request.get(`${URL_ORGANIZATIONS_CHECK}/${name}`)
            .then(({ response }) => {
                const error = this.getError(response);

                if (error) {
                    throw error;
                }

                const data = new Organization(response);

                Logger.info(`Your organization "${name}" exists.`);

                return { data, error };
            })
            .catch((error) => {
                Logger.error(error);

                return { data: undefined, error };
            });

        return this;
    }

    post(entity = new Organization()) {
        Logger.debug('OrganizationController.post()', { entity });

        const { name, description, state } = entity;

        // Required fields to create entity
        const required = { name, description, state };

        return super.post(entity, required, Organization);
    }
}
