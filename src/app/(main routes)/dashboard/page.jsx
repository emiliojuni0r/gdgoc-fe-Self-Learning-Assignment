"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";

export default function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]); // State untuk menyimpan catatan yang difilter
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortOption, setSortOption] = useState(""); // State untuk menyimpan opsi sorting
  const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan query pencarian
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5500/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(data);
        setFilteredNotes(data); // Set catatan yang difilter saat data diambil
      } else {
        console.error("Failed to fetch notes");
      }
    };

    fetchNotes();
  }, []);

  const handleDeleteNote = async (noteId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5500/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setNotes(notes.filter(note => note.note_id !== noteId));
      setFilteredNotes(filteredNotes.filter(note => note.note_id !== noteId)); // Update filtered notes
    } else {
      console.error("Failed to delete note");
    }
  };

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

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    sortNotes(value);
  };

  const sortNotes = (option) => {
    let sortedNotes = [...filteredNotes]; // Sort based on filtered notes
    if (option === "latest") {
      sortedNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (option === "oldest") {
      sortedNotes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
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
    const filtered = notes.filter(note => 
      note.title.toLowerCase().includes(query)
    );
    setFilteredNotes(filtered);
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
          <form action="" className="w-fit sm:w-[700px] lg:w-[1000px] h-fit relative px-4 group">
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
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 lg:gap-x-2 lg:gap-y-8 items-start p-10">
          {filteredNotes.map((note) => (
            <div
              key={note.note_id}
              className="w-[300px] h-[280px] sm:w-[290px] lg:w-[400px] lg:min-h-[300px] flex flex-col p-2 rounded-lg hover:shadow-lg shadow-md transition-all bg-slate-100"
            >
              <div className="w-full h-fit flex flex-row">
                <h1 className="text-base lg:text-xl font-bold truncate">{note.title}</h1>
                <div className="flex flex-row ml-auto gap-x-2">
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
                  <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
              <p className="text-xs lg:text-sm font-thin">{timeAgo(note.created_at)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}