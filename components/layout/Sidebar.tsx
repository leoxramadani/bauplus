import { cn } from '@/lib/utils';
import {
  Calculator,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ClipboardList,
  FileBarChart,
  Home,
  LayoutDashboard,
  Settings,
  SettingsIcon,
  ShoppingBasket,
  UserCircle,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import mimiro from 'public/mimiro-new-9.svg';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Separator } from '../ui/separator';
interface ListItem {
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

interface SidebarItem {
  Icon?: any;
  text: string;
  alert?: boolean;
  href?: string;
  asDropdown?: boolean;
  toggleSidebar?: () => void;
  children?: ReactNode;
  setOffset?: any;
  value?: string;
  list?: any;
}

const SidebarContext = createContext<any>({
  expanded: false,
  isWindowSmall: false,
});

const BookUserIcon = ({ className, size }: any): any => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={'lucide-book-user absolute ' + className}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    <circle cx="12" cy="8" r="2" />
    <path d="M15 13a3 3 0 1 0-6 0" />
  </svg>
);

const Sidebar = ({
  isOpen,
  setIsOpen,
  isWindowSmall,
  setIsWindowSmall,
  toggleSidebar,
  expanded,
}: Sidebar) => {
  const { data: session, status } = useSession();

  const [userPopoverOpen, setUserPopover] = useState(false);

  const [offset, setOffset] = useState<number | null>(null);
  const [list, setList] = useState<any>();
  const [value, setValue] = useState<any>();
  const [activeTrigger, setActiveTrigger] =
    useState<HTMLButtonElement | null>(null);

  return (
    <aside
      className={`group/sidebar fixed left-0 top-0 z-50 h-full w-full ${
        !isWindowSmall
          ? expanded
            ? `duration-[250ms] max-w-[15rem] transition-all`
            : 'duration-[250ms] max-w-[3.5rem] transition-all'
          : `duration-[250ms] max-w-[15rem] transition-all`
      }`}
    >
      <nav className="relative z-50 flex h-full w-full flex-col bg-sidebar shadow-sm">
        <div className="flex items-center justify-between p-3.5">
          {expanded && (
            <Link
              href="/"
              onClick={() =>
                isWindowSmall ? setIsOpen(false) : null
              }
              className=""
            >
              <Image
                src={mimiro}
                alt="logo"
                width={110}
                height={110}
              />
            </Link>
          )}

          <button
            className={`flex items-center justify-center rounded-full p-0.5 text-white transition-all hover:bg-slate-800 ${
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
                size={30}
              />
            ) : (
              <ChevronsRight
                onClick={() => toggleSidebar()}
                strokeWidth={1.5}
                size={30}
              />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, isWindowSmall }}>
          <NavigationMenu
            onValueChange={setValue}
            orientation="vertical"
            className="left-0 mb-20 h-full w-full max-w-full items-start px-2"
            onClick={() => (isWindowSmall ? setIsOpen(false) : null)}
            offset={offset}
          >
            <NavigationMenuList
              ref={setList}
              className="h-full w-full flex-col justify-start gap-1 text-sm"
            >
              <SidebarItem
                Icon={Home}
                text="Main"
                alert={false}
                href="/"
              />
              <SidebarItem
                Icon={LayoutDashboard}
                text="Dashboard"
                alert={false}
                href="/dashboard"
              />
              <SidebarItem
                Icon={FileBarChart}
                text="PNL"
                alert={false}
                href="/pnl"
              />
              <SidebarItem
                Icon={BookUserIcon}
                text="Clients"
                alert={false}
                href="/clients"
              />

              {/* Finance */}
              <SidebarItem
                Icon={Calculator}
                text="Finance"
                href="/finance"
                asDropdown
                setOffset={setOffset}
                value={value}
                list={list}
              >
                {
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
                }
              </SidebarItem>
              {/* HR */}
              <SidebarItem
                Icon={Users}
                text="HR"
                href="/hr"
                asDropdown
                setOffset={setOffset}
                value={value}
                list={list}
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
              {/* Payroll */}

              <SidebarItem
                Icon={Wallet}
                text="Payroll"
                alert
                href="/payroll"
                asDropdown
                setOffset={setOffset}
                value={value}
                list={list}
              >
                <>
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
                </>
              </SidebarItem>

              {/* Users */}
              <SidebarItem
                Icon={UserCircle}
                text="Users"
                alert={false}
                href="/users"
              />
              {/* Products */}
              <SidebarItem
                Icon={ShoppingBasket}
                text="Products"
                alert={false}
                href="/products"
              />

              <SidebarItem
                Icon={ClipboardList}
                text="Notice Board"
                alert
                href="/notices"
              ></SidebarItem>

              <SidebarItem
                Icon={SettingsIcon}
                text="Settings"
                alert={false}
                href="/settings"
              />
            </NavigationMenuList>
          </NavigationMenu>
        </SidebarContext.Provider>
        <div className="absolute bottom-0 left-0 h-max w-full border-t border-slate-700 bg-inherit ">
          {!isWindowSmall && status === 'authenticated' ? (
            <Popover
              open={userPopoverOpen}
              onOpenChange={setUserPopover}
            >
              <PopoverTrigger asChild>
                <div className="flex h-full w-full cursor-pointer p-3 text-gray-50 transition-all hover:bg-slate-800">
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
                  >
                    <div className="leading-4 ">
                      <h4 className="font-semibold ">
                        {session.user.firstName}{' '}
                        {session.user.lastName}
                      </h4>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent asChild side="top">
                <div className="relative w-[200px] rounded-xl border-slate-700 !bg-[#141e29] px-0 py-2 text-sm leading-loose text-slate-300">
                  <span className="px-4">{session?.user.email}</span>
                  <Separator className="mx-auto my-2 w-[calc(100%-32px)] bg-slate-700" />
                  <ul className="my-2 flex flex-col bg-[#141e29]">
                    <li>
                      <Link
                        href={'/account'}
                        onClick={() => setUserPopover(false)}
                        className="flex w-full items-center justify-between px-4 py-1 transition-[color] hover:bg-slate-800 hover:text-white"
                      >
                        Settings
                        <Settings size={18} />
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setUserPopover(!userPopoverOpen);
                          signOut();
                        }}
                        className="block w-full px-4 py-1 text-left transition-[color] hover:bg-slate-800 hover:text-white"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center">
              <Link
                href={'/login'}
                className="m-3 flex w-full items-center gap-1 rounded-lg px-2 py-2 text-white transition-all hover:bg-slate-800"
              >
                Login
              </Link>
            </div>
          )}{' '}
        </div>
      </nav>
    </aside>
  );
};

function SidebarItem({
  Icon,
  text,
  alert,
  href = '#',
  children,
  setOffset,
  value,
  list,
  asDropdown = false,
}: SidebarItem) {
  const { route } = useRouter();
  const { expanded, isWindowSmall } = useContext<any>(SidebarContext);
  const onNodeUpdate = (
    trigger: HTMLButtonElement | null,
    itemValue: string
  ) => {
    if (trigger && list && value === itemValue) {
      const triggerRect = trigger.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();

      setOffset(Math.round(triggerRect.top - listRect.top));
    } else if (value === '') {
      setOffset(null);
    }
    return trigger;
  };

  const isInCurrentPath = () => {
    const routeParts = route.split('/');

    for (let i = 0; i < routeParts.length; i++) {
      console.log(routeParts.slice(0, i + 1).join('/'), href);
      if (routeParts.slice(0, i + 1).join('/') === href) {
        return true;
      }
    }

    return false;
  };

  return (
    <NavigationMenuItem
      className={`focus relative w-full focus:outline-none`}
      key={text}
      value={text}
    >
      {asDropdown ? (
        <>
          <NavigationMenuTrigger
            key={text}
            ref={(node) => onNodeUpdate(node, text)}
            className={` group/trigger outline-transparent ${
              isInCurrentPath() && 'flex text-white'
            }`}
          >
            {Icon && (
              <Icon
                size={20}
                strokeWidth={1.5}
                className="absolute left-2"
              />
            )}
            <span
              className={`group-hover/trigger ml-7 w-full text-left ${
                !expanded && 'invisible'
              }`}
            >
              {text}
            </span>
            <ChevronDown
              size={18}
              className={`absolute right-3 top-[1px] ml-1 h-full w-4 rotate-0 self-center duration-200 group-data-[state=open]:-rotate-90 ${
                !expanded && 'hidden'
              }`}
              aria-hidden="true"
            />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-max min-w-[300px] list-none bg-sidebar p-4">
            {children}
          </NavigationMenuContent>
        </>
      ) : (
        <Link href={href} legacyBehavior passHref>
          <NavigationMenuLink
            className={
              'outline-transparent focus:ring-0 ' +
              cn(
                navigationMenuTriggerStyle(),
                `group/trigger ${
                  isInCurrentPath() &&
                  'group/trigger pointer-events-none text-white'
                }`
              )
            }
          >
            {Icon && (
              <Icon
                size={20}
                strokeWidth={1.5}
                className="absolute left-2"
              />
            )}
            <span
              className={`w-full text-left ${
                Icon && 'ml-7'
              } group-hover/trigger ${
                Icon && !expanded && 'invisible'
              }`}
            >
              {text}
            </span>
          </NavigationMenuLink>
        </Link>
      )}
    </NavigationMenuItem>
  );
}

export default Sidebar;
