'use client';

import { useTheme } from '@/lib/contexts/ThemeContext';

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`bg-[url('/metal.png')] py-8 `}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 text-center font-serif">
          <p className="font-sans">
            &copy; {new Date().getFullYear()} BAUplus All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
