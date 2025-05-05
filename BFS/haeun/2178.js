const solution = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const [fLine, ...input] = fs
        .readFileSync(filePath, 'utf-8')
        .trim()
        .toString()
        .split('\n')
        .map((line) => line.trim());

    const [N, M] = fLine.split(' ').map(Number);
    const board = input.map((line) => {
        return line.split('').map(Number);
    });

    const dist = Array.from({ length: N }, () => Array(M).fill(-1));
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    const BFS = (x, y) => {
        const queue = [];
        queue.push([x, y]);
        dist[x][y] = 1;

        while (queue.length) {
            const [cx, cy] = queue.shift();

            for (let [dx, dy] of directions) {
                const nx = cx + dx;
                const ny = cy + dy;

                if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
                    if (dist[nx][ny] === -1 && board[nx][ny] === 1) {
                        // 방문하지 않은 경우
                        dist[nx][ny] = dist[cx][cy] + 1;
                        queue.push([nx, ny]);
                    }
                }
            }
        }

        return dist[N - 1][M - 1];
    };

    console.log(BFS(0, 0));
};

solution();
