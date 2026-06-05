// Rust Collatz Conjecture Benchmark
// Rango: 1 a 5,000,000

const N: u64 = 5_000_000;

fn get_collatz_length(n: u64) -> u32 {
    let mut len = 1;
    let mut curr = n;
    while curr > 1 {
        if curr % 2 == 0 {
            curr /= 2;
        } else {
            curr = 3 * curr + 1;
        }
        len += 1;
    }
    len
}

fn main() {
    let mut max_len = 0;
    let mut best_num = 0;
    for i in 1..=N {
        let len = get_collatz_length(i);
        if len > max_len {
            max_len = len;
            best_num = i;
        }
    }
    println!("Best: {} with length: {}", best_num, max_len);
}
