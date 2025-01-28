"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditNotePage({ params }) {
  const { id } = params;
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5500/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNote(data);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags); // Mengurai tags dari JSON
      } else {
        console.error("Failed to fetch note");
      }
    };

    fetchNote();
  }, [id]);

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleSaveNote = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5500/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, tags }),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.error("Failed to update note");
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen flex flex-col relative">
      <div className="px-5 lg:px-14 pt-4 lg:pt-6">
        <h2 className="text-lg font-bold mb-4">Edit Note</h2>
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
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
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