// Copyright (c) 2026 Cerify Systems. All rights reserved.
// SPDX-License-Identifier: LicenseRef-Cerify-Proprietary

// Runs before first paint so the page never flashes the wrong theme. It cannot import, so the
// storage key and cookie name repeat those in src/lib/theme.ts (a test keeps them equal).
(() => {
  const isTheme = (value) => value === 'dark' || value === 'light';

  const readCookie = () =>
    document.cookie
      .split(';')
      .map((pair) => pair.trim().split('='))
      .find(([name]) => name === 'cerify-theme')?.[1];

  const readStorage = () => {
    try {
      return localStorage.getItem('theme');
    } catch {
      return null;
    }
  };

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = [readCookie(), readStorage()].find(isTheme) ?? (prefersDark ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
})();
