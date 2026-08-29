import assert from 'node:assert/strict';
import test from 'node:test';

import {
  decodeProgressBackup,
  encodeProgressBackup,
  readStoredIds,
  removeStoredIds,
  writeStoredIds,
  type StorageLike,
} from '../lib/client-storage';

class MemoryStorage implements StorageLike {
  private values = new Map<string, string>();

  constructor(private readonly fail: 'none' | 'read' | 'write' | 'remove' = 'none') {}

  getItem(key: string) {
    if (this.fail === 'read') throw new Error('blocked');
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    if (this.fail === 'write') throw new Error('blocked');
    this.values.set(key, value);
  }

  removeItem(key: string) {
    if (this.fail === 'remove') throw new Error('blocked');
    this.values.delete(key);
  }
}

test('stored progress keeps only current valid ids and survives malformed JSON', () => {
  const storage = new MemoryStorage();
  storage.setItem('progress', JSON.stringify(['rock-crab', 42, 'unknown', 'rock-crab']));
  assert.deepEqual(readStoredIds(storage, 'progress', ['rock-crab', 'shrimp']), { ids: ['rock-crab'], available: true });

  storage.setItem('progress', '{broken');
  assert.deepEqual(readStoredIds(storage, 'progress', ['rock-crab']), { ids: [], available: true });
});

test('blocked browser storage returns explicit session-only results', () => {
  assert.deepEqual(readStoredIds(new MemoryStorage('read'), 'progress', ['rock-crab']), { ids: [], available: false });
  assert.equal(writeStoredIds(new MemoryStorage('write'), 'progress', ['rock-crab']), false);
  assert.equal(removeStoredIds(new MemoryStorage('remove'), 'progress'), false);
});

test('portable backups round-trip only for the expected tracker and schema', () => {
  const backup = encodeProgressBackup('creatures', ['rock-crab', 'shrimp']);
  assert.deepEqual(decodeProgressBackup(backup, 'creatures', ['rock-crab', 'shrimp', 'lobster']), { ok: true, ids: ['rock-crab', 'shrimp'] });
  assert.deepEqual(decodeProgressBackup(backup, 'achievements', ['rock-crab']), { ok: false, error: 'This backup belongs to a different tracker.' });
  assert.deepEqual(decodeProgressBackup('{broken', 'creatures', ['rock-crab']), { ok: false, error: 'Paste a valid How to Fish progress backup.' });
  assert.deepEqual(decodeProgressBackup(JSON.stringify({ format: 'how-to-fish-progress', version: 2, tracker: 'creatures', ids: [] }), 'creatures', []), { ok: false, error: 'This backup version is not supported.' });
});
