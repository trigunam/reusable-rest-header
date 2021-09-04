# Reusable REST Headers

[![Jest build status](https://github.com/trigunam/reusable-rest-header/actions/workflows/test.yml/badge.svg)](https://github.com/trigunam/tostring-implementation/actions/workflows/test.yml)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)](CONTRIBUTING.md)

A reusable rest header object which can be used in your JavaScript code to create headers using builder pattern.

To generate the following output,

```javascript
{
  'Cache-Control': 'no-store no-cache',
  'api-version': 1,
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: 'Bearer 0b195ce6-09a1-4dc7-a4eb-256535065846'
}
```

Use the below code:

`new RESTHeader(1).addBearerAuth(uuidv4()).build();`

## Usage

Install package to your project using the following command:

`npm i reusable-rest-header`

Once installed you can import the `RESTHeader`

`const RESTHeader = require('./RESTHeader');`

Use this defined `const` as:

`new RESTHeader(1).addBearerAuth(uuidv4()).build();`

## Available static methods

To speed up development, use available static methods:

### `bearerAuthOnly`

Using:
`RESTHeader.bearerAuthOnly(random_token);`

```javascript
{
  'Cache-Control': 'no-store no-cache',
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: 'Bearer 187addda-b57b-4642-87dc-24a6a155f172'
}
```

### `bearerAuthWithApiVersion`

Using:
`RESTHeader.bearerAuthWithApiVersion(1, random_token);`

```javascript
{
  'Cache-Control': 'no-store no-cache',
  'api-version': 1,
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: 'Bearer 1305da60-434e-4edd-a9c5-a5794d97a870'
}
```

### `defaultHeaders`

Using:
`RESTHeader.defaultHeaders();`

```javascript
{
  'Cache-Control': 'no-store no-cache',
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
```

## Available methods

### `addAccept(acceptType = "application/json")`
### `addAcceptScim()`
### `addBasicAuth(credentials)`
### `addBearerAuth(accessToken)`
### `addPlainAuth(accessToken)`
### `addContentType(contentType = "application/json")`
### `addFormContentType()`
### `addProductKey(productKey)`
### `addETag(etag)`
### `addSignature(sharedKey, secretKey)`
### `addCustomHeader(customheaderValue)`

# Contributions are welcome