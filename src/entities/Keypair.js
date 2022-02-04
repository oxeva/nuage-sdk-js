import { keypairCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_KEYPAIRS } from '../utils/urls';
import Entity from './Entity';

export default class Keypair extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Keypair.constructor()', { entity });

        const {
            id,
            user,
            name,
            description,
            publicKey,
            isDefault,
            createdAt,
            sha256,
            md5,
        } = entity;

        this.id = trimUrl(id);
        this.createdAt = createdAt || new Date().toJSON();
        this.description = description?.trim();
        this.isDefault = isDefault || false;
        this.md5 = md5;
        this.name = name;
        this.publicKey = publicKey;
        this.sha256 = sha256;

        if (user) {
            this.user = trimUrl(user);
        }

        this.className = 'Keypair';
        this.url = URL_KEYPAIRS;
        this.customErrors = keypairCustomErrors;
        this.original = { ...this };
    }

    flush() {
        Logger.debug('Keypair.flush()');

        return super.flush(null, 'patch');
    }
}
