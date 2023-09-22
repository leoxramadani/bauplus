import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';
import { useContext, createContext, useState } from "react"


interface SidebarItemInterface { icon:any, text:any, active:any, alert:any }

const SidebarContext = createContext<any>(false);

const Sidebar = ({children}:any) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className='h-screen'>
      <nav className='h-full flex flex-col bg-[#1A202E] border-r shadow-sm'>
        {/* Ktu mujm ne mbyllje me e shfaq nje logo me te vogel */}
        <div className='p-4 pb-2 justify-between items-center flex flex-row'>
          <img src="https://img.logoipsum.com/243.svg" alt="assa" className={`overflow-hidden transition-all ${expanded?`w-32`:`w-0`} hover:cursor-pointer`} />

          <button className='p-1.5 rounded-full  bg-gray-50 hover:bg-gray-100' onClick={()=>setExpanded(current=>!current)}>
            {expanded ?<ChevronFirst/>:<ChevronLast/>}
          </button>
        </div>

        <SidebarContext.Provider value={{expanded}}>
        <ul className='flex-1 px-3'>
          {children}
        </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 text-gray-50">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-56 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold ">Ardrin Rexhepi</h4>
              <span className="text-xs ">ardrin.rexhepi@thorindustriesmk.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
      
    </aside>
  )
}
export default Sidebar

export function SidebarItem({ icon, text, active, alert }:SidebarItemInterface) {
  const { expanded } = useContext<any>(SidebarContext)
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-2
        font-medium rounded-[0.6rem] cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-blue-400 to-blue-300 text-[#1A202E]"
            : "hover:bg-blue-200 text-white hover:text-[#1A202E]"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-red-500 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6 
          bg-indigo-100 text-white text-sm z-50
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}