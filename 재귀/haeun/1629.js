const input = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split(' ').map(BigInt);

    return input;
};

const mod = (A, B, C) => {
    if (B === 1n) return A % C;

    const half = mod(A, B / 2n, C);

    if (B % 2n === 0n) return half ** 2n % C;
    else return ((half ** 2n * A) % C) % C;
};

const solution = () => {
    const [A, B, C] = input();
    console.log(Number(mod(A, B, C)));
};

solution();
