'use client';
import { useTheme } from '@/lib/contexts/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toggleDarkMode, isDarkMode } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const isActiveLink = (path: string) => {
    if (router.pathname === path) {
      return isDarkMode ? 'text-blue-300' : 'text-blue-600';
    }
    return isDarkMode ? 'text-slate-100' : 'text-gray-800';
  };

  return (
    <div>
      {!isSidebarOpen && (
        <IconButton
          onClick={toggleSidebar}
          color="primary"
          aria-label="menu"
          className={`fixed left-4 top-4 z-[9999] rounded-md  ${
            isDarkMode ? 'bg-white ' : 'bg-black/30'
          }`}
        >
          <MenuIcon />
        </IconButton>
      )}

      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full w-64 transform bg-white/10 text-black shadow-lg backdrop-blur-md ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-[9999] transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? 'text-slate-100' : 'text-black'
            }`}
          >
            Menu
          </h2>
          <IconButton onClick={toggleSidebar} className="bg-blue-400">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="flex flex-col space-y-4 p-4 font-serif">
          <Link
            href="/"
            onClick={toggleSidebar}
            className={`hover:text-gray-600 ${isActiveLink('/')}`}
          >
            Home
          </Link>
          <Link
            href="/Skele"
            onClick={toggleSidebar}
            className={`hover:text-gray-600 ${isActiveLink(
              '/Skele'
            )}`}
          >
            Skele
          </Link>
          <Link
            href="/Izolime"
            onClick={toggleSidebar}
            className={`hover:text-gray-600 ${isActiveLink(
              '/Izolime'
            )}`}
          >
            Izolime
          </Link>
          <Link
            href="/Dekorime"
            onClick={toggleSidebar}
            className={`hover:text-gray-600 ${isActiveLink(
              '/Dekorime'
            )}`}
          >
            Dekorime
          </Link>
          <Link
            href="/Contact"
            onClick={toggleSidebar}
            className={`hover:text-gray-600 ${isActiveLink(
              '/Contact'
            )}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
