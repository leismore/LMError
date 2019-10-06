/**
 * Res type for describing HTTP response info.
 */

export type Res = {                                     // HTTP response
  readonly statusCode:  string,                         // HTTP response status code
           headers?:   {readonly [key:string]: string}, // HTTP headers
           body?:       any                             // HTTP body
};
