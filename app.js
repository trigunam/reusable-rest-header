const RESTHeader = require("./RESTHeader");
const { v4: uuidv4 } = require("uuid");

// Generate a header with api-version: 1 and a random access_token
const restHeader = new RESTHeader(1).addBearerAuth(uuidv4()).build();
console.log(restHeader);