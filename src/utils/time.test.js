import time from './time';

describe('time', () => {
    const date = new Date('2021', '5', '3', '12', '49', '15');

    it(`should convert "${date}" to "12:49:15"`, () => {
        expect(time(date)).toStrictEqual('12:49:15');
    });

    it('should convert current date', () => {
        expect(time()).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });
});
