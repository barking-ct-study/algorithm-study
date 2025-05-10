const input = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const [, ...input] = fs
        .readFileSync(filePath, 'utf-8')
        .toString()
        .trim()
        .split('\n')
        .map((line) => line.trim().split(''));

    return input;
};

const BFS = (graph, sameColor) => {
    const N = graph.length;
    const visited = Array.from({ length: graph.length }, () => Array(graph[0].length).fill(false));
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    const queue = [];
    let cnt = 0;

    for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
            if (visited[x][y]) continue;

            visited[x][y] = true;
            cnt++;
            queue.push([x, y]);

            while (queue.length) {
                const [cx, cy] = queue.shift();

                for (let [dx, dy] of directions) {
                    const nx = cx + dx;
                    const ny = cy + dy;

                    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

                    if (!visited[nx][ny]) {
                        if (
                            graph[nx][ny] === graph[cx][cy] ||
                            (sameColor.includes(graph[nx][ny]) && sameColor.includes(graph[cx][cy]))
                        ) {
                            visited[nx][ny] = true;
                            queue.push([nx, ny]);
                        }
                    }
                }
            }
        }
    }

    return cnt;
};

const solution = () => {
    const graph = input();

    console.log(BFS(graph, []), BFS(graph, ['R', 'G']));
};

solution();
