import lcfirst from './lcfirst';

describe('lcfirst', () => {
    it('should transform "HelloWorld" to "helloWorld"', () => {
        expect(lcfirst('HelloWorld')).toStrictEqual('helloWorld');
    });

    it('should not transform "12" (interger)', () => {
        expect(lcfirst(12)).toStrictEqual(12);
    });
});
