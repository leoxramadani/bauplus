import {
  ChevronFirst,
  ChevronLast,
  Link as LinkIcon,
  MoreVertical,
} from 'lucide-react';
import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
} from 'react';
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
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

const SidebarContext = createContext<any>(false);

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-[#1A202E] border-r shadow-sm">
        {/* Ktu mujm ne mbyllje me e shfaq nje logo me te vogel */}
        <div className="p-4 pb-2 justify-between items-center flex flex-row">
          <Image
            src={Logo}
            alt="Arkiva Logo"
            className={`overflow-hidden transition-all ${
              expanded ? `w-32` : `w-0`
            } hover:cursor-pointer`}
          />

          <button
            className="p-1.5 rounded-full  bg-gray-50 hover:bg-gray-100"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              alert={true}
              href="/dashboard"
            />
            <SidebarItem
              icon={<UserCircle size={20} />}
              text="Users"
              alert={false}
              href="/users"
            />
            <SidebarItem
              icon={<Boxes size={20} />}
              text="Companies"
              alert={false}
              href="/companies"
            />
            <SidebarItem
              icon={<Package size={20} />}
              text="Activities"
              alert
              href="/activities"
            />

            <hr className="my-3" />
            {/* Ktu mujtmu me e vendos logon e kompanis */}
            <SidebarItem
              icon={<Settings size={20} />}
              text="Settings"
              alert={false}
              href="/settings"
            />
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 text-gray-50">
          <img
            src="https://ui-avatars.com/api/?name=AR&background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                expanded ? 'w-56 ml-3' : 'w-0'
              }
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold ">Ardrin Rexhepi</h4>
              <span className="text-xs">
                ardrin.rexhepi@thorindustriesmk.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
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
  href,
}: SidebarItemInterface) {
  const { expanded } = useContext<any>(SidebarContext);

  const ActiveLink = withRouter(
    ({ router, children, ...props }: PropsWithChildren<any>) => {
      return (
        <Link
          {...props}
          className={`relative flex items-center py-2 px-3 my-2 font-medium rounded-[0.6rem] cursor-pointer transition-colors group
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
          absolute left-full rounded-[0.3rem] px-2 py-1 ml-6 bg-slate-500 text-white text-sm z-50
          invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </ActiveLink>
  );
}
