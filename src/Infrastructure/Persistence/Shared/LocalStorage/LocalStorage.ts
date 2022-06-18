import { warn } from '../../../../Domain/Shared/Util/logger';
import { isObject } from '../../../../Domain/Shared/Util/type';

export default class LocalStorage {
  public getObject<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);

    if (null === item) {
      return undefined;
    }

    let data;

    try {
      data = JSON.parse(item) as T;
    } catch (e) {
      warn(e);
      return undefined;
    }

    if (!isObject(data)) {
      warn(`This "${key}" key is not an object`);
      return undefined;
    }

    return data;
  }

  public setObject<T>(key: string, obj: T): void {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}
