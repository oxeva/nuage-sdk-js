import { itemCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_ITEMS } from '../utils/urls';

export default class ItemController extends Controller {
    constructor() {
        super();

        this.url = URL_ITEMS;
        this.customErrors = itemCustomErrors;
    }
}
