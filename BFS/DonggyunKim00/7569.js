const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy, dz] = [
  [1, -1, 0, 0, 0, 0],
  [0, 0, 1, -1, 0, 0],
  [0, 0, 0, 0, 1, -1],
];

const bfs = (M, N, H, graph, starts, tomatoType) => {
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: N }, () => Array(M).fill(0))
  );

  const queue = [];
  let head = 0;

  for (const [x, y, z] of starts) {
    visited[z][y][x] = true;
    queue.push([x, y, z, 0]);
  }

  let maxTime = 0;

  while (queue.length > head) {
    const [x, y, z, time] = queue[head++];

    maxTime = time;

    for (let dir = 0; dir < 6; dir++) {
      const mx = x + dx[dir];
      const my = y + dy[dir];
      const mz = z + dz[dir];

      if (mx < 0 || my < 0 || mz < 0 || mx >= M || my >= N || mz >= H) continue;
      if (graph[mz][my][mx] === -1 || visited[mz][my][mx]) continue;

      queue.push([mx, my, mz, time + 1]);
      graph[mz][my][mx] = 1;
      visited[mz][my][mx] = 1;
      tomatoType[0]--; // 익지 않은 토마토 감소
      tomatoType[1]++; // 익은 토마토 증가
    }
  }

  return tomatoType[0] === 0 ? maxTime : -1;
};

const solution = () => {
  const [info, ...rest] = input;
  const [M, N, H] = info.split(' ').map(Number);

  // 층 단위로 graph 만들기
  const flatGraph = rest.map((line) => line.split(' ').map(Number));
  const graph = [];

  let idx = 0;
  for (let z = 0; z < H; z++) {
    const floor = flatGraph.slice(idx, idx + N);
    graph.push(floor);
    idx += N;
  }

  // 시작 위치 찾기, 토마토 분류
  const starts = [];
  const tomatoType = {
    0: 0,
    1: 0,
  };

  for (let z = 0; z < H; z++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (graph[z][y][x] === 0) tomatoType[0]++;
        if (graph[z][y][x] === 1) {
          tomatoType[1]++;
          starts.push([x, y, z]);
        }
      }
    }
  }

  const result = bfs(M, N, H, graph, starts, tomatoType);
  console.log(result);
};

solution();
