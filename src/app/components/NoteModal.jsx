"use client";

import React from "react";


const NoteModal = ({ note, onClose,timeAgo }) => {
  if (!note) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-5 w-11/12 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4">{note.title}</h2>
        <p className="mb-4 flex-wrap">{note.content}</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {note.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{tag}</span>
          ))}
        </div>
        <p className="text-xs lg:text-sm font-thin">{timeAgo(note.created_at)}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default NoteModal;