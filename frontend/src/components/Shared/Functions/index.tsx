"use client";

import { useEffect } from 'react';

export function ThemeInitializer() {
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return null;
}
