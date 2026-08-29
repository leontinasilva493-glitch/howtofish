'use client';

import { useState } from 'react';
import { decodeProgressBackup, encodeProgressBackup } from '@/lib/client-storage';

export function ProgressBackup({ tracker, ids, validIds, onRestore, onReset }: { tracker: 'achievements' | 'creatures'; ids: string[]; validIds: readonly string[]; onRestore: (ids: string[]) => void; onReset: () => void }) {
  const [backupText, setBackupText] = useState('');
  const [status, setStatus] = useState('');

  function createBackup() {
    setBackupText(encodeProgressBackup(tracker, ids));
    setStatus('Backup ready. Copy this text to move progress to another browser.');
  }

  function restoreBackup() {
    const result = decodeProgressBackup(backupText, tracker, validIds);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    onRestore(result.ids);
    setStatus(`Restored ${result.ids.length} progress ${result.ids.length === 1 ? 'item' : 'items'}.`);
  }

  function resetProgress() {
    if (!window.confirm('Reset all saved progress for this tracker on this device?')) return;
    onReset();
    setBackupText('');
    setStatus('Progress reset on this device.');
  }

  return <details className="progress-backup"><summary>Backup or reset progress</summary><div><p>Backups are plain text. They contain only the checklist IDs you marked, never a Steam account or gameplay credential.</p><div className="progress-backup-actions"><button type="button" className="wiki-button wiki-button-secondary" onClick={createBackup}>Create backup</button><button type="button" className="wiki-button progress-reset-button" onClick={resetProgress}>Reset progress</button></div><label><span>Backup text</span><textarea value={backupText} onChange={(event) => setBackupText(event.target.value)} placeholder="Create a backup here, or paste one from another browser." /></label><button type="button" className="wiki-button wiki-button-primary" onClick={restoreBackup}>Restore backup</button><p className="progress-backup-status" aria-live="polite">{status}</p></div></details>;
}
