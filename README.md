**This package is obsoleted. Please replace it with [@leismore/lmos-nodejs-lmerror](https://www.npmjs.com/package/@leismore/lmos-nodejs-lmerror)**

---

# LMError

A general Error class for Node.js projects.

* Error message & error code
* HTTP response
* Error chain

# Donation

Buy me a coffee via [![PayPal Donation](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SPPJPYRY4D6WC&item_name=Give+people+an+option+to+support+my+open+source+software.&currency_code=AUD&source=url)

# Installation

`npm install @leismore/lmerror`

# Test

`npm test`

# Example

```typescript
import { LMError, LMErrorErr, LMErrorRes } from '@leismore/lmerror';

let errMessage:LMErrorErr = { message: 'some error', code: 'error_001' };
let httpResponse:LMErrorRes = {
  statusCode: '503',
  headers:    {
    'Retry-After': '10',
    'Content-Type': 'application/json'
  },
  body:       {message: 'Please try again later'}
};
let previousError = new Error('previous error');

throw new LMError(errMessage, httpResponse, previousError);
```

# Class Structure

## Properties

```typescript
public readonly error:       LMErrorErr;
public readonly response?:   LMErrorRes;
public          previous?:   Error;
```

## Methods

```typescript
public constructor(error: LMErrorErr, response?: LMErrorRes, previous?: Error)
public addPrevious(previous: Error):void
public toString(): string
```

### `Error` thrown by `constructor` and `addPrevious`

Error messages:

* invalid_error_message
* invalid_error_code
* invalid_http_statusCode
* invalid_http_header
* invalid_http_body
* invalid_previous
* previous_exists

## Types

```typescript
type LMErrorErr = {         // Error
  readonly message: string, // Message for human
  readonly code:    string  // Code for machine
};
```

```typescript
type LMErrorRes = {                                     // HTTP response
  readonly statusCode:  string,                         // HTTP response status code
           headers?:   {readonly [key:string]: string}, // HTTP headers
           body?:       any                             // HTTP body
};
```

# Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author)

# License

GNU Affero General Public License v3.0

# Credit

Inspired greatly by [http-errors](https://www.npmjs.com/package/http-errors)
