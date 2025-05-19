const input = () => {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

    const [size, ...video] = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

    return { size: Number(size), video: video.map((line) => line.split('').map(Number)) };
};

const helper = ({ video, size }) => {
    const res = [];

    const compression = (sx, sy, size) => {
        const ex = sx + size - 1;
        const ey = sy + size - 1;

        if (size === 1) {
            res.push(video[sx][sy]);
            return;
        }

        let isSame = true;
        outer: for (let x = sx; x <= ex; x++) {
            for (let y = sy; y <= ey; y++) {
                isSame = isSame && video[sx][sy] === video[x][y];
                if (!isSame) break outer;
            }
        }

        if (isSame) {
            res.push(video[sx][sy]);
            return;
        }

        res.push('(');
        const newSize = size / 2;
        compression(sx, sy, newSize); //왼쪽 위
        compression(sx, sy + newSize, newSize); //오른쪽 위
        compression(sx + newSize, sy, newSize); //왼쪽 아래
        compression(sx + newSize, sy + newSize, newSize); //오른쪽 아래
        res.push(')');
    };

    compression(0, 0, size);

    return res.join('');
};

const solution = () => {
    const { size, video } = input();
    const res = helper({ size, video });

    console.log(res);
};

solution();
