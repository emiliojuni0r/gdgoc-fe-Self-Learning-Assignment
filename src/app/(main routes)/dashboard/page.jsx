"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]); // State untuk tags
  const [currentTag, setCurrentTag] = useState(""); // Tag yang sedang diketik
  const [folder, setFolder] = useState(""); // State untuk folder
  const [isEditMode, setIsEditMode] = useState(false); // Menentukan mode edit
  const [editingNote, setEditingNote] = useState(null); // Catatan yang sedang diedit
  const pathname = usePathname();

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleOpenEditModal = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags || []);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveNote = () => {
    if (isEditMode && editingNote) {
      console.log("Edit Note ID:", editingNote.id);
      console.log("Updated Title:", title);
      console.log("Updated Content:", content);
      console.log("Updated Tags:", tags);
    } else {
      console.log("New Note");
      console.log("Title:", title);
      console.log("Content:", content);
      console.log("Tags:", tags);
      console.log("Folder:", folder);
    }

    // Reset form dan tutup modal
    setTitle("");
    setContent("");
    setTags([]);
    setFolder("");
    setEditingNote(null);
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const sampleNote = {
    id: 1,
    title: "Note title #1",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, quas ut harum incidunt necessitatibus quaerat consequuntur aliquam, libero cum odio ea sint, dolorum quia quis doloribus suscipit dicta odit amet?",
    tags: ["tag 1", "tag 2"],
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
        </div>

        {/* Notes Container */}
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-5 items-start p-10">
          {/* Note Examples */}
          <div className="w-[300px] h-[280px] lg:w-[400px] lg:min-h-[300px] flex flex-col p-2 rounded-lg hover:shadow-lg shadow-md transition-all bg-slate-100">
            {/* title note */}
            <div className="w-full h-fit flex flex-row">
              {/* note title */}
              <h1 className="text-base lg:text-xl font-bold truncate">
                {sampleNote.title}
              </h1>
              <div className="flex flex-row ml-auto gap-x-2">
                {/* icon di-klik untuk edit note */}
                <Image
                  src={"/edit-icon.svg"}
                  width={0}
                  height={0}
                  className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:rotate-12 transition"
                  alt="edit Icon"
                  onClick={() => handleOpenEditModal(sampleNote)}
                />
                {/* icon di-klik untuk delete note */}
                <Image
                  src={"/delete-icon.svg"}
                  width={0}
                  height={0}
                  className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:rotate-12 transition"
                  alt="edit Icon"
                />
              </div>
            </div>
            {/* note content */}
            <div className="w-full h-full mt-1 lg:mt-2">
              {sampleNote.content}
            </div>
            {/* <div className="flex gap-2 flex-wrap mt-2">
              {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center gap-2"
              >
                tag 1
              </span>
               ))}
            </div> */}
            <div className="flex gap-2 flex-wrap mt-2">
              {sampleNote.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* time (kapan di update atau dibuat) */}
            <p className="text-xs lg:text-sm font-thin">3d ago</p>
          </div>
        </div>
      </div>

      {/* button untuk tambah note */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-5 right-2.5 lg:bottom-10 lg:right-5 rounded-full w-16 h-16 lg:w-20 lg:h-20 bg-gray-400 hover:bg-gray-500 flex justify-center items-center group"
      >
        <Image
          src={"/plus-icon.svg"}
          width={0}
          height={0}
          className="w-6 h-6 lg:w-11 lg:h-11 group-hover:rotate-[90deg] transition"
          alt="Search Icon"
        />
      </div>
      {/* end of button untuk tambah note */}



      {/* Modal untuk menambah notes */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {isEditMode ? "Edit Note" : "Add New Note"}
            </h2>
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
              <div>
                <label className="font-semibold">Tags:</label>
                <div className="flex gap-2 items-center mt-2">
                  <input
                    type="text"
                    placeholder="Add a tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddTag}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-semibold">Folder:</label>
                <select
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 mt-2"
                >
                  <option value="" disabled>
                    Select a folder
                  </option>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Ideas">Ideas</option>
                  <option value="Other">Other</option>
                </select>
              </div>
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
