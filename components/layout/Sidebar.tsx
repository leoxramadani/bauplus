import {
  Users,
  Square,
  ChevronsLeft,
  ChevronsRight,
  Calculator,
  Wallet,
  ChevronUp,
  ChevronRight,
} from 'lucide-react';
import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
  useEffect,
  ReactNode,
  Children,
} from 'react';
import {
  Boxes,
  Package,
  UserCircle,
  LayoutDashboard,
  Settings,
  X,
} from 'lucide-react';
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
import Logo from '@/public/logo-arkiva.svg';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface SidebarItem {
  icon?: React.JSX.Element;
  text?: string;
  alert?: boolean;
  href?: string;
  asDropdown?: boolean;
  toggleSidebar?: () => void;
  children?: ReactNode;
}

interface Sidebar {
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
}: Sidebar) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <aside
      className={`fixed z-50 w-full top-0 left-0 h-full group/sidebar ${
        !isWindowSmall
          ? expanded
            ? `max-w-[15rem] transition-all duration-[250ms]`
            : 'max-w-[4.5rem] transition-all duration-[250ms]'
          : `max-w-[15rem] transition-all duration-[250ms]`
      }`}
    >
      <nav className="relative h-full flex flex-col bg-[#1A202E] border-r shadow-sm w-full z-50">
        <div className="p-3.5 justify-between items-center flex">
          {expanded && (
            <Link
              href="/dashboard"
              onClick={() =>
                isWindowSmall ? setIsOpen(false) : null
              }
            >
              {/* <Image
              src={Logo}
              alt="Arkiva Logo"
              className={`overflow-hidden transition-all ${
                !isWindowSmall ? (expanded ? `w-32` : `w-0`) : `w-32`
              } hover:cursor-pointer`}
            /> */}
              <h1 className="text-white text-xl font-bold flex gap-2 items-center w-full justify-center ml-2">
                <Square strokeWidth={10} size={18} radius={0} />
                Arkiva
              </h1>
            </Link>
          )}

          <button
            className="flex justify-center items-center rounded-full text-white hover:bg-slate-600 p-1 transition-all opacity-0 group-hover/sidebar:opacity-100"
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
                onClick={() => toggleSidebar()}
                strokeWidth={1.5}
                width={30}
                height={30}
              />
            ) : (
              <ChevronsRight
                strokeWidth={1.5}
                width={30}
                height={30}
                onClick={() => toggleSidebar()}
              />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, isWindowSmall }}>
          <ul
            className="sidebar flex flex-col sm:flex-1 px-3 overflow-y-auto mb-20"
            onClick={() => (isWindowSmall ? setIsOpen(false) : null)}
          >
            <SidebarItem
              icon={<LayoutDashboard size={20} strokeWidth={1.5} />}
              text="Dashboard"
              alert={true}
              href="/dashboard"
            />
            {/* <SidebarItem
              icon={<UserCircle size={20} strokeWidth={1.5} />}
              text="Employees"
              href="/employees"
            /> */}
            <SidebarItem
              icon={<Calculator size={20} strokeWidth={1.5} />}
              text="Finance"
              asDropdown
              toggleSidebar={toggleSidebar}
            >
              <>
                <SidebarItem
                  text="Bank accounts"
                  alert={false}
                  href="/finance/bankaccounts"
                />
                <SidebarItem
                  text="Credit note"
                  alert={false}
                  href="/finance/creditnote"
                />
                <SidebarItem
                  text="Estimates"
                  alert={false}
                  href="/finance/estimates"
                />
                <SidebarItem
                  text="Expenses"
                  alert={false}
                  href="/finance/expenses"
                />
                <SidebarItem
                  text="Invoice"
                  alert={false}
                  href="/finance/invoice"
                />
                <SidebarItem
                  text="Payments"
                  alert={false}
                  href="/finance/payments"
                />
                <SidebarItem
                  text="Proposal"
                  alert={false}
                  href="/finance/proposal"
                />
              </>
            </SidebarItem>
            <SidebarItem
              icon={<Users size={20} strokeWidth={1.5} />}
              text="HR"
              asDropdown
              toggleSidebar={toggleSidebar}
            >
              <>
                <SidebarItem
                  text="Employees"
                  alert={false}
                  href="/hr/employees"
                />
                <SidebarItem
                  text="Leaves"
                  alert={false}
                  href="/hr/leaves"
                />
                <SidebarItem
                  text="Shift Roster"
                  alert={false}
                  href="/hr/shiftroster"
                />
                <SidebarItem
                  text="Attendace"
                  alert={false}
                  href="/hr/attendace"
                />
                <SidebarItem
                  text="Holiday"
                  alert={false}
                  href="/hr/holiday"
                />
                <SidebarItem
                  text="Designation"
                  alert={false}
                  href="/hr/designation"
                />
                <SidebarItem
                  text="Departments"
                  alert={false}
                  href="/hr/departments"
                />
                <SidebarItem
                  text="Appreciation"
                  alert={false}
                  href="/hr/appreciation"
                />
              </>
            </SidebarItem>
            <SidebarItem
              icon={<Wallet size={20} strokeWidth={1.5} />}
              text="Payroll"
              alert
              asDropdown
            >
              <SidebarItem
                text="Payroll"
                alert={false}
                href="/payroll"
              />
              <SidebarItem
                text="Employee salary"
                alert={false}
                href="/payroll/employee-salary"
              />
            </SidebarItem>
            <SidebarItem
              icon={<UserCircle size={20} strokeWidth={1.5} />}
              text="Users"
              alert={false}
              href="/users"
            />

            {/* {!isWindowSmall && (
              <>
                <hr className="my-3 border-slate-600" />
                <SidebarItem
                  icon={<Settings size={20} strokeWidth={1.5} />}
                  text="Settings"
                  alert={false}
                  href="/settings"
                />
              </>
            )} */}
          </ul>
        </SidebarContext.Provider>
        <div className="border-t border-slate-600 absolute bottom-0 left-0 w-full h-max bg-inherit">
          {!isWindowSmall && status === 'authenticated' ? (
            <div className="hover:bg-slate-700 w-full h-full flex p-3 text-gray-50 cursor-pointer">
              <Image
                src={`https://ui-avatars.com/api/?name=${
                  session.user.firstName.charAt(0) +
                  session.user.lastName.charAt(0)
                }&background=c7d2fe&color=3730a3&bold=true`}
                alt=""
                width={100}
                height={100}
                className="w-10 h-10 rounded-md mx-auto "
              />
              <div
                className={`
                  flex justify-between items-center
                  overflow-hidden transition-all ${
                    expanded ? 'w-full ml-3' : 'w-0'
                  }
                `}
                onClick={() => router.push('/account')}
              >
                <div className="leading-4 ">
                  <h4 className="font-semibold ">
                    {session.user.firstName} {session.user.lastName}
                  </h4>
                  <span className="text-xs">
                    {session?.user.email}
                  </span>
                </div>
                {/* <MoreVertical size={20} /> */}
              </div>
            </div>
          ) : (
            <>
              <Link href={'/login'} className="p-3">
                Login
              </Link>
            </>
          )}{' '}
        </div>
      </nav>
    </aside>
  );
};
export default Sidebar;

export function SidebarItem({
  icon,
  text,
  alert,
  href = '#',
  children,
  toggleSidebar = () => {},
  asDropdown = false,
}: SidebarItem) {
  const router = useRouter();
  const { expanded, isWindowSmall } = useContext<any>(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (asDropdown) {
      setIsOpen(!isOpen);
      if (expanded == false) toggleSidebar();
    } else router.push(href);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`relative z-50 w-full flex items-center p-2 justify-start ${
          !isWindowSmall ? `my-2` : `my-1.5`
        } rounded-[0.6rem] cursor-pointer transition-colors group 
        ${
          router.pathname.startsWith(href)
            ? 'bg-slate-700 text-white'
            : 'hover:bg-slate-800 text-white'
        }`}
      >
        {asDropdown && expanded && (
          <span
            className={`absolute right-2 h-full flex items-center`}
          >
            <ChevronRight
              size={20}
              strokeWidth={2}
              className={`transition-all ${isOpen && '-rotate-90'}`}
            />
          </span>
        )}
        {icon && <div className="ml-1 w-[20px]">{icon}</div>}
        {alert && (
          <div
            className={`absolute flex justify-end w-full pr-3 
            ${
              !expanded
                ? `top-1 left-2`
                : asDropdown
                ? `-left-6`
                : `left-0`
            }`}
          >
            <div className={`w-2 h-2 rounded-full bg-red-500`} />
          </div>
        )}
        <span
          className={`overflow-hidden ml-1 text-left transition-all ${
            icon && `ml-3`
          } ${
            !isWindowSmall ? (expanded ? 'w-full' : 'w-0') : `w-full`
          }`}
        >
          {text}
        </span>

        {!expanded && (
          <div
            className={`
                          absolute max-w-xs left-full rounded-md ml-1 bg-slate-500 text-white px-2 py-1 flex items-center
                          invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                      `}
          >
            {text}
          </div>
        )}
      </button>
      {asDropdown && isOpen && (
        <div className="flex gap-2 pl-[20px]">
          <div className="h-full w-[3px]  rounded-full"></div>
          <div className="w-full">{children}</div>
        </div>
      )}
    </>
  );
}
