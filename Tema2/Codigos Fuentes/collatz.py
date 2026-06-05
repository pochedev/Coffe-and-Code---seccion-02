# Python Collatz Conjecture Benchmark
# Rango: 1 a 5,000,000

N = 5000000

def get_collatz_length(n):
    length = 1
    curr = n
    while curr > 1:
        if curr % 2 == 0:
            curr = curr // 2
        else:
            curr = 3 * curr + 1
        length += 1
    return length

def main():
    max_len = 0
    best_num = 0
    for i in range(1, N + 1):
        length = get_collatz_length(i)
        if length > max_len:
            max_len = length
            best_num = i
    print(f"Best: {best_num} with length: {max_len}")

if __name__ == "__main__":
    main()
