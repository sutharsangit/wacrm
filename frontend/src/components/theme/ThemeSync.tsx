'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function ThemeSync() {
  const theme = useAuthStore((state) => state.theme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      const body = window.document.body;
      
      if (theme === 'light') {
        root.classList.add('light-theme');
        body.classList.add('light-theme');
      } else {
        root.classList.remove('light-theme');
        body.classList.remove('light-theme');
      }
    }
  }, [theme]);

  return null;
}
