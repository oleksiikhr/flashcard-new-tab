export function isObject(data: unknown): boolean {
  return data !== null && typeof data === 'object' && !Array.isArray(data);
}

export function toArray<T>(data: T | T[]): T[] {
  if (Array.isArray(data)) {
    return data;
  }

  return [data];
}
