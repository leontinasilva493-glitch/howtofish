import assert from 'node:assert/strict';
import test from 'node:test';

import { completeNestedNavigation } from '../lib/mobile-navigation';

test('search result navigation closes both the search dialog and its parent drawer', () => {
  const calls: string[] = [];
  completeNestedNavigation(() => calls.push('search'), () => calls.push('drawer'));
  assert.deepEqual(calls, ['search', 'drawer']);
});

test('desktop search navigation closes cleanly without a parent drawer', () => {
  const calls: string[] = [];
  completeNestedNavigation(() => calls.push('search'));
  assert.deepEqual(calls, ['search']);
});
