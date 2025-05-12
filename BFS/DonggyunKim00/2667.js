const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const N = Number(input.shift());
const graph = input.map((item) => item.split('').map(Number));

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const dfs = (x, y, visited) => {
  let house_count = 1;
  visited[x][y] = 1;

  for (let dir = 0; dir < 4; dir++) {
    const mx = x + dx[dir];
    const my = y + dy[dir];

    if (mx < 0 || my < 0 || mx >= N || my >= N) continue;
    if (visited[mx][my] || !graph[mx][my]) continue;

    house_count += dfs(mx, my, visited);
  }

  return house_count;
};

const solution = () => {
  const visited = Array.from({ length: N }, () => Array(N).fill(0));

  let cnt = 0;
  const compare_arr = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] && !visited[i][j]) {
        const house_cnt = dfs(i, j, visited);
        compare_arr.push(house_cnt);
        cnt += 1;
      }
    }
  }

  return { cnt, compare_arr };
};

const { cnt, compare_arr } = solution();
console.log(cnt);
console.log(compare_arr.sort((a, b) => a - b).join('\n'));
