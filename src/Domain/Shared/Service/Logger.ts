/* eslint-disable @typescript-eslint/no-explicit-any */

export default interface Logger {
  log(message: string, content?: object): void;

  warn(message: string, content?: object): void;

  error(message: string, content?: object): void;
}
