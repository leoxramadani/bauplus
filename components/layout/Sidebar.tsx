import {
  ChevronsLeft,
  ChevronLast,
  Link as LinkIcon,
  MoreVertical,
  FileText,
  ChevronFirst,
  Square,
  ChevronsRight,
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
  icon: any;
  text: any;
  alert: any;
  href?: any;
}

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isWindowSmall?: boolean;
  setIsWindowSmall: Dispatch<SetStateAction<boolean>>;
  toggleSidebar: () => void;
  expanded: boolean;
}

const SidebarContext = createContext<any>(false);

const Sidebar = ({
  isOpen,
  setIsOpen,
  isWindowSmall,
  setIsWindowSmall,
  toggleSidebar,
  expanded,
}: SidebarProps) => {
  // const collapsSidebar = ()=>{
  //   toggleSidebar();
  // }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${
        expanded ? `max-w-[15rem]` : 'max-w-[4.5rem]'
      }`}
    >
      <nav className="h-full flex flex-col bg-[#1A202E] border-r shadow-sm w-full z-[500]">
        <div className="p-3.5 justify-between items-center flex flex-row">
          <Link
            href="/dashboard"
            onClick={() => (isWindowSmall ? setIsOpen(false) : null)}
          >
            {/* <Image
              src={Logo}
              alt="Arkiva Logo"
              className={`overflow-hidden transition-all ${
                expanded ? `w-32` : `w-0`
              } hover:cursor-pointer`}
            /> */}
            <h1 className="text-white text-3xl font-bold flex gap-2 items-center">
              <Square
                strokeWidth={10}
                size={expanded ? 36 : 0}
                radius={0}
              />
              {expanded && 'Arkiva'}
            </h1>
          </Link>

          <button
            className="rounded-full text-white p-2 hover:bg-gray-100/10 transition-all"
            // onClick={() => setExpanded((current) => !current)}
          >
            {isWindowSmall ? (
              <X
                onClick={() =>
                  setIsOpen && setIsOpen((current) => !current)
                }
              />
            ) : expanded ? (
              <ChevronsLeft
                // onClick={() => setExpanded((current) => !current)}
                onClick={() => toggleSidebar()}
                width={30}
                height={30}
              />
            ) : (
              <ChevronsRight
                width={30}
                height={30}
                // onClick={() => setExpanded((current) => !current)}
                onClick={() => toggleSidebar()}
              />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul
            className="flex flex-col sm:flex-1 px-3"
            onClick={() => (isWindowSmall ? setIsOpen(false) : null)}
          >
            <SidebarItem
              icon={<LayoutDashboard size={20} strokeWidth={1.5} />}
              text="Dashboard"
              alert={true}
              href="/dashboard"
            />
            <SidebarItem
              icon={<UserCircle size={20} strokeWidth={1.5} />}
              text="Users"
              alert={false}
              href="/users"
            />
            <SidebarItem
              icon={<Boxes size={20} strokeWidth={1.5} />}
              text="Companies"
              alert={false}
              href="/companies"
            />
            <SidebarItem
              icon={<Package size={20} strokeWidth={1.5} />}
              text="Activities"
              alert
              href="/activities"
            />
            <SidebarItem
              icon={<FileText size={20} strokeWidth={1.5} />}
              text="Fiscal Invoices"
              alert
              href="/fiscal"
            />

            {!isWindowSmall && (
              <>
                <hr className="my-3 border-slate-600" />
                <SidebarItem
                  icon={<Settings size={20} strokeWidth={1.5} />}
                  text="Settings"
                  alert={false}
                  href="/settings"
                />
              </>
            )}
          </ul>
        </SidebarContext.Provider>

        {!isWindowSmall && (
          <div className="border-t border-slate-600 flex py-3 px-1 text-gray-50">
            <img
              src="https://ui-avatars.com/api/?name=AR&background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md mx-auto"
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
  const { expanded } = useContext<any>(SidebarContext);

  const ActiveLink = withRouter(
    ({ router, children, ...props }: PropsWithChildren<any>) => {
      return (
        <Link
          {...props}
          className={`relative flex items-center w-full px-3 py-1.5 justify-between my-2 rounded-[0.6rem] cursor-pointer transition-colors group 
          ${
            router.pathname.startsWith(props.href)
              ? 'bg-slate-700 text-white'
              : 'hover:bg-slate-800 text-white'
          }`}
        >
          {children}
        </Link>
      );
    }
  );

  return (
    <ActiveLink href={href}>
      <div className='w-max flex items-center'>{icon}</div>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
      {alert && (
        <div className={`absolute flex justify-end w-full left-0 pr-3 ${!expanded && ` top-1`}`}>
          <div className={`w-2 h-2 rounded-full bg-red-500`} />
        </div>
      )}
      {!expanded && (
        <div
          className={`
          absolute max-w-xs w-max left-full rounded-md ml-1 bg-slate-500 text-white z-[500] px-2 py-1 flex items-center
          invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </ActiveLink>
  );
}
