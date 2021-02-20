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
 *   previous_exists
 */

import {EOL} from 'os';
import {ptnMessage, ptnCode, ptnStatusCode} from './patterns';
import {Err} from './type/Err';
import {Res} from './type/Res';

class LMError extends Error
{
  public readonly error:       Err;
  public readonly response?:   Res;
  public          previous?:   Error;

  public constructor(error: Err, response?: Res, previous?: Error)
  {
    super(error.message);
    try
    {
      this.error = this.filterError(error);
      if (response!==undefined)
      {
        this.response   = this.filterResponse(response);
      }
      if (previous !== undefined)
      {
        this.previous = this.filterPrevious(previous);
      }
    }
    catch (e)
    {
      throw e;
    }
  }

  /**
   * 
   * @throws Error
   *   invalid_previous
   *   previous_exists
   */
  public addPrevious(previous: Error):void
  {
    if (this.previous === undefined)
    {
      try
      {
        this.previous = this.filterPrevious(previous);
      }
      catch(e)
      {
        throw e;
      }
    }
    else
    {
      throw new Error('previous_exists');
    }
  }

  public toString(): string
  {
    let text:string = (
      EOL + this.toStringPrefix() + EOL +
      this.toStringError()
    );
    if (this.toStringResponse() !== null)
    {
      text = text + EOL + this.toStringResponse();
    }
    if (this.toStringPrevious() !== null)
    {
      text = text + EOL + this.toStringPrevious();
    }
    text = text + EOL;
    return text;
  }

  private toStringPrefix(): string
  {
    let dateTime  = new Date();
    let errorName = this.constructor.name;
    return (dateTime.toISOString() + ' / ' + errorName);
  }

  private toStringError(): string
  {
    return ( `${this.error.message} (${this.error.code})` );
  }

  private toStringResponse(): string | null
  {
    let text = '';
    if (this.response === undefined)
    {
      return null;
    }
    else
    {
      text = `HTTP ${this.response.statusCode}`;
      if (this.response.headers !== undefined)
      {
        for (let k in this.response.headers)
        {
          text = text + EOL + `${k}: ${this.response.headers[k]}`;
        }
      }
      if (this.response.body !== undefined)
      {
        text = text + EOL + String(this.response.body);
      }
      return text;
    }
  }

  private toStringPrevious(): string | null
  {
    if (this.previous === undefined)
    {
      return null;
    }
    else
    {
      return String(this.previous);
    }
  }

  private filterError(error: Err): Err
  {
    if (ptnMessage.test(error.message) === false)
    {
      throw new Error('invalid_error_message');
    }
    if (ptnCode.test(error.code) === false)
    {
      throw new Error('invalid_error_code');
    }
    return error;
  }

  private filterResponse(response: Res): Res
  {
    if (ptnStatusCode.test(response.statusCode) === false)
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
    else
    {
      response.headers = undefined;
    }

    return response;
  }

  private filterPrevious(previous: Error): Error
  {
    if (previous instanceof Error)
    {
      return previous;
    }
    else
    {
      throw new Error('invalid_previous');
    }
  }
}

export {LMError, Err, Res};
