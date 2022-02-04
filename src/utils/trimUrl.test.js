import trimUrl from './trimUrl';

describe('trimUrl', () => {
    it('should transform "/scrooge/contracts/9633b93e-84ea-4e24-b92e-7ce466fd4199" to "9633b93e-84ea-4e24-b92e-7ce466fd4199"', () => {
        expect(
            trimUrl('/scrooge/contracts/9633b93e-84ea-4e24-b92e-7ce466fd4199'),
        ).toStrictEqual('9633b93e-84ea-4e24-b92e-7ce466fd4199');
    });
});
