import { metricCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_METRICS_QUERY, URL_METRICS_SEARCH } from '../utils/urls';
import Metric from '../entities/Metric';
import Logger from '../utils/Logger';

export default class MetricController extends Controller {
    constructor() {
        super();

        this.url = URL_METRICS_QUERY;
        this.customErrors = metricCustomErrors;
    }

    getAll() {
        Logger.debug('MetricController.getAll()');

        this.url = URL_METRICS_SEARCH;

        return super.getAll();
    }

    post(filters) {
        Logger.debug('MetricController.post()', { filters });

        const {
            from,
            to,
            targets,
            type = 'timeseries',
            interval,
            maxDataPoints,
            adhocFilters,
        } = filters;

        // Request payload
        const data = {
            interval,
            maxDataPoints,
            range: {
                from: new Date(from).toISOString(),
            },
            targets: [],
            adhocFilters,
        };

        if (to) {
            data.range.to = new Date(to).toISOString();
        }

        // Define type of metric for each target
        targets?.forEach((target) => {
            data.targets.push({
                target,
                type,
            });
        });

        return super.post(data, {}, Metric);
    }
}
