"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const router = useRouter();

  const handleSaveNote = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5500/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, tags }),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.error("Failed to create note");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col relative">
      <div className="px-5 lg:px-14 pt-4 lg:pt-6">
        <h2 className="text-lg font-bold mb-4">Create New Note</h2>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full h-32 focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <div>
          <label className="font-semibold">Tags:</label>
          <div className="flex gap-2 items-center mt-2">
            <input
              type="text"
              placeholder="Add a tag"
              onChange={(e) => setTags(e.target.value.split(','))}
              className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => router.push("/dashboard")}
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
  );
}