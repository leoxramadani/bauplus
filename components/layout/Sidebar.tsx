import {
  ChevronsLeft,
  ChevronLast,
  Link as LinkIcon,
  MoreVertical,
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
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  isWindowSmall?: boolean;
  setIsWindowSmall?: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<any>(false);

const Sidebar = ({
  isOpen,
  setIsOpen,
  isWindowSmall,
  setIsWindowSmall
}: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${
        expanded ? `w-full max-w-[15rem]` : `w-[72px]`
      }`}
      
    >
      <nav className="h-full flex flex-col bg-[#1A202E] border-r shadow-sm w-full" >
        <div className="p-4 pb-2 justify-between items-center flex flex-row">
          <Link href='/dashboard' onClick={()=> setIsOpen && isWindowSmall ? setIsOpen(false): null}>
            <Image
              src={Logo}
              alt="Arkiva Logo"
              className={`overflow-hidden transition-all ${
                expanded ? `w-32` : `w-0`
              } hover:cursor-pointer`}
            />
          </Link>

          <button
            className="p-1.5 rounded-full hover:bg-gray-100/20"
            // onClick={() => setExpanded((current) => !current)}
          >
            {isWindowSmall ? (
              <X onClick={() => setIsOpen && setIsOpen((current) => !current)} />
            ) : expanded ? (
              <ChevronsLeft
                strokeWidth={2}
                color='white'
                onClick={() => setExpanded((current) => !current)}
              />
            ) : (
              <ChevronLast
                color='white'
                onClick={() => setExpanded((current) => !current)}
              />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }} >
          <ul className="flex flex-col sm:flex-1 px-3" onClick={()=> setIsOpen && isWindowSmall ? setIsOpen(false): null}>
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

            {
              !isWindowSmall &&
              <>
                <hr className="my-3" />
                <SidebarItem
                  icon={<Settings size={30} />}
                  text="Settings"
                  alert={false}
                  href="/settings"
                 />
              </>
            }

          </ul>
        </SidebarContext.Provider>

        {!isWindowSmall && (
          <div className="border-t flex py-3 px-1 text-gray-50">
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
                <span className="text-xs">
                  ardrin.rexhepi@thorindustriesmk.com
                </span>
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
          className={`relative flex items-center p-1 my-2 font-medium rounded-[0.6rem] cursor-pointer transition-colors group 
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
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-red-500 ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`
          absolute left-full rounded-[0.3rem] ml-6 bg-slate-500 text-white text-sm z-50
          invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </ActiveLink>
  );
}
