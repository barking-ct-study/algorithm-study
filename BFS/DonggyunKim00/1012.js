const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const T = Number(input.shift());
const graph = input.map((item) => item.split(' ').map(Number));

let idx = 0;
for (let t = 0; t < T; t++) {
  const [M, N, K] = graph[idx];
  const arr = graph.slice(idx + 1, idx + K + 1);

  const ground = makeGround(M, N, arr);
  const visited = Array.from({ length: N }, () => Array(M).fill(0));

  let count = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!ground[y][x] || visited[y][x]) continue;
      dfs(x, y, ground, visited);
      count += 1;
    }
  }

  console.log(count);

  idx += K + 1;
}

function makeGround(M, N, arr) {
  const ground = Array.from({ length: N }, () => Array(M).fill(0));

  for (let i = 0; i < arr.length; i++) {
    const [x, y] = arr[i];
    ground[y][x] = 1;
  }

  return ground;
}

function dfs(x, y, graph, visited) {
  visited[y][x] = 1;

  for (let dir = 0; dir < 4; dir++) {
    const mx = x + dx[dir];
    const my = y + dy[dir];
    if (mx < 0 || my < 0 || mx >= graph[0].length || my >= graph.length)
      continue;
    if (!graph[my][mx] || visited[my][mx]) continue;
    dfs(mx, my, graph, visited);
  }
}
