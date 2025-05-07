const BFS = (sx, sy, cabbage, visited, N, M) => {
    if (cabbage[sx][sy] === 0 || visited[sx][sy]) return 0;

    const queue = [];
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    visited[sx][sy] = true;
    queue.push([sx, sy]);

    while (queue.length) {
        const [cx, cy] = queue.shift();

        for (let [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

            if (!visited[nx][ny] && cabbage[nx][ny]) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
            }
        }
    }

    return 1;
};

const solution = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const input = fs
        .readFileSync(filePath, 'utf-8')
        .toString()
        .trim()
        .split('\n')
        .map((line) => line.trim());

    const T = Number(input[0]);
    const res = [];

    for (let i = 1; i < input.length; ) {
        const [M, N, K] = input[i].split(' ').map(Number);
        const cabbage = Array.from({ length: N }, () => Array(M).fill(0));
        const visited = Array.from({ length: N }, () => Array(M).fill(false));

        for (let j = i + 1; j <= i + K; j++) {
            const [r, c] = input[j].split(' ').map(Number);
            cabbage[c][r] = 1;
        }

        let cnt = 0;
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < M; c++) {
                cnt += BFS(r, c, cabbage, visited, N, M);
            }
        }

        res.push(cnt);

        i += K + 1;
    }

    return res.join('\n');
};

console.log(solution());
