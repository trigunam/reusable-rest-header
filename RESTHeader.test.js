const { afterAll } = require('@jest/globals');
const RESTHeader = require('./RESTHeader');

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