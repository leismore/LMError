# LMError

The general Error class for LMOS NodeJS projects.

# Motivation

Define a extendable Error class for describing Error Code, HTTP Status Code and Previous Error.

## Class Structure

LMError

*   @attr {string}               message    - Human-readable text
*   @attr {string}               code       - Machine-readable code, digit
*   @attr {string       | null}  httpCode   - HTTP status code
*   @attr {Error object | null}  previous   - The previous Error object

# Installation

`npm install @leismore/LMError`

# Syntax

`new LMError( message, code, [ httpCode=null, [previous=null] ] );`

## Parameters

* @param {string}       message             - Human-readable text
* @param {string}       code                - Machine-readable code, digit
* @param {string}       [httpCode = null]   - HTTP status code
* @param {Error object} [previous = null]   - The previous Error object

## Error

Error object, message:

*   invalid message
*   invalid code
*   invalid httpCode
*   invalid previous

# Example

```
const LMError = require('@leismore/LMError');

throw new LMError('error message', '23', '415', previousError);
```

# Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author)

# License

MIT License

Copyright (c) 2019 leismore

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
