import { randomUniqueRange, sort } from './algorithm';

describe('sort', () => {
  it('smallest to largest', () => {
    expect(sort([1, 3, 4, 2, 5])).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('largest to smallest', () => {
    expect(sort([1, 3, 4, 2, 5], 'desc')).toStrictEqual([5, 4, 3, 2, 1]);
  });
});

describe('randomUniqueRange', () => {
  it('correct number generation', () => {
    const numbers = randomUniqueRange(10, 5);

    expect(numbers.length).toBe(5);
    expect(numbers.some((a) => 10 <= a)).toBeFalsy();
  });

  it('if size is less than count - get all elements', () => {
    const numbers = randomUniqueRange(5, 10);

    expect(numbers).toStrictEqual([0, 1, 2, 3, 4]);
  });

  it('generating elements with offset by number', () => {
    const numbers = randomUniqueRange(5, 10, 6);

    expect(numbers).toStrictEqual([6, 7, 8, 9, 10]);
  });
});
