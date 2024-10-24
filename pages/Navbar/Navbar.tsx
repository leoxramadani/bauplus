'use client';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LogoPng from './../../public/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // To check if component is mounted

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Set isMounted to true after the first render
    setIsMounted(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Render only on the client side to avoid hydration errors
  if (!isMounted) {
    return null; // Prevent rendering until mounted
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/30 shadow-lg backdrop-blur-md'
          : 'bg-slate-100'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex w-auto flex-row text-xl font-bold"
          >
            <Image
              src={LogoPng}
              alt="Logo"
              width={50}
              height={50}
              className="bg-transparent"
            />
            <div className="h-auto w-auto flex-1 flex-col justify-around text-sm">
              <p>BAUplus</p>
              <p className="mt-[6px]">Skele & Fasada</p>
            </div>
          </Link>

          {/* Hamburger Menu for Mobile View */}
          <div className="md:hidden">
            <IconButton
              onClick={handleMenuClick}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link href="/" className="hover:text-gray-600">
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/Skele" className="hover:text-gray-600">
                  Skele
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/Izolime" className="hover:text-gray-600">
                  Izolime
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link
                  href="/Dekorime"
                  className="hover:text-gray-600"
                >
                  Dekorime
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/Contact" className="hover:text-gray-600">
                  Contact
                </Link>
              </MenuItem>
            </Menu>
          </div>

          {/* Desktop Links */}
          <div className="hidden space-x-8 md:flex">
            <Link href="/" className="hover:text-gray-600">
              Home
            </Link>
            <Link href="/Skele" className="hover:text-gray-600">
              Skele
            </Link>
            <Link href="/Izolime" className="hover:text-gray-600">
              Izolime
            </Link>
            <Link href="/Dekorime" className="hover:text-gray-600">
              Dekorime
            </Link>
            <Link href="/Contact" className="hover:text-gray-600">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
