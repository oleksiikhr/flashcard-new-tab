import { isObject } from '../../../../Domain/Shared/Util/type';
import Logger from '../../../../Domain/Shared/Service/Logger';

export default class LocalStorage {
  constructor(private logger: Logger) {}

  public getObject<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);

    if (null === item) {
      return undefined;
    }

    let data;

    try {
      data = JSON.parse(item) as T;
    } catch (err) {
      this.logger.warn((err as Error).message, { err });
      return undefined;
    }

    if (!isObject(data)) {
      this.logger.warn(`This "${key}" key is not an object`);
      return undefined;
    }

    return data;
  }

  public setObject<T>(key: string, obj: T): void {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}
