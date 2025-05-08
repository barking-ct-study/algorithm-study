const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const [N, K] = input;

const bfs = (N, K) => {
  const queue = [[N, 0]];
  const visited = Array(100001).fill(0);
  visited[N] = 1;

  while (queue.length) {
    const [prev, cnt] = queue.shift();
    if (prev === K) return cnt;

    for (let i = 0; i < 3; i++) {
      let curr = prev;
      if (i === 0) curr -= 1;
      if (i === 1) curr += 1;
      if (i === 2) curr *= 2;

      if (curr < 0 || curr > 100000) continue;
      if (visited[curr]) continue;

      queue.push([curr, cnt + 1]);
      visited[curr] = 1;
    }
  }
};

console.log(bfs(N, K));
