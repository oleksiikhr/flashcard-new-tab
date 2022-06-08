function shuffle(numbers: number[]): void {
  numbers.sort(() => Math.random() - 0.5);
}

export function randomUniqueRange(size: number, count: number, startAt = 0) {
  // TODO Better algorithm
  const numbers = [...Array(size).keys()].map((i) => i + startAt);

  shuffle(numbers);

  return numbers.slice(0, count);
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  randomUniqueRange,
  shuffle,
  random,
};
