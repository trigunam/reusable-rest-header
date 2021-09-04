# Reusable REST Header

[![Jest build status](https://github.com/trigunam/reusable-rest-header/actions/workflows/test.yml/badge.svg)](https://github.com/trigunam/tostring-implementation/actions/workflows/test.yml)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)](CONTRIBUTING.md)

A reusable rest header which can be used in your JavaScript code to create headers using builder pattern.

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