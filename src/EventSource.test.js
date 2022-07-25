// import Server from './entities/Server';
import EventSource from './EventSource';
import Request from './Request';
import Flavor from './entities/Flavor';
import Image from './entities/Image';
import Server from './entities/Server';
import Ip from './entities/Ip';
import SecurityGroup from './entities/SecurityGroup';

const eventPayload = {
    '@context': '/rockefeller/contexts/Server',
    '@id': '/rockefeller/servers/84c0d5e6-be1f-47d7-9ada-f58d5bbe812d',
    '@type': 'Server',
    id: '84c0d5e6-be1f-47d7-9ada-f58d5bbe812d',
    name: 'instance-2022-03-09-11-06-49',
    description: 'instance-2022-03-09-11-06-49',
    createdAt: '2022-07-25T09:49:01.798Z',
    status: 'off',
    state: 'on',
    project: '/arya/projects/17e98923-6280-4bed-854b-50e58eec993d',
    securityGroups: [new SecurityGroup({ id: '1' })],
    ips: [new Ip({ id: '1' })],
    keypair: 'test',
    flavor: new Flavor({
        name: 'unit-test-sdk-js-flavor-name',
        ram: 1,
        core: 1,
        disk: 100,
        isPublic: false,
    }),
    image: new Image({
        createdAt: '2022-07-25T09:49:01.798Z',
        updatedAt: '2022-07-25T09:49:01.798Z',
        name: 'unit-test-sdk-js-image-name',
        description: 'unit-test-sdk-js-image-description',
        osAdminUser: 'unit-test-sdk-js-image-osadminuser',
        osName: 'unit-test-sdk-js-image-osname',
        osVersion: '1.0.0',
        isPublic: false,
    }),
};

const resultEntity = new Server({
    id: '84c0d5e6-be1f-47d7-9ada-f58d5bbe812d',
    description: 'instance-2022-03-09-11-06-49',
    flavor: new Flavor({
        name: 'unit-test-sdk-js-flavor-name',
        ram: 1,
        core: 1,
        disk: 100,
        isPublic: false,
        id: undefined,
    }),
    image: new Image({
        createdAt: '2022-07-25T09:49:01.798Z',
        updatedAt: '2022-07-25T09:49:01.798Z',
        name: 'unit-test-sdk-js-image-name',
        description: 'unit-test-sdk-js-image-description',
        osAdminUser: 'unit-test-sdk-js-image-osadminuser',
        osName: 'unit-test-sdk-js-image-osname',
        osVersion: '1.0.0',
        isPublic: false,
        id: undefined,
    }),
    name: 'instance-2022-03-09-11-06-49',
    project: '17e98923-6280-4bed-854b-50e58eec993d',
    createdAt: '2022-07-25T09:49:01.798Z',
    state: 'on',
    status: 'off',
    keypair: 'test',
    securityGroups: [new SecurityGroup({ id: '1' })],
    ips: [new Ip({ id: '1' })],
});

const resultTopic = '/rockefeller/servers/84c0d5e6-be1f-47d7-9ada-f58d5bbe812d';

describe('EventSource', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('.login()', async () => {
        const mockCallback = jest.fn((x) => x);

        jest.spyOn(Request, 'get').mockImplementationOnce(() => ({
            token: 'test123',
        }));

        jest.spyOn(EventSource, 'unsubscribe').mockImplementationOnce(() => mockCallback());
        jest.spyOn(EventSource, 'subscribe').mockImplementationOnce(() => mockCallback());

        await EventSource.login('https://mock.test/hub-url');

        expect(EventSource.lastEventId).toBeNull();
        expect(mockCallback.mock.calls.length).toBe(2);
    });

    it('.onOpen()', async () => {
        jest.spyOn(window, 'addEventListener');

        await EventSource.onOpen('https://mock.test/hub-url');

        expect(window.addEventListener).toBeCalledWith(
            'offline',
            expect.any(Function),
        );
        expect(window.addEventListener).toBeCalledWith(
            'online',
            expect.any(Function),
        );
        expect(window.addEventListener).toBeCalledWith(
            'beforeunload',
            expect.any(Function),
        );
    });

    it('.offlineListener()', async () => {
        const mockCallback = jest.fn((x) => x);

        jest.spyOn(window, 'removeEventListener');
        jest.spyOn(EventSource, 'unsubscribe').mockImplementationOnce(() => mockCallback());

        EventSource.unsubscribe = () => mockCallback();

        await EventSource.offlineListener();

        expect(window.removeEventListener).toBeCalledWith(
            'offline',
            expect.any(Function),
        );

        expect(mockCallback.mock.calls.length).toBe(1);
    });

    it('.onlineListener()', async () => {
        const mockCallback = jest.fn((x) => x);

        jest.spyOn(window, 'removeEventListener');
        jest.spyOn(EventSource, 'subscribe').mockImplementationOnce(() => mockCallback());

        await EventSource.onlineListener('https://mock.test/hub-url');

        expect(window.removeEventListener).toBeCalledWith(
            'online',
            expect.any(Function),
        );

        expect(mockCallback.mock.calls.length).toBe(1);
    });

    it('.subscribe()', async () => {
        expect(EventSource.stream).toBeUndefined();

        await EventSource.subscribe('http://mock.test/event', () => {});

        expect(EventSource.stream).toBeDefined();
    });

    it('.unsubscribe()', async () => {
        await EventSource.unsubscribe({ resetSubscriptions: true });

        expect(EventSource.stream).toBeNull();
    });

    it('.formatData() with incoming event', async () => {
        const event = await EventSource.formatData({ event: eventPayload });

        expect(event).toEqual({ topic: resultTopic, data: resultEntity });
    });

    it('.formatData() without data retrieved', async () => {
        const payload = {};

        const event = await EventSource.formatData({ event: payload });

        expect(event).toBeNull();
    });

    it('.subscribeToTopic() with new topic', async () => {
        EventSource.subscriptions = []; // resets subscriptions

        const newSubscription = {
            topic: '/scrooge/test/1',
            key: '123',
            callback: () => {},
        };

        await EventSource.subscribeToTopic(newSubscription);

        expect(EventSource.subscriptions).toEqual([newSubscription]);
    });

    it('.subscribeToTopic() with already existing topic', async () => {
        EventSource.subscriptions = []; // resets subscriptions

        const newSubscription = {
            topic: '/scrooge/test/2',
            key: '234',
            callback: () => {},
        };

        await EventSource.subscribeToTopic(newSubscription);
        await EventSource.subscribeToTopic(newSubscription);

        expect(EventSource.subscriptions).toEqual([newSubscription]);
    });

    it('.unsubscribeFromTopic()', async () => {
        EventSource.subscriptions = [
            { topic: '/scrooge/test/3', key: '345', callback: () => {} },
        ];

        await EventSource.unsubscribeFromTopic({ key: '345' });

        expect(EventSource.subscriptions).toEqual([]);
    });

    it('.onMessage()', async () => {
        const mockCallback = jest.fn((x) => x);

        EventSource.subscriptions = [
            {
                topic: '/rockefeller/servers',
                key: '456',
                callback: mockCallback,
            },
            {
                topic: '/rockefeller/servers/84c0d5e6-be1f-47d7-9ada-f58d5bbe812d',
                key: '567',
                callback: mockCallback,
            },
        ];
        EventSource.isOpen = true;

        await EventSource.onMessage({
            event: { data: JSON.stringify(eventPayload) },
            url: 'https://mock.test/hub-url',
        });

        expect(mockCallback.mock.calls.length).toBe(2);
    });

    it('.onError()', async () => {
        const mockCallback = jest.fn((x) => x);

        EventSource.isOpen = false;
        EventSource.isReloading = false;
        jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true);

        jest.spyOn(EventSource, 'unsubscribe').mockImplementationOnce(() => mockCallback());
        jest.spyOn(EventSource, 'subscribe').mockImplementationOnce(() => mockCallback());

        await EventSource.onError({
            event: { status: 404 },
            url: 'https://mock.test/hub-url',
        });

        expect(mockCallback.mock.calls.length).toBe(2);
    });
});
