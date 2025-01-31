"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import NoteModal from "@/app/components/NoteModal";

export default function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]); // State untuk menyimpan catatan yang difilter
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTagContainerOpen, setIsTagContainerOpen] = useState(false);
  const [sortOption, setSortOption] = useState(""); // State untuk menyimpan opsi sorting
  const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan query pencarian
  const [selectedTags, setSelectedTags] = useState([]); // State untuk menyimpan tags yang dipilih
  const [uniqueTags, setUniqueTags] = useState([]); // State untuk menyimpan tags unik
  const [selectedNote, setSelectedNote] = useState(null); // State untuk menyimpan catatan yang dipilih untuk modal
  const pathname = usePathname();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(data);
        setFilteredNotes(data); // Set catatan yang difilter saat data diambil

        // Ambil tags unik dari catatan
        const tags = new Set();
        data.forEach((note) => {
          note.tags.forEach((tag) => tags.add(tag));
        });
        setUniqueTags(Array.from(tags)); // Set tags unik
      } else {
        console.error("Failed to fetch notes");
      }
    };

    fetchNotes();
  }, []);

  const handleDeleteNote = async (noteId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setNotes(notes.filter((note) => note.note_id !== noteId));
      setFilteredNotes(filteredNotes.filter((note) => note.note_id !== noteId)); // Update filtered notes
    } else {
      console.error("Failed to delete note");
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    sortNotes(value);
  };

  const sortNotes = (option) => {
    let sortedNotes = [...filteredNotes]; // Sort based on filtered notes
    if (option === "latest") {
      sortedNotes.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (option === "oldest") {
      sortedNotes.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else if (option === "alphabetical") {
      sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "alphabeticalDescending") {
      sortedNotes.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredNotes(sortedNotes);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter notes based on the search query
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(query)
    );
    setFilteredNotes(filtered);
  };

  // Fungsi untuk menghitung waktu
  const timeAgo = (timestamp) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(timestamp)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return `${seconds} seconds ago`;
  };

  const handleTagChange = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag) // Remove tag if already selected
      : [...selectedTags, tag]; // Add tag if not selected
    setSelectedTags(updatedTags);

    // Filter notes based on selected tags
    const filtered = notes.filter((note) =>
      updatedTags.every((selectedTag) => note.tags.includes(selectedTag))
    );
    setFilteredNotes(filtered);
  };

  const openModal = (note) => {
    setSelectedNote(note); // Set the selected note for the modal
  };

  const closeModal = () => {
    setSelectedNote(null); // Clear the selected note to close the modal
  };

  return (
    <div className="w-screen h-screen flex flex-col relative overflow-x-hidden no-scrollbar">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        pathname={pathname}
      />
      <div className="flex flex-col">
        {/* Searchbar and Sorting */}
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          {/* Searchbar */}
          <form
            action=""
            className="w-fit sm:w-[700px] lg:w-[1000px] h-fit relative px-4 group"
          >
            <input
              type="text"
              className="w-full lg:w-full h-8 rounded-xl pl-8 bg-gray-100 border"
              placeholder="Search your note here"
              value={searchQuery} // Bind input value to searchQuery
              onChange={handleSearchChange} // Call handleSearchChange on input change
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
            onChange={handleSortChange}
          >
            <option value="">sort by</option>
            <option value="latest">Latest</option>
            <option value="oldest">Earliest</option>
            <option value="alphabetical">Alphabet Ascending</option>
            <option value="alphabeticalDescending">Alphabet Descending</option>
          </select>
        </Header>

        {/* Filter Tags */}
        <div
          className="fixed w-2/3 lg:w-11/12 h-fit bg-slate-100 mt-20 ml-12 rounded-3xl"
          onClick={() => setIsTagContainerOpen(!isTagContainerOpen)}
        >
          <div className="flex flex-row items-center pt-4 pl-5 pb-2">
            <Image
              src={"down-arrow-icon.svg"}
              width={24}
              height={24}
              className={`${
                isTagContainerOpen ? "rotate-180" : "rotate-0"
              } lg:w-[24px] lg:h-[24px] transform transition duration-300`}
              alt="dropdown-icon"
            />
            <h1 className={"pl-12 text-xl font-semibold"}>Filter by tags</h1>
          </div>
          <div
            className={`${
              isTagContainerOpen ? "flex" : "hidden"
            } flex-wrap gap-2 px-1 py-4 transform transition-all`}
          >
            {uniqueTags.length > 0
              ? uniqueTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center text-sm lg:text-lg bg-slate-200 rounded-3xl px-2"
                  >
                    <input
                      type="checkbox"
                      value={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                      className="mr-2 w-3 h-3 lg:w-5 lg:h-5 peer relative appearance-none 
                          border 
                          rounded-full border-gray-500 
                          cursor-pointer
                          hover:bg-gray-400  
                          checked:bg-gray-500 checked:hover:bg-gray-600"
                    />
                    {tag}
                  </label>
                ))
              : "no tags yet, create notes first!"}
          </div>
        </div>

        {/* Button to add note */}
        <Link
          href="/create-note"
          className="fixed bottom-5 right-2.5 lg:bottom-10 lg:right-6 rounded-full w-16 h-16 lg:w-20 lg:h-20 bg-gray-400 hover:bg-gray-500 flex justify-center items-center group"
        >
          <Image
            src={"/plus-icon.svg"}
            width={0}
            height={0}
            className="w-6 h-6 lg:w-11 lg:h-11 group-hover:rotate-[90deg] transition"
            alt="Add Note Icon"
          />
        </Link>

        {/* Notes Container */}
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 lg:gap-x-2 lg:gap-y-8 items-start p-10 mt-28 lg:mt-28">
          {filteredNotes.map((note) => (
            <div
              key={note.note_id}
              className="w-[280px] h-[280px] md:w-[320px] lg:w-[450px] lg:min-h-[350px] flex flex-col p-2 rounded-lg hover:shadow-lg shadow-md transition-all bg-slate-100 cursor-pointer"
            >
              <div className="w-full h-fit flex flex-row">
                <h1 className="text-sm lg:text-xl font-bold truncate">
                  {note.title}
                </h1>
                <div className=" flex flex-row ml-auto gap-x-2">
                  <Image
                    src={"/eye-icon.svg"}
                    width={0}
                    height={0}
                    className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:rotate-12 transition"
                    alt="eye Icon"
                    onClick={() => openModal(note)}
                  />
                  <Link href={`/edit-note/${note.note_id}`}>
                    <Image
                      src={"/edit-icon.svg"}
                      width={0}
                      height={0}
                      className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:rotate-12 transition"
                      alt="Edit Icon"
                    />
                  </Link>
                  <Image
                    src={"/delete-icon.svg"}
                    width={0}
                    height={0}
                    className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:rotate-12 transition"
                    alt="Delete Icon"
                    onClick={() => handleDeleteNote(note.note_id)}
                  />
                </div>
              </div>
              <div className="w-full h-full mt-1 lg:mt-2 line-clamp-6">
                <p>{note.content}</p>
              </div>
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
              <p className="text-xs lg:text-sm font-thin">
                {timeAgo(note.created_at)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for displaying note details */}
      <NoteModal note={selectedNote} onClose={closeModal} timeAgo={timeAgo} />
    </div>
  );
}
