import {
  Calculator,
  ClipboardList,
  Home,
  LayoutDashboard,
  SettingsIcon,
  ShoppingBasket,
  UserCircle,
  Users,
  Wallet,
} from 'lucide-react';

export default [
  {
    path: '',
    title: 'Home',
    icon: <Home size={20} />,
    showForm: true,
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: <LayoutDashboard size={17} />,
    showForm: false,
  },
  {
    path: 'finance',
    title: 'Finance',
    icon: <Calculator size={18} />,
    showForm: false,
  },
  // {
  //   path: 'bankaccounts',
  //   title: 'Bank Accounts',
  // },
  {
    path: 'hr',
    title: 'HR',
    icon: <Users size={18} />,
    showForm: false,
  },
  {
    path: 'settings',
    title: 'Settings',
    icon: <SettingsIcon size={18} />,
    showForm: false,
  },
  {
    path: 'payroll',
    title: 'Payroll',
    icon: <Wallet size={18} />,
    showForm: false,
  },
  {
    path: 'users',
    title: 'Users',
    icon: <UserCircle size={18} />,
    showForm: false,
  },
  {
    path: 'products',
    title: 'Products',
    icon: <ShoppingBasket size={18} />,
    showForm: false,
  },
  {
    path: 'notices',
    title: 'Notice Board',
    icon: <ClipboardList size={18} />,
    showForm: false,
  },
];
