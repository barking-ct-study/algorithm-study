const input = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const [firstLine, ...input] = fs
        .readFileSync(filePath, 'utf-8')
        .toString()
        .split('\n')
        .map((line) => line.trim());

    const [R, C] = firstLine.split(' ').map(Number);
    const maze = input.map((line) => line.split(''));

    return { R, C, maze };
};

const BFS = (posArr, R, C, maze) => {
    const dist = Array.from({ length: R }, () => Array(C).fill(-1));
    const queue = [];
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    posArr.forEach(([i, j]) => {
        dist[i][j] = 0;
        queue.push([i, j]);
    });

    while (queue.length) {
        const [cx, cy] = queue.shift();

        for (let [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (nx >= R || nx < 0 || ny >= C || ny < 0) continue;

            if (maze[nx][ny] === '#' || dist[nx][ny] !== -1) continue;

            dist[nx][ny] = dist[cx][cy] + 1;
            queue.push([nx, ny]);
        }
    }

    return dist;
};

const checkPosition = (R, C, maze) => {
    const exits = [];
    let J = null;
    let F = [];

    for (let i = 0; i < R; i++) {
        //가장자리 탈출구 찾기: 가로
        if (i === 0 || i === R - 1) {
            maze[i].forEach((c, j) => {
                if (c === '.' || c === 'J') {
                    exits.push([i, j]);
                }
            });
        }

        for (let j = 0; j < C; j++) {
            //가장자리 탈출구 찾기: 세로
            if (j === 0 || j === C - 1) {
                if (maze[i][j] === '.') exits.push([i, j]);

                if (maze[i][j] === 'J') exits.push([i, j]);
            }

            if (maze[i][j] === 'J') {
                J = [i, j];
            } else if (maze[i][j] === 'F') {
                F.push([i, j]);
            }
        }
    }

    return { exits, J, F };
};

const solution = () => {
    const { R, C, maze } = input();
    const { exits, J, F } = checkPosition(R, C, maze);

    const FDist = BFS(F, R, C, maze);
    const JDist = BFS([J], R, C, maze);

    let min = Infinity;

    for (const [x, y] of exits) {
        const jd = JDist[x][y];
        const fd = FDist[x][y];

        if (jd !== -1 && (fd === -1 || jd < fd)) {
            min = Math.min(min, jd);
        }
    }
    return min === Infinity ? 'IMPOSSIBLE' : min + 1;
};

console.log(solution());
