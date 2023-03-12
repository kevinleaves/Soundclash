import { useState, useEffect } from 'react';

export default function useDarkMode() {
  // initial check for preexisting user preference
  const [theme, setTheme] = useState(localStorage.theme);
  const color = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(color);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, textColor]);

  return [color, setTheme];
}
