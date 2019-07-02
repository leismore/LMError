/**
 * LMError is the general Error class for LMOS NodeJS projects.
 *
 * @param {string}       message             - Human-readable text
 * @param {string}       code                - Machine-readable code
 * @param {string}       [httpCode = null]   - HTTP status code
 * @param {Error object} [previous = null]   - The previous Error object
 *
 * Error
 *   invalid message
 *   invalid code
 *   invalid httpCode
 *   invalid previous
 *
 * LMError
 *   @attr {string}               message    - Human-readable text
 *   @attr {string}               code       - Machine-readable code
 *   @attr {string       | null}  httpCode   - HTTP status code
 *   @attr {Error object | null}  previous   - The previous Error object
 */

'use strict';

const ptnMessage  = /^.+$/u;
const ptnCode     = /^\d+$/;
const ptnHttpCode = /^\d{3}$/;

module.exports = class LMError extends Error {

  constructor(message, code, httpCode=null, previous=null)
  {
    if (typeof message !== 'string' ||
        ptnMessage.test(message) === false)
    {
      throw new Error('invalid message');
    }

    if ((typeof code !== 'string' && typeof code !== 'number') ||
         ptnCode.test(code) === false)
    {
      throw new Error('invalid code');
    }

    if ( (typeof httpCode !== 'string' && typeof httpCode !== 'number' && httpCode !== null) ||
         (httpCode !== null && ptnHttpCode.test(httpCode) === false) )
    {
      throw new Error('invalid httpCode');
    }

    if (previous !== null && previous instanceof Error === false)
    {
      throw new Error('invalid previous');
    }

    message = String(message);
    code    = String(code);

    if (httpCode !== null)
    {
      httpCode = String(httpCode);
    }

    super(message);

    // V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LMError);
    }

    Object.defineProperty(this, 'message', {
      value:        this.message,
      writable:     false,
      enumerable:   false,
      configurable: false
    });

    Object.defineProperty(this, 'code', {
      value:        code,
      writable:     false,
      enumerable:   false,
      configurable: false
    });

    Object.defineProperty(this, 'httpCode', {
      value:        httpCode,
      writable:     false,
      enumerable:   false,
      configurable: false
    });

    Object.defineProperty(this, 'previous', {
      value:        previous,
      writable:     false,
      enumerable:   false,
      configurable: false
    });

    Object.preventExtensions(this);
  }

  toString()
  {
    if (this.previous === null)
    {
      return (`${this.constructor.name}: ${this.message} / ${this.code} / ${this.httpCode}`);
    }
    else
    {
      return (`${this.constructor.name}: ${this.message} / ${this.code} / ${this.httpCode}` + '\n' +
              this.previous);
    }
  }

};
