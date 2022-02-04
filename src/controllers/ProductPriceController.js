import { productPriceCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_PRODUCT_PRICES } from '../utils/urls';

export default class ProductPriceController extends Controller {
    constructor() {
        super();

        this.url = URL_PRODUCT_PRICES;
        this.customErrors = productPriceCustomErrors;
    }
}
