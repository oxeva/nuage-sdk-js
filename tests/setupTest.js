import { request } from 'pactum';
import fetchMock from 'jest-fetch-mock';

import VARS from './variables';

const TEST_TIMEOUT = 10 * 1000;

fetchMock.enableMocks();

jest.setTimeout(TEST_TIMEOUT);

beforeAll(() => {
    request.setBaseUrl(VARS.baseUrl);
    request.setDefaultTimeout(TEST_TIMEOUT);
});

beforeEach(() => {
    fetch.resetMocks();
});
