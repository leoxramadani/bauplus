import React from 'react';

const Navbar = () => {
  return (
    <nav
      className={`bg-[#1A202E] `}
    >
      <button className="flex flex-col border py-[0.85rem] px-3 sm:px-5 bg-white rounded-[0.35rem] gap-1.5">
        <div className="w-7 h-[0.135rem] bg-black mx-0"></div>
        <div className="w-7 h-[0.135rem] bg-black mx-0"></div>
        <div className="w-7 h-[0.135rem] bg-black mx-0"></div>
      </button>
    </nav>
  );
};

export default Navbar;
