const solution = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const [first, ...input] = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

    const [N, M] = first.split(' ').map(Number);
    const board = input.map((line) => {
        const newLine = [];
        line.split(' ').forEach((num) => newLine.push(Number(num)));
        return newLine;
    });

    const visited = Array.from({ length: N }, () => Array(M).fill(false));
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, 1, -1];

    const BFS = (x, y) => {
        if (!board[x][y] || visited[x][y]) return 0;

        const queue = [];

        visited[x][y] = true;
        queue.push([x, y]);
        let area = 1;

        while (queue.length) {
            const [cx, cy] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nx = cx + dx[i];
                const ny = cy + dy[i];

                if (nx < N && nx >= 0 && ny < M && ny >= 0) {
                    if (board[nx][ny] && !visited[nx][ny]) {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                        area++;
                    }
                }
            }
        }
        return area;
    };

    let max = 0;
    let cnt = 0;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            const area = BFS(i, j);

            if (area > 0) cnt++;

            if (max < area) {
                max = area;
            }
        }
    }

    console.log(cnt);
    console.log(max);
};

solution();
