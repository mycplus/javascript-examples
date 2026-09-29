// Run from the example directory: node --test tests/
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { countPrimesBelow, isPrime, main, sieve } from '../primes.js';

test('small and edge values', () => {
  for (const p of [2, 3, 5, 7, 11, 13, 97, 7919, 1000003, 2147483647, 1000000007, 999999999989]) {
    assert.equal(isPrime(p), true, `${p}`);
  }
  for (const c of [-7, -1, 0, 1, 4, 6, 9, 25, 49, 91, 121, 561, 1105, 7917,
    1000003 * 1000003, 1000003 * 1000033, 2147483647 * 2]) {
    assert.equal(isPrime(c), false, `${c}`);
  }
  assert.equal(isPrime(9007199254740881), true);   // largest prime below 2^53
});

test('refuses values it cannot represent exactly', () => {
  for (const bad of [2 ** 53, 2.5, NaN, Infinity]) {
    assert.throws(() => isPrime(bad), RangeError);
  }
});

test('trial division matches the sieve', () => {
  const flags = sieve(200000);
  for (let k = 0; k < 200000; k++) assert.equal(isPrime(k), flags[k] === 1, `${k}`);
});

test('prime counts', () => {
  for (const [limit, count] of [[0, 0], [1, 0], [2, 0], [3, 1], [10, 4], [100, 25],
    [1000, 168], [1000000, 78498], [10000000, 664579]]) {
    assert.equal(countPrimesBelow(limit), count, `${limit}`);
  }
});

test('demo output', () => {
  const lines = [];
  const original = console.log;
  console.log = (s) => lines.push(`${s}\n`);
  try { main(); } finally { console.log = original; }
  const expected = readFileSync(new URL('./expected/primes.txt', import.meta.url), 'utf8');
  assert.equal(lines.join(''), expected.replaceAll('\r', ''));
});
