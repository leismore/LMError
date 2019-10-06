/**
 * LMError - The general Error class for LMOS NodeJS projects.
 *
 * Error
 *   invalid_error_message
 *   invalid_error_code
 *   invalid_http_statusCode
 *   invalid_http_header
 *   invalid_http_body
 *   invalid_previous
 */

import {EOL} from 'os';

type Err = {
  readonly message: string, // Message for human
  readonly code:    string  // Code for machine
};

type Res = {                                            // HTTP response
  readonly statusCode:  string,                         // HTTP response status code
  readonly headers?:   {readonly [key:string]: string}  // HTTP headers
  readonly body?:       any                             // HTTP body
};

const ptnMessage    = /^.+$/u;
const ptnCode       = /^\w+$/;
const ptnStatusCode = /^\d{3}$/;

class LMError extends Error {

  public readonly error:     Err;
  public readonly response?: Res;
  public readonly previous?: Error;

  public readonly status?:     string;  // Mirror of this.response.statusCode
  public readonly statusCode?: string;  // Mirror of this.response.statusCode

  public constructor(error:Err, response?:Res, previous?:Error)
  {
    // Test error
    if (ptnMessage.test(error.message)===false)
    {
      throw new Error('invalid_error_message');
    }

    if (ptnCode.test(error.code)===false)
    {
      throw new Error('invalid_error_code');
    }

    // Test response
    if (response !== undefined)
    {
      if (ptnStatusCode.test(response.statusCode)===false)
      {
        throw new Error('invalid_http_statusCode');
      }

      if (response.headers !== undefined && response.headers !== {})
      {
        for (let k in response.headers)
        {
          if (k.length === 0 || response.headers[k].length === 0)
          {
            throw new Error('invalid_http_header');
          }
        }
      }
    }

    // Test previous
    if (previous!==undefined && previous instanceof Error === false)
    {
      throw new Error('invalid_previous');
    }

    // Init.
    super(error.message);
    this.error = error;
    this.response = response;
    this.previous = previous;

    if (this.response !== undefined)
    {
      this.statusCode = this.response.statusCode;
      this.status     = this.statusCode;
    }
  }

  public toString()
  {
    let message = ( (new Date()).toISOString + ' - ' +
      `${this.constructor.name}` + ': ' +
      `${this.error.message} (${this.error.code})`
    );

    if (this.response !== undefined)
    {
      message = (message + EOL +
        `HTTP `
      );
    }
  }

}

export default LMError;
