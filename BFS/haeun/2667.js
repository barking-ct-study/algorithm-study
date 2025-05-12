const input = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const [, ...input] = fs
        .readFileSync(filePath, 'utf-8')
        .toString()
        .trim()
        .split('\n')
        .map((line) => line.trim().split('').map(Number));
    return input;
};

const BFS = (graph, visited, sx, sy) => {
    const N = graph.length;
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    const queue = [[sx, sy]];
    visited[sx][sy] = true;
    let cnt = 1;

    while (queue.length) {
        const [cx, cy] = queue.shift();

        for (let [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (nx >= N || ny >= N || nx < 0 || ny < 0) continue;

            if (!visited[nx][ny] && graph[nx][ny] === 1) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
                cnt++;
            }
        }
    }

    return cnt;
};

const solution = () => {
    const graph = input();
    const N = graph.length;
    const visited = Array.from({ length: N }, () => Array(N).fill(false));

    let res = [];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (!visited[i][j] && graph[i][j]) res.push(BFS(graph, visited, i, j));
        }
    }
    res.sort((a, b) => a - b).unshift(res.length);
    return res.join('\n');
};

console.log(solution());
