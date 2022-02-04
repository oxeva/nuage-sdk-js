import NuageRateLimitError from './NuageRateLimitError';

describe('NuageRateLimitError', () => {
    it('should be instanciate', () => {
        const error = new NuageRateLimitError({});

        expect(error).toBeInstanceOf(NuageRateLimitError);
        expect(error.message).toStrictEqual(
            'Too many requests in a given amount of time.',
        );
        expect(error.name).toStrictEqual('NuageRateLimitError');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });
});
