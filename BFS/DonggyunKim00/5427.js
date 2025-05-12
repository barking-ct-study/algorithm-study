const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const bfs = (w, h, graph) => {
  const F_visited = Array.from({ length: h }, () => Array(w).fill(0));
  const S_visited = Array.from({ length: h }, () => Array(w).fill(0));

  let head = 0;
  const queue = [];

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (graph[i][j] === '*') {
        queue.push([i, j, 'F']);
        F_visited[i][j] = 1;
      }
    }
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (graph[i][j] === '@') {
        queue.push([i, j, 'S']);
        S_visited[i][j] = 1;
      }
    }
  }

  while (queue.length > head) {
    const [x, y, type] = queue[head++];

    for (let dir = 0; dir < 4; dir++) {
      const mx = x + dx[dir];
      const my = y + dy[dir];

      // 상근이가 탈출에 성공
      if (type === 'S' && (mx < 0 || my < 0 || mx >= h || my >= w)) {
        return S_visited[x][y];
      }

      if (mx < 0 || my < 0 || mx >= h || my >= w) continue;
      if (graph[mx][my] === '#') continue;

      if (type === 'F') {
        if (!F_visited[mx][my]) {
          F_visited[mx][my] = F_visited[x][y] + 1;
          queue.push([mx, my, 'F']);
        }
      }

      if (type === 'S') {
        if (
          !S_visited[mx][my] &&
          graph[mx][my] === '.' &&
          (F_visited[mx][my] === 0 || S_visited[x][y] + 1 < F_visited[mx][my])
        ) {
          S_visited[mx][my] = S_visited[x][y] + 1;
          queue.push([mx, my, 'S']);
        }
      }
    }
  }

  return 'IMPOSSIBLE';
};

const T = Number(input.shift());

const solution = () => {
  let idx = 0;
  for (let i = 0; i < T; i++) {
    const [w, h] = input[idx].split(' ').map(Number);
    const graph = input
      .slice(idx + 1, idx + 1 + h)
      .map((line) => line.split(''));
    idx += h + 1;
    console.log(bfs(w, h, graph));
  }
};

solution();
