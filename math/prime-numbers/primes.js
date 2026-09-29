// primes.js - test one number for primality, and list primes with the
// Sieve of Eratosthenes. Run: node primes.js
import { pathToFileURL } from 'node:url';

// Trial division by 2, 3 and then 6k - 1 and 6k + 1 up to sqrt(n).
// Numbers are doubles, exact only up to Number.MAX_SAFE_INTEGER (2^53 - 1),
// so larger inputs are refused rather than answered wrongly.
export function isPrime(n) {
  if (!Number.isSafeInteger(n)) {
    throw new RangeError(`isPrime needs a safe integer, got ${n}`);
  }
  if (n < 2) return false;
  if (n < 4) return true;                       // 2 and 3
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {         // i * i stays exact here
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// flags[k] is 1 when k is prime, for 0 <= k < limit.
export function sieve(limit) {
  const flags = new Uint8Array(limit).fill(1);
  flags.fill(0, 0, Math.min(limit, 2));         // 0 and 1
  for (let p = 2; p * p < limit; p++) {
    if (!flags[p]) continue;
    for (let m = p * p; m < limit; m += p) flags[m] = 0;
  }
  return flags;
}

export function countPrimesBelow(limit) {
  return sieve(limit).reduce((sum, f) => sum + f, 0);
}

export function main() {
  const flags = sieve(100);
  const list = [];
  for (let k = 0; k < 100; k++) if (flags[k]) list.push(k);
  console.log(`primes below 100: ${list.join(' ')}`);
  console.log(`primes below 1000: ${countPrimesBelow(1000)}`);
  console.log(`primes below 1000000: ${countPrimesBelow(1000000)}`);
  const samples = [-7, 0, 1, 2, 91, 97];
  console.log(`is_prime: ${samples.map((n) => `${n} ${isPrime(n)}`).join(', ')}`);
  console.log(`is_prime(2147483647) = ${isPrime(2147483647)}`);
  console.log(`is_prime(1000000007) = ${isPrime(1000000007)}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
