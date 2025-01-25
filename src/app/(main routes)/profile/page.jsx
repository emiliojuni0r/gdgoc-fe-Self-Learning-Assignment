"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="w-screen h-screen flex flex-row relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full text-black bg-gray-100 shadow-md transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-50`}
      >
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Note-keren</h1>
            {/* Toggle Sidebar */}
            <div
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-8 h-7 lg:w-10 lg:h-8 bg-gray-400 hover:bg-gray-500 flex flex-col justify-center items-center gap-y-1 lg:gap-y-1 rounded-md group"
            >
              <div className="w-10/12 lg:h-1 h-0.5 bg-white rounded-3xl group-hover:rotate-[50deg] group-hover:w-2/4 group-hover:-translate-x- group-hover:translate-y-1 transition-all"></div>
              <div className="w-10/12 lg:h-1 h-0.5 bg-white rounded-3xl group-hover:hidden"></div>
              <div className="w-10/12 lg:h-1 h-0.5 bg-white rounded-3xl group-hover:rotate-[-50deg] group-hover:w-1/2 group-hover:translate-x- group-hover:-translate-y-1 transition-all"></div>
            </div>
          </div>
          <ul>
            <Link href={"/dashboard"}>
              <li
                className={`${
                  pathname === "/dashboard"
                    ? "text-gray-600 bg-gray-300"
                    : "text-black hover:bg-gray-200"
                } py-2 px-4 rounded-md`}
              >
                Dashboard
              </li>
            </Link>
            <Link href={"/profile"}>
              <li
                className={`${
                  pathname === "/profile"
                    ? "text-gray-600 bg-gray-300"
                    : "text-black hover:bg-gray-200"
                } py-2 px-4 rounded-md`}
              >
                Profile
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* end of sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
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
        </div>
      </div>
    </div>
  );
}
