const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim();

const N = Number(input);
const SQUARE = ['***', '* *', '***'];

const solution = (N) => {
  if (N === 3) return SQUARE;

  const square = solution(N / 3);
  const answer = [];

  square.forEach((item) => {
    answer.push(item + item + item);
  });

  square.forEach((item) => {
    answer.push(item + ' '.repeat(N / 3) + item);
  });

  square.forEach((item) => {
    answer.push(item + item + item);
  });

  return answer;
};

console.log(solution(N).join('\n'));
