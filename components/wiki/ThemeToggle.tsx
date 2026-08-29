'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { nextWikiTheme, type WikiTheme } from '@/lib/wiki-template';
import { getBrowserStorage, writeStoredValue } from '@/lib/client-storage';

export function ThemeToggle({ expanded = false }: { expanded?: boolean }) {
  const [theme, setTheme] = useState<WikiTheme>('reef-dark');

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === 'reef-dark' || current === 'editorial-light') setTheme(current);
  }, []);

  function toggleTheme() {
    const next = nextWikiTheme(document.documentElement.dataset.theme ?? theme);
    document.documentElement.dataset.theme = next;
    writeStoredValue(getBrowserStorage(), 'wiki-theme', next);
    setTheme(next);
  }

  const isLight = theme === 'editorial-light';
  const label = isLight ? 'Switch to reef dark theme' : 'Switch to editorial light theme';
  return <button type="button" onClick={toggleTheme} className={`h-11 items-center justify-center gap-2 rounded-md border border-wiki-border-strong px-3 text-xs font-semibold text-wiki-secondary hover:bg-wiki-elevated hover:text-wiki-primary ${expanded ? 'flex w-full' : 'grid w-11 place-items-center'}`} aria-label={label} title={isLight ? 'Use reef dark theme' : 'Use editorial light theme'}>{isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}{expanded ? <span>{isLight ? 'Use reef dark theme' : 'Use editorial light theme'}</span> : null}</button>;
}
