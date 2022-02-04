/* eslint-disable jest/expect-expect */

import shouldBe from '../tests/entitiesChecker';
import {
    DELETE, GET, PATCH, POST,
} from '../tests/mocks/crud';
import {
    flavorPayload,
    imagePayload,
    invitationPayload,
    keypairPayload,
    paymentMethodPayload,
    projectPayload,
} from '../tests/mocks/payload';
import { state, setState } from '../tests/mocks/state';
import VARS from '../tests/variables';
import Client from './Client';
import EventSource from './EventSource';
import Request from './Request';
import EntityFactory from './utils/EntityFactory';
import Logger from './utils/Logger';
import {
    URL_CONTRACTS,
    URL_COUPONS,
    URL_CRISP_SIGN_EMAIL,
    URL_CUSTOMERS,
    URL_FLAVORS,
    URL_IMAGES,
    URL_INVITATIONS,
    URL_INVOICES,
    URL_IPS,
    URL_ITEMS,
    URL_KEYPAIRS,
    URL_METRICS_QUERY,
    URL_METRICS_SEARCH,
    URL_ORGANIZATIONS,
    URL_ORGANIZATIONS_CHECK,
    URL_ORGANIZATION_LIMITS,
    URL_PAYMENT_METHODS,
    URL_PRODUCTS,
    URL_PRODUCT_PRICES,
    URL_PROJECTS,
    URL_PROJECTS_USAGES,
    URL_PROJECT_LIMITS,
    URL_ROLES,
    URL_SECURITY_GROUPS,
    URL_SECURITY_RULES,
    URL_SERVERS,
    URL_SPONSORSHIPLOGS,
    // URL_SPONSORSHIPS,
    URL_TOKEN_AUTH,
    URL_TOKEN_REFRESH,
    URL_UPVOTY_SIGN_EMAIL,
    URL_USERS,
} from './utils/urls';

const {
    baseUrl,
    admin: ADMIN,
    user: USER,
    superadmin: SUPERADMIN,
    payloads: PAYLOADS,
} = VARS;

const client = new Client().config({ baseUrl });

const credentialsMap = {
    admin: ADMIN,
    superadmin: SUPERADMIN,
    user: USER,
};

// Collections for GET requests
const getCollections = [
    {
        role: 'superadmin',
        entities: [
            ['coupons', URL_COUPONS],
            ['productPrices', URL_PRODUCT_PRICES],
        ],
    },
    {
        role: 'admin',
        entities: [['invitations', URL_INVITATIONS]],
    },
    {
        role: 'user',
        entities: [
            ['contracts', URL_CONTRACTS],
            ['customers', URL_CUSTOMERS],
            ['invoices', URL_INVOICES],
            ['ips', URL_IPS],
            ['items', URL_ITEMS],
            ['keypairs', URL_KEYPAIRS],
            ['metric', URL_METRICS_SEARCH],
            ['organizations', URL_ORGANIZATIONS],
            ['organizationLimits', URL_ORGANIZATION_LIMITS],
            ['paymentMethods', URL_PAYMENT_METHODS],
            ['projects', URL_PROJECTS],
            ['projectLimits', URL_PROJECT_LIMITS],
            ['projectUsages', URL_PROJECTS_USAGES],
            ['roles', URL_ROLES],
            ['securityGroups', URL_SECURITY_GROUPS],
            ['securityRules', URL_SECURITY_RULES],
            ['servers', URL_SERVERS],
            ['sponsorshipLogs', URL_SPONSORSHIPLOGS],
            ['users', URL_USERS],
        ],
    },
    {
        role: 'unlogged',
        entities: [
            ['flavors', URL_FLAVORS],
            ['images', URL_IMAGES],
            ['products', URL_PRODUCTS],
        ],
    },
];

// Entities for GET requests
const getEntities = [
    {
        role: 'superadmin',
        entities: [['productPrice', URL_PRODUCT_PRICES, 'id']],
    },
    {
        role: 'user',
        entities: [
            ['contract', URL_CONTRACTS, 'id'],
            ['coupon', URL_COUPONS, 'name'],
            ['customer', URL_CUSTOMERS, 'id'],
            ['invitation', URL_INVITATIONS, 'id'],
            ['invoice', URL_INVOICES, 'id'],
            ['ip', URL_IPS, 'id'],
            ['item', URL_ITEMS, 'id'],
            ['keypair', URL_KEYPAIRS, 'id'],
            ['organization', URL_ORGANIZATIONS, 'id'],
            ['organizationLimit', URL_ORGANIZATION_LIMITS, 'id'],
            ['paymentMethod', URL_PAYMENT_METHODS, 'id'],
            ['project', URL_PROJECTS, 'id'],
            ['projectUsage', URL_PROJECTS_USAGES, 'id'],
            ['role', URL_ROLES, 'name'],
            ['securityGroup', URL_SECURITY_GROUPS, 'id'],
            ['securityRule', URL_SECURITY_RULES, 'id'],
            ['server', URL_SERVERS, 'id'],
            // ['sponsorship', URL_SPONSORSHIPS, 'id'],
            ['sponsorshipLog', URL_SPONSORSHIPLOGS, 'id'],
            ['user', URL_USERS, 'id'],
        ],
    },
    {
        role: 'unlogged',
        entities: [
            ['flavor', URL_FLAVORS, 'id'],
            ['image', URL_IMAGES, 'id'],
            // ['product', URL_PRODUCTS, 'id'],
        ],
    },
];

// Entities for POST requests
const postEntities = [
    {
        role: 'superadmin',
        postRole: undefined,
        entities: [
            ['flavor', URL_FLAVORS, flavorPayload],
            ['image', URL_IMAGES, imagePayload],
        ],
    },
    {
        role: 'admin',
        postRole: 'admin',
        entities: [
            ['project', URL_PROJECTS, projectPayload],
            ['paymentMethod', URL_PAYMENT_METHODS, paymentMethodPayload],
        ],
    },
    {
        role: 'user',
        postRole: 'user',
        entities: [['keypair', URL_KEYPAIRS, keypairPayload]],
    },
    {
        role: 'unlogged',
        postRole: 'user',
        entities: [['invitation', URL_INVITATIONS, invitationPayload]],
    },
];

// Entities for PATCH/PUT requests
const flushEntities = [
    {
        role: 'superadmin',
        entities: [
            ['flavor', URL_FLAVORS, PAYLOADS.flavor.patch],
            ['image', URL_IMAGES, PAYLOADS.image.patch],
        ],
    },
    {
        role: 'admin',
        entities: [['project', URL_PROJECTS, PAYLOADS.project.patch]],
    },
    {
        role: 'user',
        entities: [['keypair', URL_KEYPAIRS, PAYLOADS.keypair.patch]],
    },
];

// Entities for DELETE requests
const deleteEntities = [
    {
        role: 'superadmin',
        entities: [
            ['flavor', URL_FLAVORS],
            ['image', URL_IMAGES],
        ],
    },
    {
        role: 'admin',
        entities: [
            ['project', URL_PROJECTS],
            ['paymentMethod', URL_PAYMENT_METHODS],
        ],
    },
];

const itConcurrentIf = (condition) => (condition ? it.concurrent : it.concurrent.skip);

const login = async (credentials, role) => {
    await POST(URL_TOKEN_AUTH, credentials, 200);

    await client
        .config({ baseUrl })
        .login(credentials)
        .onReady((error, data) => {
            setState('account', {
                ...state.users,
                [role]: {
                    id: data.userId,
                    email: credentials.name,
                },
            });
        });
};

const testGetCollection = async ({ url, method }) => {
    await GET({ url });

    client[method]().onReady((error, data) => {
        expect(error).toBeFalse();
        expect(data).toBeArray();

        setState(method, data);
    });
};

const testGetEntity = async ({ name, url, key }) => {
    let entity = state[name];

    const isNotPublicResource = ['flavor', 'image'].includes(name) && !entity?.isPublic;

    if (!entity || entity[name]?.[key] === undefined || isNotPublicResource) {
        let stateEntities = state[`${name}s`];

        if (['flavor', 'image'].includes(name)) {
            stateEntities = stateEntities.filter(
                (ent) => ent.isPublic === true,
            );
        }

        if (name === 'keypair') {
            stateEntities = stateEntities.filter((ent) => !ent.isDefault);
        }

        if (Array.isArray(stateEntities)) {
            [entity] = stateEntities.filter(
                (stateEntity) => stateEntity[key] !== undefined,
            );
        }
    }

    if (!entity) {
        return;
    }

    await GET({ url, param: entity[key] });

    client[name]({ [key]: entity[key] }).onReady((error, data) => {
        expect(error).toBeFalse();
        expect(data).toBeInstanceOf(EntityFactory.use(name));

        shouldBe(name, data);
    });
};

const testPostEntity = async ({
    name, url, mock, role, orga,
}) => {
    await POST(url, mock({ role, orga }));

    const Entity = EntityFactory.use(name);
    const entity = new Entity(mock({ role, orga }));

    if (!entity) {
        return;
    }

    client.persist(entity).onReady((error, data) => {
        setState(name, data);

        expect(error).toBeFalse();
        expect(data).toBeInstanceOf(Entity);

        shouldBe(name, data);
    });
};

const testPatchEntity = async ({ name, url, json }) => {
    const payload = {
        ...state[name],
        ...json,
    };

    await PATCH({
        url,
        json: payload,
    });

    const entity = new (EntityFactory.use(name))(payload);

    entity.flush().onReady((error, data) => {
        expect(error).toBeFalse();
        expect(data).toBeInstanceOf(EntityFactory.use(name));
        expect(data.id).toStrictEqual(payload.id);

        const [[key, value]] = Object.entries(json);

        expect(data[key]).toStrictEqual(value);
    });
};

const testDeleteEntity = async ({ name, url }) => {
    const payload = state[name];

    if (!payload) {
        return;
    }

    await DELETE(url, payload.id);

    const entity = new (EntityFactory.use(name))(payload);

    entity.delete().onReady((error, data) => {
        expect(error).toBeFalse();
        expect(data).toBeUndefined();
    });
};

describe('Client', () => {
    beforeAll(async () => {
        await login(USER, 'user');
    });

    it('.metrics()', async () => {
        await POST(URL_METRICS_QUERY, {
            interval: '1d',
            range: {
                from: '2021-01-01T00:00:00.000Z',
                to: '2021-02-02T00:00:00.000Z',
            },
            targets: [
                {
                    target: 'ram',
                    type: 'timeseries',
                },
            ],
        });

        client
            .metrics({
                from: '2021-01-01',
                to: '2021-02-02',
                interval: '1d',
                targets: ['ram'],
                type: 'timeseries',
            })
            .onReady((error, data) => {
                expect(error).toBeFalse();
                expect(data).toBeInstanceOf(EntityFactory.use('metric'));
            });
    });
});

describe('Client.config()', () => {
    Logger.config = jest.fn();

    beforeEach(() => {
        new Client().logout();
    });

    it('should instantiate client without options', () => {
        new Client().config();

        expect(Logger.config).toBeCalled();
        expect(Request.baseUrl).toBeUndefined();
        expect(Request.percentageError).toStrictEqual(0);
    });

    it('should instantiate client with all options', () => {
        new Client().config({
            baseUrl: 'http://mock.test',
            percentageError: 'test',
        });

        expect(Logger.config).toBeCalled();
        expect(Request.baseUrl).toStrictEqual('http://mock.test');
        expect(Request.percentageError).toStrictEqual('test');
    });
});

it('Client.login()', async () => {
    await POST(URL_TOKEN_AUTH, ADMIN, 200);

    client.login(ADMIN).onReady((error, data) => {
        expect(error).toBeFalse();
        expect(data.refresh_token).toBeDefined();
        expect(data.userId).toBeDefined();
        expect(data.organizationId).toBeDefined();
    });
});

it('Client.unsubscribe()', async () => {
    EventSource.isOpen = true;
    EventSource.stream = {};

    expect(EventSource.isOpen).toBeTrue();
    expect(EventSource.stream).toBeDefined();

    client.unsubscribe();

    expect(EventSource.isOpen).toBeFalse();
    expect(EventSource.stream).toBeNull();
});

it('Client.auth()', async () => {
    const oldRefToken = Request.refreshToken;

    await POST(URL_TOKEN_REFRESH, { refresh_token: oldRefToken }, 200);

    client
        .auth({
            token: Request.refresh_token,
        })
        .onReady((error, data) => {
            expect(error).toBeFalse();
            expect(data.refresh_token).toBeDefined();
            expect(data.userId).toBeDefined();
            expect(data.organizationId).toBeDefined();
            expect(Request.token).toBeDefined();
            expect(Request.refreshToken).toBeDefined();
            expect(oldRefToken).not.toStrictEqual(Request.refreshToken);
        });
});

it('Client.logout()', () => {
    expect(Request.baseUrl).toBeDefined();
    expect(Request.token).toBeDefined();
    expect(Request.refreshToken).toBeDefined();

    client.logout();

    expect(Request.baseUrl).toBeUndefined();
    expect(Request.token).toBeUndefined();
    expect(Request.refreshToken).toBeUndefined();
});

describe('Client logged methods (USER)', () => {
    beforeAll(async () => {
        await login(USER, 'user');
    });

    it('.signCrispEmail() should return a signature', async () => {
        await GET({ url: URL_CRISP_SIGN_EMAIL });

        client.signCrispEmail().onReady((error, data) => {
            expect(error).toBeFalse();
            expect(data.signature).toBeDefined();
        });
    });

    it('.signUpvotyEmail() should return a signature', async () => {
        await GET({ url: URL_UPVOTY_SIGN_EMAIL });

        client.signUpvotyEmail().onReady((error, data) => {
            expect(error).toBeFalse();
            expect(data.signature).toBeDefined();
        });
    });
});

describe('Client unlogged methods', () => {
    beforeAll(() => {
        client.logout();
    });

    const orgName = USER.organization || ADMIN.organization;

    it('.checkOrganization() should returns organization description', async () => {
        await GET({ url: `${URL_ORGANIZATIONS_CHECK}/${orgName}` });

        client.checkOrganization({ name: orgName }).onReady((error, data) => {
            expect(error).toBeFalse();
            expect(data).toBeInstanceOf(EntityFactory.use('organization'));
            expect(data.name).toStrictEqual(orgName);
            expect(data.description).toBeDefined();
        });
    });

    it('.checkSponsorship()', async () => {
        await GET({ url: URL_COUPONS, param: state.sponsorCode });

        client
            .checkSponsorship({ id: state.sponsorCode })
            .onReady((error, data) => {
                expect(error).toBeFalse();
                expect(data).toBeInstanceOf(EntityFactory.use('sponsorship'));
                shouldBe('sponsorship', data);
            });
    });

    it('.sponsorship()', async () => {
        await GET({ url: URL_COUPONS, param: state.sponsorCode });

        client.sponsorship({ id: state.sponsorCode }).onReady((error, data) => {
            expect(error).toBeFalse();
            expect(data).toBeInstanceOf(EntityFactory.use('sponsorship'));
            shouldBe('sponsorship', data);
        });
    });
});

getCollections.forEach((group) => {
    describe(`Client GET collections (${group.role})`, () => {
        const credentials = credentialsMap[group.role];
        const isUnlogged = group.role === 'unlogged';

        if (credentials) {
            beforeAll(async () => {
                await login(credentials, group.role);
            });
        } else if (isUnlogged) {
            beforeAll(() => {
                client.logout();
            });
        }

        itConcurrentIf(credentials || isUnlogged).each(group.entities)(
            '.%s()',
            async (method, url) => {
                await testGetCollection({ client, url, method });
            },
        );
    });
});

getEntities.forEach((group) => {
    describe(`Client GET entities (${group.role})`, () => {
        const credentials = credentialsMap[group.role];
        const isUnlogged = group.role === 'unlogged';

        if (credentials) {
            beforeAll(async () => {
                await login(credentials, group.role);
            });
        } else if (isUnlogged) {
            beforeAll(() => {
                client.logout();
            });
        }

        itConcurrentIf(credentials || isUnlogged).each(group.entities)(
            '.%s()',
            async (name, url, key) => {
                await testGetEntity({ name, url, key });
            },
        );
    });
});

postEntities.forEach((group) => {
    describe(`Client POST entities (${group.role})`, () => {
        const credentials = credentialsMap[group.role];
        const isUnlogged = group.role === 'unlogged';

        if (credentials) {
            beforeAll(async () => {
                await login(credentials, group.role);
            });
        } else if (isUnlogged) {
            beforeAll(() => {
                client.logout();
            });
        }

        itConcurrentIf(credentials || isUnlogged).each(group.entities)(
            '.persist(%s)',
            async (name, url, mock) => {
                await testPostEntity({
                    name,
                    url,
                    mock,
                    role: group.postRole,
                    orga: ADMIN.organization || USER.organization,
                });
            },
        );
    });
});

flushEntities.forEach((group) => {
    describe(`Client PATCH/PUT entities(${group.role})`, () => {
        const credentials = credentialsMap[group.role];
        const isUnlogged = group.role === 'unlogged';

        if (credentials) {
            beforeAll(async () => {
                await login(credentials, group.role);
            });
        } else if (isUnlogged) {
            beforeAll(() => {
                client.logout();
            });
        }

        itConcurrentIf(credentials || isUnlogged).each(group.entities)(
            '%s.flush()',
            async (name, url, json) => {
                await testPatchEntity({ name, url, json });
            },
        );
    });
});

deleteEntities.forEach((group) => {
    describe(`Client DELETE entities (${group.role})`, () => {
        const credentials = credentialsMap[group.role];
        const isUnlogged = group.role === 'unlogged';

        if (credentials) {
            beforeAll(async () => {
                await login(credentials, group.role);
            });
        } else if (isUnlogged) {
            beforeAll(() => {
                client.logout();
            });
        }

        itConcurrentIf(credentials || isUnlogged).each(group.entities)(
            '%s.delete()',
            async (name, url) => {
                await testDeleteEntity({ name, url });
            },
        );
    });
});
