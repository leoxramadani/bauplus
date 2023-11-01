import {
  Calculator,
  ClipboardList,
  Home,
  LayoutDashboard,
  Settings,
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
    path: 'clients',
    title: 'Clients',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-book-user"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <circle cx="12" cy="8" r="2" />
        <path d="M15 13a3 3 0 1 0-6 0" />
      </svg>
    ),
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
  {
    path: 'account',
    title: 'Account settings',
    icon: <Settings size={18} />,
  },
];
