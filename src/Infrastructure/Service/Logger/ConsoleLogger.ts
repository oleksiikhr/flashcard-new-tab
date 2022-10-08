import Logger from '../../../Domain/Service/Logger';

/* eslint-disable no-console */

export default class ConsoleLogger implements Logger {
  info(
    module: string,
    handler: string,
    action: string,
    context?: object,
  ): void {
    console.log(`[${module}] ${handler}@${action}`, context);
  }

  warn(
    module: string,
    handler: string,
    action: string,
    context?: object,
  ): void {
    console.warn(`[${module}] ${handler}@${action}`, context);
  }

  error(
    module: string,
    handler: string,
    action: string,
    context?: object,
  ): void {
    console.error(`[${module}] ${handler}@${action}`, context);
  }

  debug(
    module: string,
    handler: string,
    action: string,
    context?: object,
  ): void {
    console.debug(`[${module}] ${handler}@${action}`, context);
  }
}
