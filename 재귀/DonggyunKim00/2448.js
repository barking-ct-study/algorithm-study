const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim();

const N = Number(input); // 높이

const solution = () => {
  const recursion = (h) => {
    if (h === 3) {
      return ['  *  ', ' * * ', '*****'];
    }

    const stars = recursion(h / 2);
    const answer = [];

    // 상단 별 생성
    stars.forEach((star) => {
      answer.push(' '.repeat(h / 2) + star + ' '.repeat(h / 2));
    });

    // 하단 별 생성
    stars.forEach((star) => {
      answer.push(star + ' ' + star);
    });

    return answer;
  };

  console.log(recursion(N).join('\n'));
};

solution();
