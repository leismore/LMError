# LMError

A general Error class for Node.js projects.

* Error message & code supported
* HTTP response information integrated
* Previous error supported

# Donation

Buy me a coffee via [PayPal.me](https://paypal.me/kaiqin/5AUD)

# Motivation

Define an extendable Error class for describing error information, HTTP response information and previous error.

# Class Structure

**Properties**

```typescript
public readonly error:       Err;
public readonly response?:   Res;
public readonly previous?:   Error;

public readonly status?:     string;  // Mirror of this.response.statusCode
public readonly statusCode?: string;  // Mirror of this.response.statusCode
```

**Methods**

```typescript
public constructor(error: Err, response?: Res, previous?: Error)
public toString(): string
```

**Types**

```typescript
type Err = {                // Error
  readonly message: string, // Message for human
  readonly code:    string  // Code for machine
};
```

```typescript
type Res = {                                            // HTTP response
  readonly statusCode:  string,                         // HTTP response status code
           headers?:   {readonly [key:string]: string}, // HTTP headers
           body?:       any                             // HTTP body
};
```

# Installation

`npm install @leismore/lmerror`

# Example

```typescript
const LMError = require('@leismore/lmerror');

throw new LMError(
  {message: 'invalid data', code: '258985'},
  {
    statusCode: '500',
    headers:    {'Content-Type': 'application/json'},
    body:       {reason: 'invalid data'}
  },
  previousError
);
```

# Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author)

# License

MIT License

# Credit

Inspired greatly by [http-errors](https://www.npmjs.com/package/http-errors)
