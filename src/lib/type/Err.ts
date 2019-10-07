/**
 * Rrr type for describing error info.
 */

type Err = {
  readonly message: string, // Message for human
  readonly code:    string  // Code for machine
};

export {Err};
