export function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

export enum ScrollDirection {
  Negative, // Going up
  Positive, // Going down
}
