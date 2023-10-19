import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
interface NavbarProps {
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isWindowSmall?: boolean;
  setIsWindowSmall: Dispatch<SetStateAction<boolean>>;
}

const Dropdown = ({
  children,
  content,
}: PropsWithChildren<{ content: ReactNode }>) => {
  const [isDropdownOpen, setIsDropdownOpen] =
    useState<boolean>(false);

  return (
    <div
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className={`relative cursor-pointer items-center rounded-xl border bg-slate-800 px-2 py-1 align-middle text-white`}
    >
      {children}
      {isDropdownOpen && content}
    </div>
  );
};

const Navbar = ({
  isOpen,
  setIsOpen,
  isWindowSmall,
  setIsWindowSmall,
}: NavbarProps) => {
  return (
    <nav
      className={`flex flex-row justify-between bg-[#1A202E] p-2 py-2.5`}
    >
      <button
        className="flex flex-col gap-1.5 rounded-[0.35rem] border bg-white px-[18px] py-4"
        onClick={() => setIsOpen(true)}
      >
        <div className="mx-0 h-[0.15rem] w-9 bg-black py-[0.12rem]"></div>
        <div className="mx-0 h-[0.15rem] w-9 bg-black py-[0.12rem]"></div>
        <div className="mx-0 h-[0.15rem] w-9 bg-black py-[0.12rem]"></div>
      </button>

      <Dropdown
        content={
          <div className="absolute right-0 mt-3.5 rounded-[0.5rem] border bg-slate-800 p-0.5 font-medium text-white">
            <div className="flex flex-col">
              <Link
                href="/settings"
                className="flex gap-1.5 rounded-lg px-4 py-3 no-underline hover:bg-slate-500"
              >
                <Settings width={20} />
                <span className="">Settings</span>
              </Link>
              <button className="flex gap-1.5 rounded-lg px-4 py-3 no-underline hover:bg-slate-500">
                <LogOut width={20} />
                <span className="">Sign out</span>
              </button>
            </div>
          </div>
        }
      >
        <div className="mt-0.5 flex flex-row items-center justify-center gap-1 py-[0.435rem] align-middle text-sm leading-none text-white">
          <User width={20} />
          <p className="mt-0.5 leading-none">ArdrinRexhepi</p>
        </div>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
