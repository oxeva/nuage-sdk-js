import EventSource from './EventSource';

describe('EventSource', () => {
    it('.subscribe()', async () => {
        expect(EventSource.stream).toBeUndefined();

        await EventSource.subscribe('http://mock.test/event', () => {});

        expect(EventSource.stream).toBeDefined();
    });

    it('.unsubscribe()', async () => {
        await EventSource.unsubscribe();

        expect(EventSource.stream).toBeNull();
    });

    it('.formatData() without data retrieved', async () => {
        const payload = {};

        const event = await EventSource.formatData({ event: payload });

        expect(event).toBeNull();
    });
});
