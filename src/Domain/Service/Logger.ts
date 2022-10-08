export default interface Logger {
  info(module: string, handler: string, action: string, context?: object): void;

  warn(module: string, handler: string, action: string, context?: object): void;

  error(
    module: string,
    handler: string,
    action: string,
    context?: object,
  ): void;

  debug(
    module: string,
    handler: string,
    action: string,
    context?: object,
  ): void;
}
