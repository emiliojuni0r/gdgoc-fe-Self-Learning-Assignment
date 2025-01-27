"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";

const sampleNotes = [
  {
    id: 1,
    title: "Note title #1",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags: ["tag 1", "tag 2"],
  },
  {
    id: 2,
    title: "Note title #2",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["tag 3"],
  },
];

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="w-screen h-screen flex flex-col relative">
      {/* Sidebar */}
      {/* <div
        className={`fixed top-0 left-0 h-full text-black bg-gray-100 shadow-md transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-50`}
      >
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Note-keren</h1>
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
      </div> */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        pathname={pathname}
      />
      {/* end of sidebar */}

      {/* Main Content */}
      <div className="flex flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          {/* Searchbar */}
          <form action="" className="w-fit h-fit relative flex-1 px-4 group">
            <input
              type="text"
              className="lg:w-full h-8 rounded-xl pl-8 bg-gray-100 border"
              placeholder="Search your note here"
            />
            <Image
              src={"/search-icon.svg"}
              width={0}
              height={0}
              className="w-6 h-6 lg:w-[24px] lg:h-[24px] absolute left-5 top-1.5 group-hover:rotate-12 group-hover:-translate-y-1 transition"
              alt="Search Icon"
            />
          </form>

          {/* Sorting */}
          <select
            className="border p-1 lg:p-1 rounded-md w-20 lg:w-48 h-8 items-center text-xs lg:text-base justify-center"
            onChange={(e) => console.log("Sorting by:", e.target.value)}
          >
            <option value="">sort by</option>
            <option value="latest">Latest</option>
            <option value="oldest">Earliest</option>
            <option value="alphabetical">Alphabet Ascending</option>
            <option value="alphabeticalDescending">Alphabet Descending</option>
          </select>
        </Header>

        {/* button untuk tambah note */}
        <Link
          // onClick={() => setIsModalOpen(true)}
          href="/create-note"
          className="absolute bottom-5 right-2.5 lg:bottom-10 lg:right-5 rounded-full w-16 h-16 lg:w-20 lg:h-20 bg-gray-400 hover:bg-gray-500 flex justify-center items-center group"
        >
          <Image
            src={"/plus-icon.svg"}
            width={0}
            height={0}
            className="w-6 h-6 lg:w-11 lg:h-11 group-hover:rotate-[90deg] transition"
            alt="Search Icon"
          />
        </Link>
        {/* end of button untuk tambah note */}

        {/* Notes Container */}
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-5 items-start p-10">
          {sampleNotes.map((note) => (
            <div
              key={note.id}
              className="w-[300px] h-[280px] lg:w-[400px] lg:min-h-[300px] flex flex-col p-2 rounded-lg hover:shadow-lg shadow-md transition-all bg-slate-100"
            >
              <div className="w-full h-fit flex flex-row">
                <h1 className="text-base lg:text-xl font-bold truncate">
                  {note.title}
                </h1>
                <div className="flex flex-row ml-auto gap-x-2">
                  <Link href={`/edit-note/${note.id}`}>
                    <Image
                      src={"/edit-icon.svg"}
                      width={0}
                      height={0}
                      className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:rotate-12 transition"
                      alt="edit Icon"
                    />
                  </Link>
                  <Image
                    src={"/delete-icon.svg"}
                    width={0}
                    height={0}
                    className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:rotate-12 transition"
                    alt="delete Icon"
                  />
                </div>
              </div>
              <div className="w-full h-full mt-1 lg:mt-2">{note.content}</div>
              <div className="flex gap-2 flex-wrap mt-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs lg:text-sm font-thin">3d ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
