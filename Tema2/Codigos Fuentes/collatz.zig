// Zig Collatz Conjecture Benchmark
// Rango: 1 a 5,000,000

const std = @import("std");

const N: u64 = 5_000_000;

fn getCollatzLength(n: u64) u32 {
    var len: u32 = 1;
    var curr = n;
    while (curr > 1) {
        if (curr % 2 == 0) {
            curr = curr / 2;
        } else {
            curr = 3 * curr + 1;
        }
        len += 1;
    }
    return len;
}

pub fn main() void {
    var max_len: u32 = 0;
    var best_num: u64 = 0;
    
    var i: u64 = 1;
    while (i <= N) : (i += 1) {
        const len = getCollatzLength(i);
        if (len > max_len) {
            max_len = len;
            best_num = i;
        }
    }
    std.debug.print("Best: {d} with length: {d}\n", .{ best_num, max_len });
}
