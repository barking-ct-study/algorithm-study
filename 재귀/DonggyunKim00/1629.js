const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);

const [A, B, C] = input;

const solution = (a, b, c) => {
  if (b === 1n) return a % c;

  const halfB = solution(a, b / 2n, c);

  // b가 짝수
  // A^B = A^(B/2) * A^(B/2)
  if (b % 2n === 0n) return (halfB * halfB) % c;

  // b가 홀수
  // A^B = A^(B/2) * A^(B/2) * A
  if (b % 2n === 1n) return (((halfB * halfB) % c) * a) % c;
};

console.log(solution(A, B, C).toString());
