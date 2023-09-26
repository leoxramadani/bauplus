import Link from 'next/link';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { SetStateAction, Dispatch } from 'react';
import { User } from 'lucide-react';
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
      className={`relative rounded-xl px-3 border py-1 cursor-pointer bg-slate-800 text-white`}
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
    <nav className={`bg-[#1A202E] p-2 flex flex-row justify-between`}>
      <button
        className="flex flex-col border p-4 sm:px-5 bg-white rounded-[0.35rem] gap-1.5 "
        onClick={() => setIsOpen(true)}
      >
        <div className="w-8 h-[0.135rem] py-[0.1rem] bg-black mx-0"></div>
        <div className="w-8 h-[0.135rem] py-[0.1rem] bg-black mx-0"></div>
        <div className="w-8 h-[0.135rem] py-[0.1rem] bg-black mx-0"></div>
      </button>

      <Dropdown
        content={
          <div className="absolute right-0 border p-2 rounded-[0.5rem] mt-2.5 bg-slate-800 text-white font-medium">
            <div className="flex flex-col">
              <Link
                href="/settings"
                className="hover:bg-slate-500 px-4 py-3 no-underline rounded-lg flex gap-3"
              >
                <div className="flex flex-col justify-end">
                  <i className="fi fi-rr-settings-sliders text-sm"></i>
                </div>
                <div className="flex flex-col justify-center">
                  Settings
                </div>
              </Link>
              <button className="hover:bg-slate-500 px-4 py-3 no-underline rounded-lg flex gap-3 ">
                <div className="flex flex-col justify-end">
                  <i className="fi fi-rr-exit text-sm"></i>
                </div>
                <div className=" whitespace-nowrap">Sign out</div>
              </button>
            </div>
          </div>
        }
      >
        <div className="flex flex-row gap-1.5 items-center py-[0.435rem] text-sm justify-center align-middle leading-none text-white">
          <User width={20} />
          <p className="leading-none">ArdrinRexhepi</p>
        </div>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
