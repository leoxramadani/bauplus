import {
  Calculator,
  Home,
  LayoutDashboard,
  SettingsIcon,
  UserCircle,
  Users,
  Wallet,
} from 'lucide-react';

export default [
  {
    path: '',
    title: 'Home',
    icon: <Home size={20} />,
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: <LayoutDashboard size={17} />,
  },
  {
    path: 'finance',
    title: 'Finance',
    icon: <Calculator size={18} />,
  },
  {
    path: 'bankaccounts',
    title: 'Bank Accounts',
  },
  {
    path: 'hr',
    title: 'HR',
    icon: <Users size={18} />,
  },
  {
    path: 'settings',
    title: 'Settings',
    icon: <SettingsIcon size={18} />,
  },
  {
    path: 'payroll',
    title: 'Payroll',
    icon: <Wallet size={18} />,
  },
  {
    path: 'users',
    title: 'Users',
    icon: <UserCircle size={18} />,
  },
];
