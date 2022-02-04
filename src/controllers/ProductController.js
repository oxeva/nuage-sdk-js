import { productCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_PRODUCTS } from '../utils/urls';

export default class ProductController extends Controller {
    constructor() {
        super();

        this.url = URL_PRODUCTS;
        this.customErrors = productCustomErrors;
    }
}
