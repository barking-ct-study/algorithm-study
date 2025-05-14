const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy] = [
  [-2, -1, 1, 2, 2, 1, -1, -2],
  [-1, -2, -2, -1, 1, 2, 2, 1],
];

const bfs = (l, start, goal) => {
  const visited = Array.from({ length: l }, () => Array(l).fill(0));
  const [start_x, start_y] = start;
  const [goal_x, goal_y] = goal;

  const queue = [[start_x, start_y]];
  visited[start_x][start_y] = 1;

  while (queue.length) {
    const [x, y] = queue.shift();

    if (x === goal_x && y === goal_y) return visited[x][y] - 1;

    for (let dir = 0; dir < 8; dir++) {
      const mx = x + dx[dir];
      const my = y + dy[dir];

      if (mx < 0 || my < 0 || mx >= l || my >= l) continue;
      if (visited[mx][my]) continue;

      queue.push([mx, my]);
      visited[mx][my] = visited[x][y] + 1;
    }
  }
};

const solution = () => {
  const T = Number(input.shift());

  let idx = 0;
  for (let i = 0; i < T; i++) {
    const [l, start, goal] = input.slice(idx, idx + 3);
    const start_pos = start.split(' ').map(Number);
    const goal_pos = goal.split(' ').map(Number);

    console.log(bfs(Number(l), start_pos, goal_pos));

    idx += 3;
  }
};

solution();
