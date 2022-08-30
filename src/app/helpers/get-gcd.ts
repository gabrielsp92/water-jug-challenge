/* Euclid's algorithm */
export const getGcd = (c1: number, c2: number): number => {
  let gcd;
  let r;
  while (c2 > 0) {
    r = c1 % c2
    c1 = c2
    gcd = c2
    c2 = r
  }
  return gcd
}