"use client";

import { useRef } from "react";

export default function FileDropzone({ onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="border border-dashed border-zinc-600 rounded-lg p-10 text-center cursor-pointer hover:border-blue-500 hover:bg-[#1a1d26] transition-all duration-200"
    >
      <p className="text-zinc-300 font-medium">Click to select audio file</p>

      <p className="text-sm text-zinc-500 mt-2">or drag and drop here</p>

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleChange}
        accept=".mp3,.wav,.m4a"
      />
    </div>
  );
}
