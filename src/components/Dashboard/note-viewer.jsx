'use client';
import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center text-white animate-pulse text-lg font-medium">
          Loading document...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 animate-scaleIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 p-2 rounded-full transition-all shadow-sm"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Document Viewer */}
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
