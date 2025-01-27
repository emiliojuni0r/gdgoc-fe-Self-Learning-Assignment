"use client";

import Image from "next/image";

export default function Header({children, setIsSidebarOpen,isSidebarOpen}) {
    return(
        
        <div className="w-full h-14 lg:h-16 bg-gray-300 flex flex-row justify-between items-center px-4 shadow-sm">
          {/* Toggle Sidebar */}
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-8 h-7 lg:w-10 lg:h-8 bg-gray-400 hover:bg-gray-500 flex flex-col justify-center items-center gap-y-1 lg:gap-y-1 rounded-md group"
          >
            <div className="w-10/12 lg:h-1 h-0.5 bg-white rounded-3xl group-hover:rotate-[-20deg] group-hover:w-1/2 group-hover:-translate-x-2 group-hover:translate-y-1 transition-all"></div>
            <div className="w-10/12 lg:h-1 h-0.5 bg-white rounded-3xl"></div>
            <div className="w-10/12 lg:h-1 h-0.5 bg-white rounded-3xl group-hover:rotate-[20deg] group-hover:w-1/2 group-hover:-translate-x-2 group-hover:-translate-y-1 transition-all"></div>
          </div>

          {children}

        </div>
    )
}