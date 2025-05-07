const input = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    return fs.readFileSync(filePath, 'utf-8').toString().trim().split(' ').map(Number);
};

const BFS = (sx, target) => {
    const dist = Array(100001).fill(-1);

    // 수빈이의 위치
    const queue = [sx];
    dist[sx] = 0;

    while (queue.length) {
        const cx = queue.shift(); //현재 위치

        for (let dx of [-1, 1, cx]) {
            const nx = cx + dx; //다음 위치

            //범위 벗어나는 경우 건너 뛰기
            if (nx < 0 || nx > 100000) continue;

            if (dist[nx] === -1) {
                dist[nx] = dist[cx] + 1;
                queue.push(nx);
            }
        }
    }

    return dist[target];
};

const solution = () => {
    const [N, K] = input();
    console.log(BFS(N, K));
};

solution();
