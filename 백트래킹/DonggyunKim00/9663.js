const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim();

const N = Number(input);
const queens = [];

const checkPosition = (row, col) => {
  for (const [y, x] of queens) {
    if (row === y || col === x) return false;
    if (Math.abs(row - y) === Math.abs(col - x)) return false;
  }

  return true;
};

const solution = () => {
  let cnt = 0;

  const dfs = (row) => {
    if (row === N) return (cnt += 1);

    for (let i = 0; i < N; i++) {
      if (!checkPosition(row, i)) continue;
      queens.push([row, i]);
      dfs(row + 1);
      queens.pop();
    }
  };

  dfs(0);

  console.log(cnt);
};

solution();
