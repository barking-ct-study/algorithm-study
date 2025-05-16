const input = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
    const input = fs
        .readFileSync(filePath, 'utf-8')
        .toString()
        .trim()
        .split('\n')
        .map((line) => line.trim());

    const [M, N, H] = input.shift().split(' ').map(Number);

    const boxes = Array.from({ length: H }, () => []);

    for (let h = 0; h < H; h++) {
        boxes[h] = [];
        for (let l = 0; l < N; l++) {
            boxes[h][l] = input[h * N + l].split(' ').map(Number);
        }
    }

    const tomatoArr = [];

    for (let h = 0; h < H; h++) {
        for (let l = 0; l < N; l++) {
            for (let w = 0; w < M; w++) {
                if (boxes[h][l][w] === 1) tomatoArr.push([h, l, w]);
            }
        }
    }

    return [M, N, H, boxes, tomatoArr];
};

const BFS = (boxes, initialArr) => {
    const H = boxes.length;
    const N = boxes[0].length;
    const M = boxes[0][0].length;

    const dist = Array.from({ length: H }, () => Array.from({ length: N }, () => Array(M).fill(-1)));
    const queue = [...initialArr];
    let head = 0;
    initialArr.forEach(([h, l, w]) => {
        dist[h][l][w] = 0;
    });

    const directions = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
    ];

    while (head !== queue.length) {
        const [ch, cx, cy] = queue[head++];

        for (let [dh, dx, dy] of directions) {
            const nh = ch + dh;
            const nx = cx + dx;
            const ny = cy + dy;

            if (nx < 0 || ny < 0 || nx >= N || ny >= M || nh < 0 || nh >= H) continue;
            if (dist[nh][nx][ny] === -1 && boxes[nh][nx][ny] === 0) {
                dist[nh][nx][ny] = dist[ch][cx][cy] + 1;
                queue.push([nh, nx, ny]);
            }
        }
    }

    let max = 0;

    for (let h = 0; h < H; h++) {
        for (let l = 0; l < N; l++) {
            for (let w = 0; w < M; w++) {
                if (boxes[h][l][w] === 0) {
                    if (dist[h][l][w] === -1) return -1;

                    max = Math.max(max, dist[h][l][w]);
                }
            }
        }
    }

    return max;
};

const solution = () => {
    const [M, N, H, boxes, tomatoArr] = input();
    const res = BFS(boxes, tomatoArr);

    console.log(res);
};

solution();
