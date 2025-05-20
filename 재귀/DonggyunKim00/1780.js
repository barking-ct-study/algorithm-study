const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const N = Number(input.shift());
const graph = input.map((item) => item.split(' ').map(Number));

const solution = () => {
  let answer = {
    '-1': 0,
    0: 0,
    1: 0,
  };

  const recursion = (x, y, size) => {
    let cnt = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (graph[y][x] === graph[y + i][x + j]) cnt += 1;
      }
    }

    if (cnt === size * size) return (answer[graph[y][x]] += 1);

    const newSize = size / 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        recursion(x + j * newSize, y + i * newSize, newSize);
      }
    }
  };

  recursion(0, 0, N);

  Object.keys(answer)
    .sort((a, b) => a - b)
    .forEach((key) => {
      console.log(answer[key]);
    });
};

solution();
