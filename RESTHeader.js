const { encode, createSignature } = require("./util");

/**
 * Creates a new RESTHeader (JSON) with cache-control, api-version.
 * Builder design pattern for JavaScript.
 */
module.exports = class RESTHeader {

  /**
   * Initialize the RESTHeader with the `api-version` in the header.
   * 
   * Adds the following headers by default:
   * 
   * ```JavaScript
   * Cache-Control: no-store no-cache
   * Accept: application/json
   * Content-Type: application/json
   * api-version: <apiVersion>
   * ```
   * 
   * @param {string} apiVersion version of the REST API
   */
  constructor(apiVersion) {
    this.cacheControl = "no-store no-cache";
    this.apiVersion = apiVersion;
    this.addContentType();
    this.addAccept();
  }

  /**
   * Add the `Accept` header with the value specified in acceptType.
   * 
   * @param {string} acceptType default: 'application/json'
   * @returns RESTHeader
   */
  addAccept(acceptType = "application/json") {
    this.Accept = acceptType;
    return this;
  }

  /**
   * Add the `Accept` header for `application/scim+json`
   *
   * @returns RESTHeader
   */
  addAcceptScim() {
    this.addAccept("application/scim+json");
    return this;
  }

  /**
   * Adds a `Authorization` header with `Basic <base64 encoded client_id:client_secret>`
   * 
   * @param {object} credentials A json credentials with `{ client_id, client_secret }`
   * @returns RESTHeader
   */
  addBasicAuth(credentials) {
    this.Authorization = `Basic ${encode(
      `${credentials.client_id}:${credentials.client_secret}`
    )}`;
    return this;
  }

  /**
   * Adds a `x-product-key` header with the value specified in the parameter.
   * 
   * @param {string} productKey product key to be added to the header
   * @returns RESTHeader
   */
  addProductKey(productKey) {
    this.productKey = productKey;
    return this;
  }

  /**
   * Adds a `x-custom-header` header with the value specified in the parameter.
   *
   * @param {string} customheaderValue custom header value to be added to the header
   * @returns RESTHeader
   */
  addCustomHeader(customheaderValue) {
    this.customHeader = customheaderValue;
    return this;
  }

  /**
   * Adds a `Authorization` header with `Bearer <accessToken>`
   * 
   * @param {string} accessToken a unique UUID to represent access_token
   * @returns RESTHeader
   */
  addBearerAuth(accessToken) {
    this.Authorization = `Bearer ${accessToken}`;
    return this;
  }

  /**
   * Adds a `Authorization` header with `<accessToken>`
   *
   * @param {string} accessToken a unique UUID to represent access_token
   * @returns RESTHeader
   */
  addPlainAuth(accessToken) {
    this.Authorization = accessToken;
    return this;
  }

  /**
   * Add the `Content-Type` header with the value specified in contentType.
   *
   * @param {string} contentType default: 'application/json'
   * @returns RESTHeader
   */
  addContentType(contentType = "application/json") {
    this.contentType = contentType;
    return this;
  }

  /**
   * Add the `Content-Type` header with the value `application/x-www-form-urlencoded`.
   *
   * @returns RESTHeader
   */
  addFormContentType() {
    this.addContentType("application/x-www-form-urlencoded");
    return this;
  }

  /**
   * Add the `If-Match` header with the value specified in `etag`.
   *
   * @param {string} etag etag value
   * @returns RESTHeader
   */
  addETag(etag) {
    this.etag = etag;
    return this;
  }

  /**
   * Generate a HMAC256 signature using the specified sharedKey and secretKey.
   * 
   * Adds headers 
   * 
   * 1. `api-signature`: `HmacSHA256;Credential:${sharedKey};SignedHeaders:SignedDate;Signature:${generatedSig}`
   * 
   * 2. `signedDate`: a date as a string value in ISO format.
   * 
   * @param {string} sharedKey public key used to generate signature
   * @param {string} secretKey private key used to generate signature
   * @returns RESTHeader
   */
  addSignature(sharedKey, secretKey) {
    const signedSignature = createSignature(sharedKey, secretKey);

    this.sigHeader = signedSignature.sigHeader;
    this.signedDate = signedSignature.signedDate;
    return this;
  }

  /**
   * Builds the json object from the headers added so far.
   * 
   * This replaces the following object properties to its equivalent header key:
   * 
   * .replace("cacheControl", "Cache-Control")
   * 
   * .replace("apiVersion", "api-version")
   * 
   * .replace("contentType", "Content-Type")
   * 
   * .replace("etag", "If-Match")
   * 
   * .replace("sigHeader", "api-signature")
   * 
   * .replace("productKey", "x-product-key")
   * 
   * .replace("customHeader", "x-custom-header");
   * 
   * @returns JSON Object
   */
  build() {
    let builtJson = JSON.stringify(this);
    builtJson = builtJson
      .replace("cacheControl", "Cache-Control")
      .replace("apiVersion", "api-version")
      .replace("contentType", "Content-Type")
      .replace("etag", "If-Match")
      .replace("sigHeader", "api-signature")
      .replace("productKey", "x-product-key")
      .replace("customHeader", "x-custom-header");
    return JSON.parse(builtJson);
  }

  /**
   * Use this static method to directly add the bearer auth token.
   * 
   * @param {string} token Bearer access token used in Authorization header
   * @returns JSON Object
   */
  static bearerAuthOnly(token) {
    return new RESTHeader().addBearerAuth(token).build();
  }

  /**
   * Use this static method to directly add the bearer auth token with the given api-version header.
   * 
   * @param {string} apiVersion version used in `api-header`
   * @param {string} token Bearer access token used in Authorization header
   * @returns JSON Object
   */
  static bearerAuthWithApiVersion(apiVersion, token) {
    return new RESTHeader(apiVersion).addBearerAuth(token).build();
  }

  /**
   * Use this static method to add default headers directly.
   *
   * @returns JSON Object
   */
  static defaultHeaders() {
    return new RESTHeader().build();
  }
}
