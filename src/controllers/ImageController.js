import { imageCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_IMAGES } from '../utils/urls';
import Logger from '../utils/Logger';
import Image from '../entities/Image';

export default class ImageController extends Controller {
    constructor() {
        super();

        this.url = URL_IMAGES;
        this.customErrors = imageCustomErrors;
    }

    post(entity = new Image()) {
        Logger.debug('ImageController.post()', { entity });

        const {
            name, description, osName, osVersion,
        } = entity;

        // Required fields to create entity
        const required = {
            name,
            description,
            osName,
            osVersion,
        };

        return super.post(entity, required, Image);
    }
}
