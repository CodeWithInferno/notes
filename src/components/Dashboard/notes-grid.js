"use client"
import { FileText, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function NotesGrid({ notes, onDeleteNote }) {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="text-red-500" />
      case "docx":
      case "doc":
        return <FileText className="text-blue-500" />
      default:
        return <FileText />
    }
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium">No notes yet</h3>
        <p className="text-gray-500">Upload your first note to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <Card key={note.id} className="p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              {getFileIcon(note.fileType)}
              <div>
                <h3 className="font-medium">{note.title}</h3>
                <p className="text-sm text-gray-500">
                  {note.subject} ({note.subjectCode})
                </p>
                <p className="text-xs text-gray-400">Prof: {note.professor}</p>
                <p className="text-xs text-gray-400">{note.semester}</p>
                <p className="text-xs text-gray-400 mt-1">Uploaded: {note.date}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteNote(note.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="w-full">
              View
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Download
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

