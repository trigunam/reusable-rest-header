const { afterAll, beforeAll, beforeEach } = require("@jest/globals");
const RESTHeader = require("./RESTHeader");
const { v4: uuidv4 } = require("uuid");

describe("Test initialization of REST Headers", () => {

    // Define the variables required to assert
    let actualRestHeader;
    let expectedRestHeader = {
        "Cache-Control": "no-store no-cache",
        "Content-Type": "application/json",
        Accept: "application/json",
    }

    // Add the tests and assert in afterAll
    test("default constructor", () => {
        actualRestHeader = new RESTHeader().build();
    })

    test("constructor with api-version", () => {
        const apiVersion = 1;
        expectedRestHeader = {
            "Cache-Control": "no-store no-cache",
            "Content-Type": "application/json",
            Accept: "application/json",
            "api-version": apiVersion
        }
        actualRestHeader = new RESTHeader(apiVersion).build()
    })

    // assert in afterAll using the global variables
    afterAll(() => {
        expect(actualRestHeader).toStrictEqual(expectedRestHeader);
    })
})

describe("Test static methods of REST Headers", () => {

    // Define the variables required to assert
    let actualRestHeader, expectedRestHeader;

    beforeEach(() => {
        expectedRestHeader = {
            "Cache-Control": "no-store no-cache",
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })

    // Add the tests and assert in afterAll
    test("bearerAuthOnly", () => {
        console.log("test bearerAuthOnly");
        const random_token = uuidv4();
        expectedRestHeader.Authorization = "Bearer " + random_token;
        actualRestHeader = RESTHeader.bearerAuthOnly(random_token);
        console.log(actualRestHeader);
    })

    test("bearerAuthWithApiVersion", () => {
        console.log("test bearerAuthWithApiVersion");
        const random_token = uuidv4();
        const apiVersion = 1;
        expectedRestHeader['api-version'] = apiVersion;
        expectedRestHeader.Authorization = "Bearer " + random_token;
        actualRestHeader = RESTHeader.bearerAuthWithApiVersion(apiVersion, random_token);
        console.log(actualRestHeader);
    })

    test("defaultHeaders", () => {
        console.log("test defaultHeaders");
        actualRestHeader = RESTHeader.defaultHeaders();
        console.log(actualRestHeader);
    })

    // assert in afterAll using the global variables
    afterAll(() => {
        expect(actualRestHeader).toStrictEqual(expectedRestHeader);
    })
})