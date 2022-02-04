import SyntaxError from './SyntaxError';

describe('SyntaxError', () => {
    it('should be instanciate', () => {
        const error = new SyntaxError({});

        expect(error).toBeInstanceOf(SyntaxError);
        expect(error.message).toStrictEqual('Invalid input.');
        expect(error.name).toStrictEqual('SyntaxError');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });
});
