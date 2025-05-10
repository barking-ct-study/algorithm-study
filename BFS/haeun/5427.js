const input = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const input = fs
        .readFileSync(filePath, 'utf-8')
        .toString()
        .trim()
        .split('\n')
        .map((line) => line.trim());

    const T = Number(input.shift());

    const testCase = [];

    for (let idx = 0; idx < input.length; ) {
        const [w, h] = input[idx].split(' ').map(Number);
        const building = input.slice(idx + 1, idx + 1 + h).map((line) => line.split(''));

        testCase.push({ w, h, building });
        idx += h + 1;
    }

    return testCase;
};

const checkPosition = (building) => {
    const h = building.length;
    const w = building[0].length;

    const fires = [];
    const man = [];
    const exits = [];

    //상근이와 불의 위치
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (building[i][j] === '*') fires.push([i, j]);
            else if (building[i][j] === '@') man.push([i, j]);
        }
    }

    //탈출구 위치
    for (let i = 0; i < w; i++) {
        if (building[0][i] === '.') exits.push([0, i]);
        if (building[h - 1][i] === '.') exits.push([h - 1, i]);
    }
    for (let j = 1; j < h - 1; j++) {
        if (building[j][0] === '.') exits.push([j, 0]);
        if (building[j][w - 1] === '.') exits.push([j, w - 1]);
    }

    return { fires, man, exits };
};

const BFS = (arr, building) => {
    const h = building.length;
    const w = building[0].length;

    const dist = Array.from({ length: h }, () => Array(w).fill(Infinity));
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    const queue = [...arr];
    let head = 0;
    arr.forEach(([x, y]) => {
        dist[x][y] = 1;
    });

    while (queue.length !== head) {
        const [cx, cy] = queue[head++];

        for (let [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (nx < 0 || nx >= h || ny < 0 || ny >= w) continue;

            if (dist[nx][ny] === Infinity && (building[nx][ny] === '.' || building[nx][ny] === '@')) {
                dist[nx][ny] = dist[cx][cy] + 1;
                queue.push([nx, ny]);
            }
        }
    }

    return dist;
};

const solution = () => {
    const testCases = input();
    const res = [];

    for (let testCase of testCases) {
        const { w, h, building } = testCase;
        const { fires, man, exits } = checkPosition(building);
        const [[x, y]] = man;

        const distF = BFS(fires, building);
        if (x === h - 1 || y === w - 1 || x === 0 || y === 0) {
            res.push(1);
            continue;
        }

        const distS = BFS(man, building);

        let min = Infinity;

        for (let [ex, ey] of exits) {
            if (distS[ex][ey] !== Infinity && distF[ex][ey] > distS[ex][ey]) {
                min = Math.min(min, distS[ex][ey]);
            }
        }

        res.push(min === Infinity ? 'IMPOSSIBLE' : min);
    }

    console.log(res.join('\n'));
};

solution();
