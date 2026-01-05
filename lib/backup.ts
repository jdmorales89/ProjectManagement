export type BackupBlob = {
  version: number;
  exportedAt: string;
  data: Record<string, unknown>;
};

export function makeBackup(keys: string[]): BackupBlob {
  const data: Record<string, unknown> = {};
  for (const k of keys) {
    try {
      const raw = localStorage.getItem(k);
      if (raw) data[k] = JSON.parse(raw);
    } catch {}
  }
  return { version: 1, exportedAt: new Date().toISOString(), data };
}

export function downloadJSON(obj: unknown, filename = 'vibe-board-backup.json') {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export async function importBackup(file: File): Promise<Record<string, unknown>> {
  const text = await file.text();
  const parsed = JSON.parse(text) as BackupBlob | Record<string, unknown>;
  const payload: Record<string, unknown> = 'data' in parsed ? (parsed as BackupBlob).data : (parsed as Record<string, unknown>);
  for (const [k, v] of Object.entries(payload)) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  }
  return payload;
}
