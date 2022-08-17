# 3.3.0 (2022-08-17)


### Features

* **eventsource:** add SecurityRule to list of entities that support Mercure Events b48bec8

## 3.2.3 (2022-08-05)


### Bug Fixes

* **securitygroup & securityrule:** fix flush for security group & rule (PATCH), also send 405 errors 840095c

## 3.2.2 (2022-07-27)


### Bug Fixes

* **server entity:** fix flavor and image properties taht returned empty entities when undefined e45f863

## 3.2.1 (2022-07-25)


### Bug Fixes

* **image:** remove default values for createdAt and updatedAt 30aa333
* **server:** use server.image / server.flavor to complete a server detail a174998

# 3.2.0 (2022-07-19)


### Features

* **security groups:** update required fields to create security groups and security rules 78ee5eb
* **securitygroup:** add project key to SecurityGroup entity 9dd5b45

## 3.1.2 (2022-06-21)


### Bug Fixes

* **dependencies:** upgrade packages to fix vulnerabilities 26f624b

## 3.1.1 (2022-04-08)


### Bug Fixes

* **ips:** return createdAt value for an IP be682a2

# 3.1.0 (2022-04-07)


### Features

* **ips:** add floating ips (keys and flush method) 4f08e6c

# 3.0.0 (2022-03-10)


### Bug Fixes

* **eventsource:** added logs for successful and failed topic un/subscription 2b8876a
* **package:** fix npm vulnerabilities and add uuid package for new incoming EventSource feature 30c1bbd


### Features

* **eventsource:** onUpdate returns now entity-related events, with individual topics subscriptions a6b2ad5


### BREAKING CHANGES

* **eventsource:** onUpdate used to return all events, and we were limited to one active onUpdate per
page. Now we can have as many as we want per page, and events returned are limited to the topic. We
also now have to unsubscribe from topic when we no longer need them (ex: on page or component
unmount)

## 2.8.1 (2022-03-02)


### Bug Fixes

* **invoice errors:** fix invoices error codes and messages 3c8e736

# 2.8.0 (2022-02-10)


### Features

* **invoices:** add captureInvoice method to collect unpaid invoices b1ee4c6

# 2.7.0 (2022-02-07)


### Features

* **release:** publish new version to both private and public NPM registries 0b26ba7
