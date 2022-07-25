import { serverCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_SERVERS } from '../utils/urls';
import Entity from './Entity';
import Ip from './Ip';
import SecurityGroup from './SecurityGroup';
import Image from './Image';
import Flavor from './Flavor';

export default class Server extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Server.constructor()', { entity });

        const {
            id,
            project,
            name,
            createdAt,
            description,
            status,
            state,
            flavor,
            image,
            keypair,
            ips = [],
            securityGroups = [],
        } = entity;

        this.id = trimUrl(id);
        this.createdAt = createdAt;
        this.description = description;
        this.flavor = typeof flavor === 'string' ? trimUrl(flavor) : new Flavor(flavor);
        this.image = typeof image === 'string' ? trimUrl(image) : new Image(image);
        this.ips = ips.map((ip) => new Ip(ip));
        this.keypair = keypair;
        this.name = name;
        this.project = trimUrl(project);
        this.securityGroups = securityGroups.map(
            (group) => new SecurityGroup(group),
        );
        this.state = state;
        this.status = status;

        this.className = 'Server';
        this.url = URL_SERVERS;
        this.customErrors = serverCustomErrors;
        this.original = { ...this };
    }

    /**
     * Associate the security group to the server
     */
    #postGroup(group) {
        Logger.debug('Server.#postGroup()', { group });

        const url = `${URL_SERVERS}/${this.id}/security_groups/${group}`;
        const opts = null;

        this.promise = this.Request.post(url, opts)
            .then(({ response }) => {
                const error = (response?.status
                        && serverCustomErrors?.[response.status]
                        && new serverCustomErrors[response.status](response))
                    || false;

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

    /**
     * Dissociate the security group to the server
     */
    #deleteGroup(group) {
        Logger.debug('Server.#deleteGroup()', { group });

        const url = `${URL_SERVERS}/${this.id}/security_groups/${group}`;
        const opts = null;

        this.promise = this.Request.delete(url, opts)
            .then(({ response }) => {
                const error = (response?.status
                        && serverCustomErrors?.[response.status]
                        && new serverCustomErrors[response.status](response))
                    || false;

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

    flush() {
        if (Array.isArray(this.securityGroups)) {
            // Securiy groups ID from API
            const orginialFlatId = this.original.securityGroups.map((item) => (typeof item === 'object' ? item.id : item));
            // Current security groups ID
            const flatId = this.securityGroups.map((item) => (typeof item === 'object' ? item.id : item));

            // Security groups ID to associate
            const shouldPost = flatId.filter(
                (item) => !orginialFlatId.includes(item),
            );
            // Security groups ID to dissociate
            const shouldDelete = flatId.filter((item) => orginialFlatId.includes(item));

            // Post each security groups ID to the server
            shouldPost.forEach((item) => this.#postGroup(item));
            // Delete each security groups ID from the server
            shouldDelete.forEach((item) => this.#deleteGroup(item));
        }

        //
        const options = Object.keys(this).reduce((prev, curr) => {
            if (['securityGroups', 'ips'].includes(curr)) {
                return prev;
            }

            if (!(curr in this.original)) {
                return prev;
            }

            if (this[curr] === this.original[curr]) {
                return prev;
            }

            return { ...prev, [curr]: this[curr] };
        }, null);

        return options ? super.flush(options, 'patch') : this;
    }
}
