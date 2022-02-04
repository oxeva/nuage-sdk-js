import { metricCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import { URL_METRICS_QUERY } from '../utils/urls';
import Entity from './Entity';

export default class Metric extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Metric.constructor()', { entity });

        const isTable = entity[0]?.type === 'table';

        let metrics;

        if (isTable) {
            metrics = Metric.#table(entity);
        } else {
            metrics = Metric.#timeseries(entity);
        }

        Object.entries(metrics).forEach(([key, value]) => {
            this[key] = value;
        });

        this.className = 'Metric';
        this.url = URL_METRICS_QUERY;
        this.customErrors = metricCustomErrors;
        this.original = { ...this };
    }

    /**
     * Format "timeseries" data
     */
    static #timeseries(data) {
        return data.reduce((prev, curr) => {
            const { target, datapoints } = curr;

            const ret = prev;
            ret[target] = datapoints;

            return ret;
        }, {});
    }

    /**
     * Format "table" data
     */
    static #table(data) {
        const [ret] = data;

        delete ret.type;

        return ret;
    }
}
