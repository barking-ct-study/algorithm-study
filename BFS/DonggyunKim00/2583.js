const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const dfs = (x, y, graph) => {
  let area_count = 1;
  graph[y][x] = 1;

  for (let dir = 0; dir < 4; dir++) {
    const mx = x + dx[dir];
    const my = y + dy[dir];

    if (mx < 0 || my < 0 || mx >= graph[0].length || my >= graph.length)
      continue;
    if (graph[my][mx] === '#' || graph[my][mx]) continue;

    area_count += dfs(mx, my, graph);
  }

  return area_count;
};

const fillRectangle = (pos, graph) => {
  const [ax, ay, bx, by] = pos;

  for (let i = ay; i < by; i++) {
    for (let j = ax; j < bx; j++) {
      graph[i][j] = '#';
    }
  }
};

const solution = () => {
  const [info, ...rectangles] = input;
  const [M, N, K] = info.split(' ').map(Number);
  const graph = Array.from({ length: M }, () => Array(N).fill(0));

  // 직사각형 생성
  for (let i = 0; i < K; i++) {
    const [ax, ay, bx, by] = rectangles[i].split(' ').map(Number);
    fillRectangle([ax, ay, bx, by], graph);
  }

  let cnt = 0;
  const arr = [];
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (!graph[i][j]) {
        const area_count = dfs(j, i, graph);
        arr.push(area_count);
        cnt += 1;
      }
    }
  }

  return { cnt, arr: arr.sort((a, b) => a - b) };
};

const { cnt, arr } = solution();
console.log(cnt);
console.log(arr.join(' '));
