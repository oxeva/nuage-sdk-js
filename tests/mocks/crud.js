import pactum from 'pactum';

import Request from '../../src/Request';

const headers = (options) => ({
    Authorization: Request.token ? `Bearer ${Request.token}` : null,
    'Content-Type': 'application/ld+json',
    Accept: 'application/ld+json',
    ...options,
});

export const POST = async (url, json, status = 201) => {
    const payload = await pactum
        .spec()
        .post(url)
        .withHeaders(headers())
        .withJson(json)
        .expectStatus(status);

    fetch.mockResponseOnce(JSON.stringify(payload.json));

    return payload.json;
};

export const GET = async ({ url, param, status = 200 }) => {
    const getUrl = url + (param ? `/${param}` : '');

    const payload = await pactum
        .spec()
        .get(getUrl)
        .withHeaders(headers())
        .expectStatus(status);

    fetch.mockResponseOnce(JSON.stringify(payload.json));

    return payload.json;
};

export const PATCH = async ({ url, json, status = 200 }) => {
    const payload = await pactum
        .spec()
        .patch(`${url}/${json.id}`)
        .withHeaders(
            headers({ 'Content-Type': 'application/merge-patch+json' }),
        )
        .withJson(json)
        .expectStatus(status);

    fetch.mockResponseOnce(JSON.stringify(payload.json));

    return payload.json;
};
export const PUT = async ({
    url, param, json, status = 200,
}) => {
    const getUrl = url + (param ? `/${param}` : '');

    const payload = await pactum
        .spec()
        .put(getUrl)
        .withHeaders(headers())
        .withJson(json)
        .expectStatus(status);

    fetch.mockResponseOnce(JSON.stringify(payload.json));

    return payload.json;
};

export const DELETE = async (url, id, status = 204) => {
    const payload = await pactum
        .spec()
        .delete(`${url}/${id}`)
        .withHeaders(headers())
        .expectStatus(status);

    fetch.mockResponseOnce(JSON.stringify(payload.json));

    return payload.json;
};
