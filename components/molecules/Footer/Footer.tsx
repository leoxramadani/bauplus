'use client';

import { useTheme } from '@/lib/contexts/ThemeContext';

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`py-8  ${
        isDarkMode
          ? 'bg-gradient-to-t from-black/75 to-transparent text-slate-100 '
          : 'bg-gradient-to-t from-slate-400 to-slate-100 text-slate-900 '
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 text-center font-serif">
          <p className="font-serif">
            &copy; {new Date().getFullYear()} BAUplus All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
