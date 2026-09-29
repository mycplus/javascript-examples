# Prime numbers in JavaScript

[![prime-numbers](https://github.com/mycplus/javascript-examples/actions/workflows/prime-numbers.yml/badge.svg)](https://github.com/mycplus/javascript-examples/actions/workflows/prime-numbers.yml)

Companion code for [Prime Number Programs in C, C++, Java, Python, C#, PHP and JavaScript](https://www.mycplus.com/computer-science/algorithms/prime-number-program/) on MYCPLUS: a primality test by trial division up to the square root, and the Sieve of Eratosthenes. The same program exists in seven languages and every version prints the same output.

| File | What it is |
| --- | --- |
| `primes.js` | `isPrime()`, a `Uint8Array` sieve and the demo (ES module) |
| `tests/primes.test.js` | Tests using the built-in `node:test` runner |

Requires Node.js 22 or later; no npm packages.

## Build and test

```sh
node primes.js
npm test
```

## What the build checks

- Runs on Node.js 22 and 24, on Linux and Windows.
- Trial division agrees with the sieve on every number below 200,000.
- Known primes (including 2147483647, 1000000007 and 999999999989) and composites (including negatives, 0, 1, squares of primes and Carmichael numbers 561 and 1105) are classified correctly.
- The sieve reproduces the published prime counts: 168 below 1,000, 78,498 below 1,000,000 and 664,579 below 10,000,000.
- The demo prints exactly `tests/expected/primes.txt`, the same file in all seven repositories.
- `isPrime()` refuses values that are not safe integers (beyond 2^53 - 1, fractions, NaN, Infinity) with a `RangeError`.
