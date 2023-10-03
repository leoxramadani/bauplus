import Link from 'next/link';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { SetStateAction, Dispatch } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
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
      className={`relative rounded-xl px-2 border py-1 cursor-pointer bg-slate-800 text-white items-center align-middle`}
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
      className={`bg-[#1A202E] p-2 py-2.5 flex flex-row justify-between`}
    >
      <button
        className="flex flex-col border py-4 px-[18px] bg-white rounded-[0.35rem] gap-1.5"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-9 h-[0.15rem] py-[0.12rem] bg-black mx-0"></div>
        <div className="w-9 h-[0.15rem] py-[0.12rem] bg-black mx-0"></div>
        <div className="w-9 h-[0.15rem] py-[0.12rem] bg-black mx-0"></div>
      </button>

      <Dropdown
        content={
          <div className="absolute right-0 border p-0.5 rounded-[0.5rem] mt-3.5 bg-slate-800 text-white font-medium">
            <div className="flex flex-col">
              <Link
                href="/settings"
                className="hover:bg-slate-500 px-4 py-3 no-underline rounded-lg flex gap-1.5"
              >
                <Settings width={20} />
                <span className="">Settings</span>
              </Link>
              <button className="hover:bg-slate-500 px-4 py-3 no-underline rounded-lg flex gap-1.5">
                <LogOut width={20} />
                <span className="">Sign out</span>
              </button>
            </div>
          </div>
        }
      >
        <div className="flex flex-row gap-1 items-center py-[0.435rem] mt-0.5 text-sm justify-center align-middle leading-none text-white">
          <User width={20} />
          <p className="leading-none mt-0.5">ArdrinRexhepi</p>
        </div>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
