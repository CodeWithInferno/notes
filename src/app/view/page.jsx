"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewPage() {
  const searchParams = useSearchParams();
  const filePath = searchParams.get("file");
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (filePath) {
      const publicBase = "https://ocgiyhicvoovieaunvar.supabase.co/storage/v1/object/public/notes/";
      setFileUrl(publicBase + filePath);
    }
  }, [filePath]);

  if (!fileUrl) {
    return <div className="text-center p-10">Loading document...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <iframe
        src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
        className="w-full h-screen border-0"
        allow="fullscreen"
      ></iframe>
    </div>
  );
}
