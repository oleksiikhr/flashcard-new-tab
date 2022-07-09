import { isObject, toArray } from './type';

describe('isObject', () => {
  test('The string is not an object', () => {
    expect(isObject('text')).toBeFalsy();
  });

  test('The null is not an object', () => {
    expect(isObject(null)).toBeFalsy();
  });

  test('An array is not an object', () => {
    expect(isObject([])).toBeFalsy();
  });

  test('An empty object is an object', () => {
    expect(isObject({})).toBeTruthy();
  });
});

describe('toArray', () => {
  test('The string becomes an array of strings', () => {
    expect(toArray('text')).toStrictEqual(['text']);
  });

  test('The object becomes an array of objects', () => {
    expect(toArray({ key: 'value' })).toStrictEqual([{ key: 'value' }]);
  });

  test('Nothing happens with an empty array', () => {
    expect(toArray([])).toStrictEqual([]);
  });

  test('Nothing happens with an array of strings', () => {
    expect(toArray(['a', 'b'])).toStrictEqual(['a', 'b']);
  });
});
