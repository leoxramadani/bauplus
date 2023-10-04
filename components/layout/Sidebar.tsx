import {
  ChevronFirst,
  ChevronLast,
  Link as LinkIcon,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
} from 'react';
import {
  Boxes,
  Package,
  UserCircle,
  LayoutDashboard,
  Settings,
  X,
} from 'lucide-react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import Logo from '@/public/logo-arkiva.svg';
import Image from 'next/image';

interface SidebarItemInterface {
  icon: React.JSX.Element;
  text: string;
  alert: boolean;
  href?: string;
}

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isWindowSmall?: boolean;
  setIsWindowSmall: Dispatch<SetStateAction<boolean>>;
  toggleSidebar: () => void;
  expanded: boolean;
}

const SidebarContext = createContext<any>({
  expanded: false,
  isWindowSmall: false,
});

const Sidebar = ({
  isOpen,
  setIsOpen,
  isWindowSmall,
  setIsWindowSmall,
  toggleSidebar,
  expanded,
}: SidebarProps) => {
  return (
    <aside
      className={`fixed z-50 top-0 left-0 h-full ${
        !isWindowSmall
          ? expanded
            ? `max-w-[15rem] transition-all duration-[250ms]`
            : 'max-w-[4.5rem] transition-all duration-[250ms]'
          : `max-w-[15rem] transition-all duration-[250ms]`
      }`}
    >
      <nav className="h-full flex flex-col bg-[#1A202E] border-r shadow-sm w-full">
        <div className="p-3.5 justify-between items-center flex flex-row">
          <Link
            href="/dashboard"
            onClick={() => (isWindowSmall ? setIsOpen(false) : null)}
          >
            <Image
              src={Logo}
              alt="Arkiva Logo"
              className={`overflow-hidden transition-all ${
                !isWindowSmall ? (expanded ? `w-32` : `w-0`) : `w-32`
              } hover:cursor-pointer`}
            />
          </Link>

          <button
            className="rounded-full text-white hover:bg-slate-600 p-0.5"
            // onClick={() => setExpanded((current) => !current)}
          >
            {isWindowSmall ? (
              <X onClick={() => setIsOpen((current) => !current)} />
            ) : expanded ? (
              <ChevronLeft
                onClick={() => toggleSidebar()}
                width={30}
                height={30}
              />
            ) : (
              <ChevronRight
                width={30}
                height={30}
                onClick={() => toggleSidebar()}
              />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, isWindowSmall }}>
          <ul
            className="flex flex-col sm:flex-1 px-3"
            onClick={() => (isWindowSmall ? setIsOpen(false) : null)}
          >
            <SidebarItem
              icon={<LayoutDashboard size={30} />}
              text="Dashboard"
              alert={true}
              href="/dashboard"
            />
            <SidebarItem
              icon={<UserCircle size={30} />}
              text="Users"
              alert={false}
              href="/users"
            />
            <SidebarItem
              icon={<Boxes size={30} />}
              text="Companies"
              alert={false}
              href="/companies"
            />
            <SidebarItem
              icon={<Package size={30} />}
              text="Activities"
              alert
              href="/activities"
            />
            <SidebarItem
              icon={<FileText size={30} />}
              text="Fiscal Invoices"
              alert
              href="/fiscal"
            />

            {!isWindowSmall && (
              <>
                <hr className="my-3" />
                <SidebarItem
                  icon={<Settings size={30} />}
                  text="Settings"
                  alert={false}
                  href="/settings"
                />
              </>
            )}
          </ul>
        </SidebarContext.Provider>

        {!isWindowSmall && (
          <div className="border-t flex py-3 px-1 text-gray-50 hover:bg-slate-600 hover:cursor-pointer">
            <img
              src="https://ui-avatars.com/api/?name=AR&background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md mx-auto "
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                expanded ? 'w-56 ml-3' : 'w-0'
              }
          `}
            >
              <div className="leading-4 ">
                <h4 className="font-semibold ">Ardrin Rexhepi</h4>
                <span className="text-xs">ardrin.rexhepi</span>
              </div>
              {/* <MoreVertical size={20} /> */}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
};
export default Sidebar;

export function SidebarItem({
  icon,
  text,
  alert,
  href,
}: SidebarItemInterface) {
  const { expanded, isWindowSmall } = useContext<any>(SidebarContext);

  const ActiveLink = withRouter(
    ({ router, children, ...props }: PropsWithChildren<any>) => {
      return (
        <Link
          {...props}
          className={`relative flex items-center p-1 justify-center ${
            !isWindowSmall ? `my-2` : `my-1.5`
          } font-medium rounded-[0.6rem] cursor-pointer transition-colors group 
          ${
            router.pathname.startsWith(props.href)
              ? 'bg-slate-500 text-white'
              : 'hover:bg-slate-600 text-white'
          }`}
        >
          {children}
        </Link>
      );
    }
  );

  return (
    <ActiveLink href={href}>
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          !isWindowSmall
            ? expanded
              ? 'w-52 ml-3'
              : 'w-0'
            : `w-32 ml-2.5`
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-1.5 w-2 h-2 rounded bg-red-500 top-0.5`}
        />
      )}
      {!expanded && (
        <div
          className={`
          absolute left-full rounded-[0.3rem] ml-6 bg-slate-500 text-white text-sm z-50 p-1
          invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </ActiveLink>
  );
}
