import Logger from '../../../Domain/Shared/Service/Logger';

/* eslint-disable no-console @typescript-eslint/no-explicit-any */
export default class ConsoleLogger implements Logger {
  log(message: string, content: any): void {
    console.log(message, content);
  }

  warn(message: string, content: any): void {
    console.warn(message, content);
  }

  error(message: string, content: any): void {
    console.error(message, content);
  }
}
