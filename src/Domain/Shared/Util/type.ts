// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(data: any): boolean {
  return null !== data && 'object' === typeof data && !Array.isArray(data);
}

export function toArray<T>(data: T | T[]): T[] {
  if (Array.isArray(data)) {
    return data;
  }

  return [data];
}

export default {
  isObject,
};
