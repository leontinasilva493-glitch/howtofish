import assert from 'node:assert/strict';
import test from 'node:test';

const trackerPromise = import('../lib/tracker').catch(() => ({}));

test('readTrackerProgress keeps only valid string ids from the current schema', async () => {
  const tracker = await trackerPromise;
  const readTrackerProgress = (tracker as Record<string, unknown>).readTrackerProgress;
  assert.equal(typeof readTrackerProgress, 'function');

  assert.deepEqual(
    (readTrackerProgress as Function)('{"version":1,"completed":["route","missing",3]}', ['route', 'gear']),
    ['route'],
  );
  assert.deepEqual((readTrackerProgress as Function)('not-json', ['route']), []);
  assert.deepEqual((readTrackerProgress as Function)(null, ['route']), []);
});

test('toggleTrackerProgress adds and removes an item without duplicates', async () => {
  const tracker = await trackerPromise;
  const toggleTrackerProgress = (tracker as Record<string, unknown>).toggleTrackerProgress;
  assert.equal(typeof toggleTrackerProgress, 'function');

  assert.deepEqual((toggleTrackerProgress as Function)(['route'], 'gear'), ['route', 'gear']);
  assert.deepEqual((toggleTrackerProgress as Function)(['route', 'gear'], 'route'), ['gear']);
});

test('filterTrackerItems searches copy and respects the selected category', async () => {
  const tracker = await trackerPromise;
  const filterTrackerItems = (tracker as Record<string, unknown>).filterTrackerItems;
  assert.equal(typeof filterTrackerItems, 'function');
  const items = [
    { id: 'route', title: 'Plan an exit route', description: 'Keep a known corridor', category: 'ROUTE' },
    { id: 'gear', title: 'Check useful gear', description: 'Bring a light source', category: 'GEAR' },
  ];
  assert.deepEqual((filterTrackerItems as Function)(items, 'light', 'ALL'), [items[1]]);
  assert.deepEqual((filterTrackerItems as Function)(items, '', 'ROUTE'), [items[0]]);
});
