'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { nextWikiTheme, type WikiTheme } from '@/lib/wiki-template';

export function ThemeToggle() {
  const [theme, setTheme] = useState<WikiTheme>('reef-dark');

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === 'reef-dark' || current === 'editorial-light') setTheme(current);
  }, []);

  function toggleTheme() {
    const next = nextWikiTheme(document.documentElement.dataset.theme ?? theme);
    document.documentElement.dataset.theme = next;
    localStorage.setItem('wiki-theme', next);
    setTheme(next);
  }

  const isLight = theme === 'editorial-light';
  return <button type="button" onClick={toggleTheme} className="grid h-11 w-11 place-items-center rounded-md border border-wiki-border-strong text-wiki-secondary hover:bg-wiki-elevated hover:text-wiki-primary" aria-label={isLight ? 'Switch to reef dark theme' : 'Switch to editorial light theme'} title={isLight ? 'Use reef dark theme' : 'Use editorial light theme'}>{isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</button>;
}
