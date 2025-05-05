const solution = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const [fl, ...input] = fs
        .readFileSync(filePath, 'utf-8')
        .toString()
        .split('\n')
        .map((line) => line.trim());

    const [M, N] = fl.split(' ').map(Number);
    const box = input.map((line) => line.split(' ').map(Number));

    const daysToRipen = Array.from({ length: N }, () => Array(M).fill(-1));
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    // 초기 토마토 모두 큐에 넣기기
    const queue = [];
    let head = 0;
    let top = 0;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (box[i][j] === 1) {
                daysToRipen[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }

    const BFS = () => {
        let days = 0;
        while (queue.length !== head) {
            const [cx, cy] = queue[head++];

            for (let [dx, dy] of directions) {
                const nx = cx + dx;
                const ny = cy + dy;

                if (nx >= N || nx < 0 || ny >= M || ny < 0) continue;

                if (box[nx][ny] === 0 && daysToRipen[nx][ny] === -1) {
                    daysToRipen[nx][ny] = daysToRipen[cx][cy] + 1;
                    queue.push([nx, ny]);
                    if (days < daysToRipen[nx][ny]) days = daysToRipen[nx][ny];
                }
            }
        }
        return days;
    };

    const days = BFS();

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (daysToRipen[i][j] === -1 && box[i][j] !== -1) return -1;
        }
    }

    return days;
};

console.log(solution());
