// JavaScript Collatz Conjecture Benchmark
// Rango: 1 a 5,000,000

const N = 5000000;

function getCollatzLength(n) {
    let len = 1;
    let curr = n;
    while (curr > 1) {
        if (curr % 2 === 0) {
            curr = curr / 2;
        } else {
            curr = 3 * curr + 1;
        }
        len++;
    }
    return len;
}

function main() {
    let maxLen = 0;
    let bestNum = 0;
    for (let i = 1; i <= N; i++) {
        const len = getCollatzLength(i);
        if (len > maxLen) {
            maxLen = len;
            bestNum = i;
        }
    }
    console.log(`Best: ${bestNum} with length: ${maxLen}`);
}

main();
