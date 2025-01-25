"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [title, setTitle] = useState(""); // State untuk title
  const [content, setContent] = useState("");
  const pathname = usePathname();

  const handleSaveNote = () => {
    console.log("Title:", title);
    console.log("Content:", content);

    // Reset form dan tutup modal
    setTitle("");
    setContent("");
    setIsModalOpen(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col relative">
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
      <div className="flex flex-col">
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

          {/* Searchbar */}
          <form action="" className="w-fit h-fit relative flex-1 px-4">
            <input
              type="text"
              className="lg:w-full h-8 rounded-xl pl-8 bg-gray-100 border"
              placeholder="Search your note here"
            />
            <Image
              src={"/search-icon.svg"}
              width={0}
              height={0}
              className="w-6 h-6 lg:w-[24px] lg:h-[24px] absolute left-5 top-1.5"
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
        </div>

        {/* Notes Container */}
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-5 items-start p-10">
          {/* Note Examples */}
          <div className="w-[300px] h-[200px] lg:w-[400px] lg:h-[300px] flex flex-col p-2 rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all bg-slate-200">
            {/* title note */}
            <div className="w-full h-fit bg-red-200">
              {/* note title */}
              <h1 className="text-base lg:text-xl">Note title #1</h1>
              <div>
                {/* icons */}
              </div>
            </div>
            {/* note content */}
            <div className="w-full h-full bg-red-300 mt-1 lg:mt-2">
              note contenttt
            </div>
          </div>
        </div>
      </div>
      {/* button untuk tambah note */}
      <div onClick={() => setIsModalOpen(true)} className="absolute bottom-5 right-2.5 lg:bottom-10 lg:right-5 rounded-full w-16 h-16 lg:w-20 lg:h-20 bg-gray-400 hover:bg-gray-500 flex justify-center items-center group">
        <Image
          src={"/plus-icon.svg"}
          width={0}
          height={0}
          className="w-6 h-6 lg:w-11 lg:h-11 group-hover:rotate-[90deg] transition"
          alt="Search Icon"
        />
      </div>
      {/* end of button untuk tambah note */}


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Note</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full h-32 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>



  );
}
