const input = require('fs')
  .readFileSync('text.txt')
  .toString()
  .trim()
  .split('\n');

const [M, N, H] = input.shift().split(' ').map(Number);

const dx = [-1, 1, 0, 0, 0, 0];
const dy = [0, 0, -1, 1, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];
const queue = [];

const boxes = Array.from(
  Array(H),
  () => Array.from(N),
  () => Array.from(Array(M).fill(0))
);

for (let i = 0; i < H; i += 1) {
  for (let j = 0; j < N; j += 1) {
    boxes[i][j] = input.shift().split(' ').map(Number);
  }
}

let unripeTomatoes = 0;

for (let z = 0; z < H; z += 1) {
  for (let x = 0; x < N; x += 1) {
    for (let y = 0; y < M; y += 1) {
      if (boxes[z][x][y] === 0) unripeTomatoes += 1;
      if (boxes[z][x][y] === 1) queue.push([z, x, y, 0]);
    }
  }
}

let index = 0;
let answer = 0;

while (queue.length > index) {
  const [z, x, y, days] = queue[index++];

  for (let i = 0; i < 6; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    const nz = z + dz[i];

    if (
      nz >= 0 &&
      nz < H &&
      nx >= 0 &&
      nx < N &&
      ny >= 0 &&
      ny < M &&
      !boxes[nz][nx][ny]
    ) {
      boxes[nz][nx][ny] = 1;
      queue.push([nz, nx, ny, days + 1]);
      unripeTomatoes -= 1;
    }
  }

  answer = days;
}

console.log(unripeTomatoes ? -1 : answer);
