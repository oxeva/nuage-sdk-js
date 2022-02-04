import NuageNetworkError from './NuageNetworkError';

describe('NuageNetworkError', () => {
    it('should be instanciate', () => {
        const error = new NuageNetworkError({});

        expect(error).toBeInstanceOf(NuageNetworkError);
        expect(error.message).toStrictEqual('Network error.');
        expect(error.name).toStrictEqual('NuageNetworkError');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });
});
