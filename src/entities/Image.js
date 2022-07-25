import { imageCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_IMAGES } from '../utils/urls';
import Entity from './Entity';

export default class Image extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Image.constructor()', { entity });

        const {
            id,
            name,
            description,
            osAdminUser,
            osName,
            osVersion,
            isPublic = false,
            isDefault = false,
            createdAt,
            updatedAt,
            osReleasedAt,
        } = entity;

        this.id = trimUrl(id);
        this.createdAt = createdAt;
        this.description = description;
        this.isDefault = isDefault;
        this.isPublic = isPublic;
        this.name = name;
        this.osAdminUser = osAdminUser;
        this.osName = osName;
        this.osVersion = osVersion;
        this.updatedAt = updatedAt;
        this.osReleasedAt = osReleasedAt;

        this.className = 'Image';
        this.url = URL_IMAGES;
        this.customErrors = imageCustomErrors;
        this.original = { ...this };
    }
}
