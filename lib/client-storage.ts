export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

type ProgressTracker = 'achievements' | 'creatures';

type ProgressBackup = {
  format: 'how-to-fish-progress';
  version: 1;
  tracker: ProgressTracker;
  ids: string[];
};

function validUniqueIds(value: unknown, validIds: readonly string[]) {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(validIds);
  return Array.from(new Set(value.filter((id): id is string => typeof id === 'string' && allowed.has(id))));
}

export function getBrowserStorage(): StorageLike | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readStoredIds(storage: StorageLike | null, key: string, validIds: readonly string[]): { ids: string[]; available: boolean } {
  if (!storage) return { ids: [], available: false };
  try {
    const raw = storage.getItem(key);
    if (!raw) return { ids: [], available: true };
    try {
      return { ids: validUniqueIds(JSON.parse(raw), validIds), available: true };
    } catch {
      return { ids: [], available: true };
    }
  } catch {
    return { ids: [], available: false };
  }
}

export function writeStoredIds(storage: StorageLike | null, key: string, ids: readonly string[]) {
  if (!storage) return false;
  try {
    storage.setItem(key, JSON.stringify(Array.from(new Set(ids))));
    return true;
  } catch {
    return false;
  }
}

export function writeStoredValue(storage: StorageLike | null, key: string, value: string) {
  if (!storage) return false;
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeStoredIds(storage: StorageLike | null, key: string) {
  if (!storage) return false;
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function encodeProgressBackup(tracker: ProgressTracker, ids: readonly string[]) {
  const backup: ProgressBackup = {
    format: 'how-to-fish-progress',
    version: 1,
    tracker,
    ids: Array.from(new Set(ids)),
  };
  return JSON.stringify(backup);
}

export function decodeProgressBackup(raw: string, tracker: ProgressTracker, validIds: readonly string[]): { ok: true; ids: string[] } | { ok: false; error: string } {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'Paste a valid How to Fish progress backup.' };
  }
  if (!value || typeof value !== 'object') return { ok: false, error: 'Paste a valid How to Fish progress backup.' };
  const backup = value as Partial<ProgressBackup>;
  if (backup.format !== 'how-to-fish-progress') return { ok: false, error: 'Paste a valid How to Fish progress backup.' };
  if (backup.version !== 1) return { ok: false, error: 'This backup version is not supported.' };
  if (backup.tracker !== tracker) return { ok: false, error: 'This backup belongs to a different tracker.' };
  return { ok: true, ids: validUniqueIds(backup.ids, validIds) };
}
