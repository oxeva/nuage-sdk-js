import UserAccountDisabled from './UserAccountDisabled';

describe('notFoundError', () => {
    it('should instanciate UserAccountDisabled', () => {
        const error = new UserAccountDisabled({});

        expect(error).toBeInstanceOf(UserAccountDisabled);
        expect(error.message).toStrictEqual(
            'User account disabled. Please report to your admin.',
        );
        expect(error.name).toStrictEqual('UserAccountDisabled');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });
});
