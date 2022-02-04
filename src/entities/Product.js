import { productCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_PRODUCTS } from '../utils/urls';
import Entity from './Entity';
import Item from './Item';
import ProductPrice from './ProductPrice';

export default class Product extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Product.constructor()', { entity });

        const { id, item = {}, prices = [] } = entity;

        this.id = trimUrl(id);
        this.item = new Item(item);
        this.prices = prices.map((price) => new ProductPrice(price));

        this.className = 'Product';
        this.url = URL_PRODUCTS;
        this.customErrors = productCustomErrors;
        this.original = { ...this };
    }
}
