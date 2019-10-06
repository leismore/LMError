/**
 * Regular Expressions for:
 *   1. ptnMessage    = error message
 *   2. ptnCode       = error code
 *   3. ptnStatusCode = HTTP response status code
 */

const ptnMessage    = /^.+$/u;
const ptnCode       = /^\w+$/;
const ptnStatusCode = /^\d{3}$/;

export {ptnMessage, ptnCode, ptnStatusCode};
