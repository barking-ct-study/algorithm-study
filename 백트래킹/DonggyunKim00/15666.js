const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

const [[N, M], arr] = input;

const solution = (nums) => {
  const answer = [];

  const dfs = (startIdx, arr) => {
    if (arr.length === M) return answer.push(arr.join(' '));

    for (let i = startIdx; i < nums.length; i++) {
      dfs(i, [...arr, nums[i]]);
    }
  };

  dfs(0, []);

  console.log(answer.join('\n'));
};

solution([...new Set(arr)].sort((a, b) => a - b));
