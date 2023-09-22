import Link from 'next/link';
import React, {useState, Key} from 'react'


const Sidebar = () => {
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
      };

      const links = [ 
        {href: '/dashboad', label: 'Dashboard', icon: 'icon'},
        {href: '/dashboad', label: 'Inflow', icon: 'icon'},
        {href: '/dashboad', label: 'Outflow', icon: 'icon'},
        {href: '/dashboad', label: 'Companies', icon: 'icon'},
        {href: '/dashboad', label: 'Archive', icon: 'icon'},
        {href: '/dashboad', label: 'Reports', icon: 'icon'},
      ]
  return (
    <>
        <button onClick={toggleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 max-w-[230px] w-full h-screen transition-transform ${
          openSidebar ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
         aria-label="Sidebar">
   <div className="h-full overflow-y-auto  bg-[#1A202E]">
      <Link href="https://flowbite.com/" className="flex items-center justify-center w-full h-max py-4">
         
         <span className="px-2 text-xl text-white font-semibold whitespace-nowrap">Arkiva</span>
      </Link>
      <ul className="flex flex-col w-full border-t border-gray-700">
        {
            links.map((link, i:Key) => (
                <li className='flex flex-row gap-2 items-center w-full' key={i}>
                    <Link href={link.href} className="w-full flex flex-row gap-2 items-center px-3 py-2 text-white  hover:bg-gray-700 group">
               <span className="">{link.label}</span>
            </Link>
                </li>
            ))
        }
      </ul>
      

   
   </div>
</aside>

{openSidebar && (
        <div
          className="fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-20"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
}

export default Sidebar