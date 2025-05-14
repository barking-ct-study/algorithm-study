const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const N = Number(input.shift());
const graph = input.map((item) => item.split('').map(Number));

const solution = (size, graph) => {
  const arr = [];

  const recursion = (x, y, size) => {
    let cnt = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // 시작 좌표와 영역 내의 값들과 비교
        if (graph[y][x] === graph[y + i][x + j]) cnt += 1;
      }
    }

    // cnt 값과 영역의 size가 같으면 시작좌표 값 리턴
    if (cnt === size * size) return arr.push(graph[y][x]);

    // 나눠진 사이즈의 영역마다 재귀 호출
    const newSize = size / 2;
    arr.push('(');
    recursion(x, y, newSize);
    recursion(x + 1 * newSize, y, newSize);
    recursion(x, y + 1 * newSize, newSize);
    recursion(x + 1 * newSize, y + 1 * newSize, newSize);
    arr.push(')');
  };

  recursion(0, 0, size);

  console.log(arr.join(''));
};

solution(N, graph);
