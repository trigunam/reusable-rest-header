const crypto = require("crypto-js");

/**
 * Creates a signature to add to the header
 * 
 * @param {string} sharedKey public key shared
 * @param {string} secretKey private key used to create signature
 * @returns `{ sigHeader, signedDate }`
 */
const createSignature = (sharedKey, secretKey) => {
  const secret = `AWS${secretKey}`;

  const dateString = new Date().toISOString();
  const seed = crypto.enc.Utf8.parse(dateString);
  const signature = crypto.HmacSHA256(
    seed.toString(crypto.enc.Base64),
    crypto.enc.Utf8.parse(secret)
  );

  const sigHeader = `HmacSHA256;Credential:${sharedKey};SignedHeaders:SignedDate;Signature:${signature.toString(
    crypto.enc.Base64
  )}`;
  const signedDate = dateString;

  return { sigHeader, signedDate };
};

/**
 * Encode plain text using Buffer with base64.
 * 
 * @param {string} plainText plain text to encode using Buffer with base64
 * @returns encoded string
 */
const encode = (plainText) => {
  return Buffer.from(plainText).toString("base64");
}

module.exports = { encode, createSignature }
