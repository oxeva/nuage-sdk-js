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
