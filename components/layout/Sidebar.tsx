import mimiroArrow from '@/public/Arrow-M.svg';
import mimiro from '@/public/logo-white-mimiro.svg';
import {
  Calculator,
  ChevronRight,
  ChevronsLeft,
  ClipboardList,
  LayoutDashboard,
  UserCircle,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

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
      className={`group/sidebar fixed left-0 top-0 z-50 h-full w-full ${
        !isWindowSmall
          ? expanded
            ? `duration-[250ms] max-w-[15rem] transition-all`
            : 'duration-[250ms] max-w-[4.5rem] transition-all'
          : `duration-[250ms] max-w-[15rem] transition-all`
      }`}
    >
      <nav className="relative z-50 flex h-full w-full flex-col border-r bg-[#1A202E] shadow-sm">
        <div className="flex items-center justify-between p-3.5">
          {expanded && (
            <Link
              href="/dashboard"
              onClick={() =>
                isWindowSmall ? setIsOpen(false) : null
              }
              className="px-3"
            >
              {/* <Image
              src={Logo}
              alt="Arkiva Logo"
              className={`overflow-hidden transition-all ${
                !isWindowSmall ? (expanded ? `w-32` : `w-0`) : `w-32`
              } hover:cursor-pointer`}
            /> */}
              <Image
                src={mimiro}
                alt="logo"
                width={110}
                height={100}
              />
              {/* <h1 className="ml-2 flex w-full items-center justify-center gap-2 text-xl font-bold text-white">
                <Square strokeWidth={10} size={18} radius={0} />
                Mimiro
              </h1> */}
            </Link>
          )}

          <button
            className={`flex items-center justify-center rounded-full p-2 text-white transition-all hover:bg-slate-800 ${
              !isWindowSmall && !expanded ? 'w-full' : 'w-fit'
            }`}
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
              <Image
                alt="right-arrow-to-open-sidebar"
                src={mimiroArrow}
                width={19}
                height={18}
                onClick={() => toggleSidebar()}
              />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, isWindowSmall }}>
          <ul
            className="sidebar mb-20 flex flex-col overflow-y-auto px-3 sm:flex-1"
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

            <SidebarItem
              icon={<ClipboardList size={20} strokeWidth={1.5} />}
              text="Notice Board"
              alert
              href="/notices"
            ></SidebarItem>

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
        <div className="absolute bottom-0 left-0 h-max w-full border-t border-slate-600 bg-inherit">
          {!isWindowSmall && status === 'authenticated' ? (
            <div className="flex h-full w-full cursor-pointer p-3 text-gray-50 hover:bg-slate-700">
              <Image
                src={`https://ui-avatars.com/api/?name=${
                  session.user.firstName.charAt(0) +
                  session.user.lastName.charAt(0)
                }&background=c7d2fe&color=3730a3&bold=true`}
                alt=""
                width={100}
                height={100}
                className="mx-auto h-10 w-10 rounded-md "
              />
              <div
                className={`
                  flex items-center justify-between
                  overflow-hidden transition-all ${
                    expanded ? 'ml-3 w-full' : 'w-0'
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
              <Link href={'/login'} className="p-3 text-white">
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
        className={`relative z-50 flex w-full items-center justify-start p-2 ${
          !isWindowSmall ? `my-2` : `my-1.5`
        } group cursor-pointer rounded-[0.6rem] transition-colors 
        ${
          router.pathname.startsWith(href)
            ? 'bg-slate-700 text-white'
            : 'text-white hover:bg-slate-800'
        }`}
      >
        {asDropdown && expanded && (
          <span
            className={`absolute right-2 flex h-full items-center`}
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
            className={`absolute flex w-full justify-end pr-3 
            ${
              !expanded
                ? `left-2 top-1`
                : asDropdown
                ? `-left-6`
                : `left-0`
            }`}
          >
            <div className={`h-2 w-2 rounded-full bg-red-500`} />
          </div>
        )}
        <span
          className={`ml-1 overflow-hidden text-left transition-all ${
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
                          invisible absolute left-full ml-1 flex max-w-xs -translate-x-3 items-center rounded-md bg-slate-500 px-2
                          py-1 text-white opacity-0 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
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
