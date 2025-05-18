'use client';
import { useEffect, useState } from "react";

export default function NoteViewer({ filePath, onClose }) {
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (filePath) {
      const publicBase = "https://ocgiyhicvoovieaunvar.supabase.co/storage/v1/object/public/notes/";
      setFileUrl(publicBase + filePath);
    }
  }, [filePath]);

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  if (!fileUrl) {
    return <div className="text-center p-10">Loading document...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-lg overflow-hidden relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-black z-10"
        >
          ✕
        </button>
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
        ></iframe>
      </div>
    </div>
  );
}
