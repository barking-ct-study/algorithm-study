const input = require('fs')
  .readFileSync('text.txt')
  .toString()
  .trim()
  .split('\n');
const [M, N, K] = input.shift().split(' ').map(Number);

const graph = Array.from(Array(M), () => Array(N).fill(0));
const answer = [];

// 입력값을 그래프로 변환하기 위한 반복문
for (let i = 0; i < K; i += 1) {
  const [x1, y1, x2, y2] = input[i].split(' ').map(Number);

  // 직사각형 영역은 1로 표시, 빈 영역은 0으로 표시
  for (let y = M - y2; y < M - y1; y += 1) {
    for (let x = x1; x < x2; x += 1) {
      graph[y][x] = 1;
    }
  }
}

function bfs(start) {
  const ds = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ]; // 좌우상하
  const queue = [start]; // 시작점은 무조건 돌아야 하는 노드이기 때문에 큐에 넣고 시작

  let count = 0;

  while (queue.length) {
    // 큐에 남아 있는 노드가 없다면 탐색이 종료된 것
    const [cy, cx] = queue.shift();
    count += 1;

    for (let i = 0; i < 4; i += 1) {
      const ny = cy + ds[i][1];
      const nx = cx + ds[i][0];

      // 해당 위치가 그래프를 벗어나지 않고, 아직 방문하지 않은 노드(0)라면 방문 처리 후 큐에 담기
      if (ny >= 0 && ny < M && nx >= 0 && nx < N && !graph[ny][nx]) {
        graph[ny][nx] = 1;
        queue.push([ny, nx]);
      }
    }
  }

  return count;
}

for (let i = 0; i < M; i += 1) {
  for (let j = 0; j < N; j += 1) {
    // 아직 방문하지 않은 노드(0)라면
    if (!graph[i][j]) {
      graph[i][j] = 1; // 방문 처리
      answer.push(bfs([i, j])); // bfs를 실행해 영역 칸 개수를 배열에 담음
    }
  }
}

console.log(answer.length);
console.log(answer.sort((a, b) => a - b).join(' '));
