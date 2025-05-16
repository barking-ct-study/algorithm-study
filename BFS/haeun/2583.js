const input = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
    const input = fs
        .readFileSync(filePath, 'utf-8')
        .toString()
        .trim()
        .split('\n')
        .map((line) => line.trim());

    const [M, N, K] = input.shift().split(' ').map(Number);
    const square = Array.from({ length: M }, () => Array(N).fill(0));

    for (position of input) {
        const [bl_x, bl_y, tr_x, tr_y] = position.split(' ').map(Number);

        for (let r = bl_y; r < tr_y; r++) {
            for (let c = bl_x; c < tr_x; c++) {
                square[r][c] = 1;
            }
        }
    }

    return { square, M, N };
};

const BFS = ({ visited, M, N, square, sx, sy }) => {
    const queue = [[sx, sy]];
    visited[sx][sy] = true;
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    let cnt = 1;

    while (queue.length) {
        const [cx, cy] = queue.shift();
        for (let [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
            if (!visited[nx][ny] && !square[nx][ny]) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);

                cnt++;
            }
        }
    }

    return cnt;
};

const solution = () => {
    const { square, M, N } = input();
    const visited = Array.from({ length: M }, () => Array(N).fill(false));

    const res = [];

    for (let sx = 0; sx < M; sx++) {
        for (let sy = 0; sy < N; sy++) {
            if (!visited[sx][sy] && !square[sx][sy]) res.push(BFS({ visited, square, sx, sy, M, N }));
        }
    }

    console.log(res.length);
    console.log(res.sort((a, b) => a - b).join(' '));
};

solution();
