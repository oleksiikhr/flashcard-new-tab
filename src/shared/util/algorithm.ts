export function shuffle<T>(numbers: T[]): T[] {
  return numbers.sort(() => Math.random() - 0.5);
}

export function sort(
  numbers: number[],
  order: 'asc' | 'desc' = 'asc',
): number[] {
  if (order === 'asc') {
    return numbers.sort((a, b) => a - b);
  }

  return numbers.sort((a, b) => b - a);
}

export function randomUniqueRange(
  size: number,
  count: number,
  startAt = 0,
): number[] {
  const numbers = [...Array(size).keys()].map((i) => i + startAt);

  shuffle(numbers);

  return sort(numbers.slice(0, count));
}

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
