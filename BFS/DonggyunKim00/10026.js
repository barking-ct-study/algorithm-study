const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const N = Number(input.shift());
const graph = input.map((item) => item.split(''));

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const dfs = (x, y, visited, isColorBlind) => {
  visited[x][y] = 1;

  for (let dir = 0; dir < 4; dir++) {
    const mx = x + dx[dir];
    const my = y + dy[dir];

    if (mx < 0 || my < 0 || mx >= N || my >= N) continue;
    if (visited[mx][my]) continue;

    if (isColorBlind) {
      const str = graph[x][y] + graph[mx][my];
      if (str == 'RG' || str === 'GR' || graph[x][y] === graph[mx][my])
        dfs(mx, my, visited, isColorBlind);
    } else {
      if (graph[x][y] === graph[mx][my]) dfs(mx, my, visited, isColorBlind);
    }
  }
};

const solution = () => {
  const g_visited = Array.from({ length: N }, () => Array(N).fill(0));
  const b_visited = Array.from({ length: N }, () => Array(N).fill(0));

  const answer = {
    g_cnt: 0,
    b_cnt: 0,
  };

  // 색맹 X
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!g_visited[i][j]) {
        dfs(i, j, g_visited, false);
        answer.g_cnt += 1;
      }
    }
  }

  // 색맹 O
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!b_visited[i][j]) {
        dfs(i, j, b_visited, true);
        answer.b_cnt += 1;
      }
    }
  }

  return answer;
};

const { g_cnt, b_cnt } = solution();
console.log(g_cnt);
console.log(b_cnt);
