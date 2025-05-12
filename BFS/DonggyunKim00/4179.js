const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [R, C] = input[0].split(' ').map(Number);
const graph = input.slice(1).map((item) => item.split(''));

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const bfs = (j_start, f_start) => {
  const j_visited = Array.from({ length: R }, () => Array(C).fill(0));
  const f_visited = Array.from({ length: R }, () => Array(C).fill(0));
  const queue = [];

  // 불을 queue에 삽입
  f_start.forEach(([x, y]) => {
    f_visited[x][y] = 1;
    queue.push({ value: 'F', pos: [x, y] });
  });

  // 지훈이 queue에 삽입
  j_visited[j_start[0]][j_start[1]] = 1;
  queue.push({ value: 'J', pos: j_start });

  while (queue.length) {
    const { value, pos } = queue.shift();
    const [x, y] = pos;

    // 지훈이가 탈출했는지 확인
    if (value === 'J' && (x === 0 || y === 0 || x === R - 1 || y === C - 1)) {
      return j_visited[x][y];
    }

    for (let dir = 0; dir < 4; dir++) {
      const mx = x + dx[dir];
      const my = y + dy[dir];
      if (mx < 0 || my < 0 || mx >= R || my >= C) continue;

      if (value === 'F') {
        if (f_visited[mx][my] || graph[mx][my] === '#') continue;
        f_visited[mx][my] = f_visited[x][y] + 1;
      }

      if (value === 'J') {
        if (
          j_visited[mx][my] ||
          graph[mx][my] === '#' ||
          (f_visited[mx][my] !== 0 && f_visited[mx][my] <= j_visited[x][y] + 1)
        )
          continue;
        j_visited[mx][my] = j_visited[x][y] + 1;
      }

      queue.push({ value, pos: [mx, my] });
    }
  }

  return 'IMPOSSIBLE';
};

const start = {
  j_start: [],
  f_start: [],
};
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (graph[i][j] === 'J') start['j_start'] = [i, j];
    if (graph[i][j] === 'F') start['f_start'].push([i, j]);
  }
}

console.log(bfs(start['j_start'], start['f_start']));
