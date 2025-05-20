const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const [N, r, c] = input;

const solution = () => {
  let cnt = 0;
  const recursion = (x, y, size) => {
    if (r < y || r >= y + size || c < x || c >= x + size) {
      cnt += size * size; // 범위 밖이면 돌고있는 Z영역 만큼 더해주고 다음으로 넘어가기
      return;
    }

    if (size === 1) {
      if (y === r && x === c) console.log(cnt);
      cnt++;
      return;
    }

    // Z 방향을 따라 이동
    const newSize = size / 2;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        recursion(x + j * newSize, y + i * newSize, newSize);
      }
    }
  };

  recursion(0, 0, 2 ** N);
};

solution();
