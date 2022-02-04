import NuageError from './NuageError';

describe('NuageError', () => {
    it('should be instanciate', () => {
        const payload = {
            '@context': '/arya/contexts/Error',
            '@type': 'hydra:Error',
            'hydra:title': 'An error occurred',
            'hydra:description': 'Invalid identifier value or configuration.',
            code: 404,
            opt: 'this is a fake message',
            trace: 'trace',
            title: 'title',
        };

        const error = new NuageError(payload);

        expect(error.status).toStrictEqual(404);
        expect(error.opt).toStrictEqual('this is a fake message');
        expect(error.trace).toBeUndefined();
    });
});
