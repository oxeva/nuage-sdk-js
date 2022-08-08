<div align=center>

<h1 align="center">
	<br>
	<br>
	⛅️ Nua.ge SDK JS 📦
	<br>
	<br>
	<br>
</h1>

> JavaScript Client Software Development Kit (SDK) for [Nua.ge](https://nua.ge).

[![semantic-release](https://img.shields.io/badge/semantic--release-5d5d5d?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

</div>

# API Documentation

This README only describes how to initialize Nua.ge's JavaScript SDK, and all the available methods to make API calls and manipulate entities.

For more details about API requests, required parameters, payloads, responses and authorization levels, please refer to the official API documentation at https://api.nua.ge/docs.

You can also check out our Nua.ge documentation (in French) to get you started : https://docs.nua.ge/

# Contents

-   [Getting started](#getting-started)
    -   [Installation](#installation)
    -   [Usage](#usage)
-   [Client methods](#client-methods)
    -   [.config()](#config)
    -   [.getToken()](#gettoken)
    -   [.checkOrganization()](#checkorganization)
    -   [.checkSponsorship()](#checksponsorship)
    -   [.login()](#login)
    -   [.auth()](#auth)
    -   [.logout()](#logout)
    -   [.unsubscribe()](#unsubscribe)
    -   [.persist()](#persist)
-   [Entities](#entities)
    -   [Table of entities](#table-of-entities)
    -   [Get a collection](#get-a-collection)
    -   [Using filters](#using-filters)
    -   [Listen for events](#listen-for-events)
    -   [Get an entity](#get-an-entity)
    -   [Create an entity](#create-an-entity)
    -   [Update an entity](#update-an-entity)
    -   [Delete an entity](#delete-an-entity)
-   [Testing](#testing)
-   [Badge](#badge)

<br />

# Getting started

## Installation

```bash
npm install @oxeva/nuage-sdk --save
```

## Usage

```js
import { Client } from '@oxeva/nuage-sdk';

const client = new Client();

client
    .login({
        name: 'user@example.com',
        password: 'hunter2',
        organization: 'myorg',
    })
    .onReady((error, data) => {
        // ...
    });
```

# Client methods

## .config()

The client can take some options to configure logs, the base url, etc.

```js
import { Client, ERROR, WARN } from '@oxeva/nuage-sdk';

const client = new Client().config({
    log_level: ERROR | WARN, // ERROR + WARN also works.
    baseUrl: 'https://api.nua.ge',
    percentageError: 0,
});
```

> Many logs are placed in the code. They do not always have the same use. Some for debugging, others for practical or important information. It is possible to configure the display of logs according to their nature.
>
> The log_level is an integer. Any value is accepted but it is strongly advised to use the SDK constants.
>
> If only errors and warnings logs are wanted, you can specify both and separate the values with a pipe or a plus sign (like the code block above).

-   log_level
    -   Type: `Number|String`
    -   Optionnal
    -   Sets which logs are reported.
    -   One of `ERROR, WARN, NOTICE, INFO, DEBUG`

<br />

-   baseUrl
    -   Type: `String`
    -   **Required**
    -   Nua.ge's API base URL that you have to specify.
    -   Set `https://api.nua.ge` to use the Nua.ge API

<br />

-   percentageError
    -   Type: `Number`
    -   Optionnal
    -   Percentage to fail a request (positive integer. recommended range: 1-100).
    -   Useful to test how your app handles errors in a dev environment. Default is 0.

## .getToken()

Get current user's refresh token.

```javascript
client.getToken((token) => {
    console.log(token);
    // Save this token to refresh it later with .auth()
});
```

## .checkOrganization()

Check if an organization exists.

```javascript
client.checkOrganization({ name: 'myorg' }).onReady((error, data) => {
    console.log(data);
});
```

## .checkSponsorship()

Check if a sponsorship code exists.

```javascript
client.checkSponsorship({ id: 'MYCODE' }).onReady((error, data) => {
    console.log(data);
});
```

## .login()

Use credentials to login and retrieve token.

```javascript
client
    .login({
        name: 'user@example.com',
        password: 'hunter2',
        organization: 'myorg',
    })
    .onReady((error, data) => {
        console.log(data);
    });
```

## .auth()

Set authorization to use API.

```javascript
client.auth({ refresh_token: 'myrefreshtoken' }).onReady((error, logRes) => {
    if (error || !logRes) {
        // Auth failed
        return;
    }

    // You can then do the following to refresh the user token
    client.user({ id: logRes.userId }).onReady((userError, userRes) => {
        // TODO : handle error when available
        if (userError) {
            // Handle the error (ex: logout)
            return;
        }

        const res = { ...logRes, ...uRes };

        // Save res.refresh_token for later use
        // And save res as customer info
    });
});
```

## .logout()

Disconnect from API and entities events.

```javascript
client.logout();
```

## .unsubscribe()

Unsubscribe from all entities events.

```javascript
client.unsubscribe();
```

## .persist()

Persist an entity by making a POST request.

Example with sending a password reset request.

```javascript
import Nuage from '@oxeva/nuage-sdk';
import client from './path/to/client';

const passwordRequest = new Nuage.Password({
    organization: 'myorg',
    email: 'user@example.com',
});

client.persist(passwordRequest).onReady((error) => {
    if (error) {
        // Notify the user an error happened
    } else {
        // Success
    }
});
```

# Entities

## Table of entities

| Entity (link to api reference)                                      | Methods                                       | Supports Events |
| ------------------------------------------------------------------- | --------------------------------------------- | --------------- |
| [Contract](https://api.nua.ge/docs/#tag/Contract)                   | .contract()<br>.contracts()                   | No              |
| [Coupon](https://api.nua.ge/docs/#tag/Coupon)                       | .coupon()<br>.coupons()                       | No              |
| [Customer](https://api.nua.ge/docs/#tag/Customer)                   | .customer()<br>.customers()                   | No              |
| [Flavor](https://api.nua.ge/docs/#tag/Flavor)                       | .flavor()<br>.flavors()                       | No              |
| [Image](https://api.nua.ge/docs/#tag/Image)                         | .image()<br>.images()                         | No              |
| [Invitation](https://api.nua.ge/docs/#tag/Invitation)               | .invitation()<br>.invitations()               | **Yes**         |
| [Invoice](https://api.nua.ge/docs/#tag/Invoice)                     | .invoice()<br>.invoices()                     | No              |
| [IP](https://api.nua.ge/docs/#tag/Ip)                               | .ip()<br>.ips()                               | **Yes**         |
| [Item](https://api.nua.ge/docs/#tag/Item)                           | .item()<br>.items()                           | No              |
| [Keypair](https://api.nua.ge/docs/#tag/Keypair)                     | .keypair()<br>.keypairs()                     | **Yes**         |
| [Metrics](https://api.nua.ge/docs/#tag/Query)                       | .metrics()                                    | No              |
| [Organization](https://api.nua.ge/docs/#tag/Organization)           | .organization()<br>.organizations()           | **Yes**         |
| [OrganizationLimit](https://api.nua.ge/docs/#tag/OrganizationLimit) | .organizationLimit()<br>.organizationLimits() | No              |
| [Password](https://api.nua.ge/docs/#tag/Password)                   | .password()                                   | No              |
| [PaymentMethod](https://api.nua.ge/docs/#tag/PaymentMethod)         | .paymentMethod()<br>.paymentMethods()         | No              |
| [Product](https://api.nua.ge/docs/#tag/Product)                     | .product()<br>.products()                     | No              |
| [Project](https://api.nua.ge/docs/#tag/Project)                     | .project()<br>.projects()                     | **Yes**         |
| [ProjectLimit](https://api.nua.ge/docs/#tag/ProjectLimit)           | .projectLimit()<br>.projectLimits()           | No              |
| [ProjectUsage](https://api.nua.ge/docs/#tag/ProjectUsage)           | .projectUsage()<br>.projectUsages()           | **Yes**         |
| [Role](https://api.nua.ge/docs/#tag/Role)                           | .role()<br>.roles()                           | No              |
| [SecurityGroup](https://api.nua.ge/docs/#tag/SecurityGroup)         | .securityGroup()<br>.securityGroups()         | **Yes**         |
| [SecurityRule](https://api.nua.ge/docs/#tag/SecurityRule)           | .securityRule()<br>.securityRules()           | **Yes**         |
| [Server](https://api.nua.ge/docs/#tag/Server)                       | .server()<br>.servers()                       | **Yes**         |
| [Sponsorship](https://api.nua.ge/docs/#tag/Sponsorship)             | .sponsorship()                                | No              |
| [SponsorshipLog](https://api.nua.ge/docs/#tag/Sponsorshiplog)       | .sponsorshipLog()<br>.sponsorshipLogs()       | No              |
| [User](https://api.nua.ge/docs/#tag/User)                           | .user()<br>.users()                           | **Yes**         |

## Get a collection

To get a collection, initialize the SDK client and use the plural version of the method associated with the entity collection you'd like to fetch.

You may need to be authenticated first. To know each level of authorization needed to manipulate entities, please refer to the API documentation.

```javascript
import Nuage from '@oxeva/nuage-sdk';

const client = new Nuage.Client().config({
    baseUrl: 'https://api.nua.ge',
});

client.servers().onReady((error, data) => {
    console.log(data);
});
```

## Using filters

Please refer to the API documentation to know filters supported by each entity.

```javascript
import Nuage from '@oxeva/nuage-sdk';

const client = new Nuage.Client().config({
    baseUrl: 'https://api.nua.ge',
});

// Ascending sort by `name`.
client.servers({ order: 'name' }).onReady((error, data) => {
    console.log(data);
});

// Descending sort by `description`.
client
    .servers({ order: 'description', direction: 'desc' })
    .onReady((error, data) => {
        console.log(data);
    });

// Filter by `state
client.servers({ state: 'on' }).onReady((error, data) => {
    console.log(data);
});

// Filter + Sort
client
    .servers({ state: 'on', order: 'id', direction: 'desc' })
    .onReady((error, data) => {
        console.log(data);
    });

// Getting multiple users by ID
client.users({ id: ['ID1', 'ID2', 'ID3'] }).onReady((error, data) => {
    console.log(data);
});
```

## Listen for events

If an entity supports events (refer to the [table of entities](#table-of-entities)), you can subscribe to them by adding the `.onUpdate()` method, and get real-time updates.

Don't forget to unsubscribe from events when you no longer need them, otherwise the callback will continue to be invoked.

```javascript
import Nuage from '@oxeva/nuage-sdk';

const client = new Nuage.Client().config({
    baseUrl: 'https://api.nua.ge',
});

// Keep a reference to the Entity you want to query.
const serversRef = client.servers();

// Make your request.
serversRef
    .onReady((error, data) => {
        console.log(data);
    })
    .onUpdate((updateError, updateData) => {
        // Executes when we receive a new Server event.
        console.log(updateData);
    });

// Unsubscribe when you no longer need to listen to events (ex: on component unmount or page change).

serversRef.unsubscribe();
```

## Get an entity

To get a specific entity, use the singular version of the method associated with the entity type you'd like to fetch.

You have to provide a filter. Most of the time, it's an `id` (except for `.coupon()` where it's `name`) but in doubt, always check the API documentation.

```javascript
import Nuage from '@oxeva/nuage-sdk';

const client = new Nuage.Client().config({
    baseUrl: 'https://api.nua.ge',
});

client
    .server({ id: '123-456-789' })
    .onReady((error, data) => {
        console.log(data);
    })
    .onUpdate((updateError, updateData) => {
        console.log(updateData);
    });
```

## Create an entity

To create an entity, you have to create an instance of this entity by filling in the values to apply to it. Then use the `.persist()` method of the client to send it.

```javascript
import Nuage from '@oxeva/nuage-sdk';

const client = new Nuage.Client().config({
    baseUrl: 'https://api.nua.ge',
});

const newProject = new Nuage.Project({
    description: 'my-new-project',
    organization: 'my-org-id',
});

client.persist(newProject);
```

## Update an entity

Editing an entity works the same way as an object in JavaScript. You just have to redefine the value of a property and then use the `.flush()` method on the entity.

```javascript
import Nuage from '@oxeva/nuage-sdk';

const client = new Nuage.Client().config({
    baseUrl: 'https://api.nua.ge',
});

client.user({ id: '1234' }).onReady((error, data) => {
    let userData = data;
    userData.email = 'new-email@email.com';
    userData.description = 'Foo Bar-baz';

    userData.flush();
});
```

## Delete an entity

To delete an entity, use the `.delete()` method available directly on the entity.

```javascript
import Nuage from '@oxeva/nuage-sdk';

const client = new Nuage.Client().config({
    baseUrl: 'https://api.nua.ge',
});

client.user({ id: '1234' }).onReady((error, data) => {
    data.delete();
});
```

# Testing

You don't actually need to do it, but you can test the SDK with jest if you'd like, since the tests are included in this repo.

> **Warning: these tests will create and use resources, so it will cost you money!**
>
> Don't forget to clean up your organization's projects and instances often after running tests.

## Variables

To run tests, you'll need to

-   create an organization and write down its slug
-   create an admin account and write down its credentials
-   create a user account and write down its credentials
-   create a `variables.json` file with the information from above and (ideally) put in inside the `/tests` folder
-   create a `.env` file at the root of the folder with the path to the `variables.json` file you just created

> Note: You may need to create a couple entities (projects, servers, keypairs, and invitations, etc...) before running tests.

Here's an example `variables.json` file:

```json
{
    "baseUrl": "https://api.nua.ge",
    "admin": {
        "name": "admin@example.com",
        "password": "adminpassword",
        "organization": "myorg"
    },
    "user": {
        "name": "user@example.com",
        "password": "userpassword",
        "organization": "myorg"
    }
}
```

Here's an example `.env` file:

```
TEST_CONFIG_FILE='./tests/variables.json'
```

## Running tests

First install dependencies

```bash
npm install
```

Then run all tests

```bash
npm run test:ci
```

# Badge

If you're using the Nua.ge SDK JS in your project, you can add this badge to your README.md file to showcase it.

[![Nua.ge SDK JS badge](https://img.shields.io/badge/%E2%9B%85%20Nua.ge-sdk--js-1cc6d9)](https://github.com/oxeva/nuage-sdk-js/)

```md
[![Nua.ge SDK JS badge](https://img.shields.io/badge/%E2%9B%85%20Nua.ge-sdk--js-1cc6d9)](https://github.com/oxeva/nuage-sdk-js/)
```
