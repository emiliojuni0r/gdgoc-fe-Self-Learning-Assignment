// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CreateNotePage() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState([]);
//   const [currentTag, setCurrentTag] = useState("");
//   const router = useRouter();

//   const handleAddTag = () => {
//     if (currentTag && !tags.includes(currentTag)) {
//       setTags([...tags, currentTag]);
//       setCurrentTag("");
//     }
//   };

//   const handleSaveNote = () => {
//     console.log("New Note");
//     console.log("Title:", title);
//     console.log("Content:", content);
//     console.log("Tags:", tags);

//     // Reset form
//     setTitle("");
//     setContent("");
//     setTags([]);
//     setCurrentTag("");

//     // Redirect to dashboard
//     router.push("/dashboard");
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-lg font-bold mb-4">Create New Note</h2>
//       <input
//         type="text"
//         placeholder="Note Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 mb-4"
//       />
//       <textarea
//         placeholder="Note Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         className="border border-gray-300 rounded-md p-2 w-full h-32 focus:ring-2 focus:ring-blue-500 mb-4"
//       />
//       <div>
//         <label className="font-semibold">Tags:</label>
//         <div className="flex gap-2 items-center mt-2">
//           <input
//             type="text"
//             placeholder="Add a tag"
//             value={currentTag}
//             onChange={(e) => setCurrentTag(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
//             className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleAddTag}
//             className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
//           >
//             Add
//           </button>
//         </div>
//         <div className="flex gap-2 flex-wrap mt-2">
//           {tags.map((tag, index) => (
//             <span
//               key={index}
//               className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center gap-2"
//             >
//               {tag}
//               <button
//                 onClick={() => setTags(tags.filter((t) => t !== tag))}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-end gap-2 mt-4">
//         <button
//           onClick={() => router.push("/dashboard")}
//           className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSaveNote}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const router = useRouter();

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleSaveNote = () => {
    console.log("New Note");
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Tags:", tags);

    // Reset form
    setTitle("");
    setContent("");
    setTags([]);
    setCurrentTag("");

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="p-5">
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
  );
}