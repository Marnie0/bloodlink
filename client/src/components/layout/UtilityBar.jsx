import { Contrast, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function UtilityBar() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );

  const [highContrast, setHighContrast] = useState(() => document.documentElement.classList.contains('hc'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('bl-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('bl-high-contrast', highContrast.toString());
    document.documentElement.classList.toggle('hc', highContrast);
  }, [highContrast]);

  const today = new Date();
  const arabicDate = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'full' }).format(today);
  const isoDate = today.toISOString().split('T')[0];

  return (
    <div className="bg-surface border-line text-ink-2 border-b text-[0.8rem]">
      <div className="xs:justify-between mx-auto flex min-h-9 max-w-7xl items-center justify-center px-4">
        <time className="text-tiny text-ink-2 sm:text-small xs:block hidden" dateTime={isoDate}>
          {arabicDate}
        </time>
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-pressed={highContrast}
            onClick={() => setHighContrast(!highContrast)}
            className="btn btn-ghost btn-xs aria-pressed:bg-navy border-line rounded-full aria-pressed:text-white"
          >
            <Contrast className="size-4" aria-hidden="true" />
            تباين عالٍ
          </button>
          <span aria-hidden="true" className="border-line h-4 border-s"></span>
          <button
            type="button"
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="btn btn-ghost btn-xs aria-pressed:bg-navy border-line rounded-full aria-pressed:text-white"
          >
            <Moon className="size-4" aria-hidden="true" />
            الوضع الداكن
          </button>
        </div>
      </div>
    </div>
  );
}
