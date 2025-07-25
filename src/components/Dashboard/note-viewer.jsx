'use client'
import { useEffect } from "react"
import { X, Download, FileWarning } from "lucide-react"

export default function NoteViewer({ filePath: fileUrl, onClose }) {
  // Prevent background scrolling when the viewer is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  if (!fileUrl) {
    return null
  }

  const fileExtension = fileUrl.split(".").pop().toLowerCase()

  const renderContent = () => {
    if (fileExtension === "pdf") {
      return (
        <embed
          src={fileUrl}
          type="application/pdf"
          className="w-full h-full"
        />
      )
    } else if (["png", "jpg", "jpeg", "gif", "webp"].includes(fileExtension)) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
          <img
            src={fileUrl}
            alt="Note preview"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )
    } else {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
          <FileWarning className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">
            Preview not available
          </h3>
          <p className="text-gray-600 mt-2">
            This file type ({fileExtension}) cannot be previewed directly.
          </p>
          <a
            href={fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download File
          </a>
        </div>
      )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 p-2 rounded-full transition-all shadow-sm"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {renderContent()}
      </div>
    </div>
  )
}
