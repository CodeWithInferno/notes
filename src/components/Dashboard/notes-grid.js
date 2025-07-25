"use client"
import { FileText, Eye, Star, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function NotesGrid({ notes, showUploader = false, currentUserId, onEdit, onDelete }) {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="text-red-500" />
      case "docx":
        return <FileText className="text-blue-500" />
      default:
        return <FileText />
    }
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-24">
        <FileText className="mx-auto h-14 w-14 text-gray-300" />
        <h3 className="mt-6 text-xl font-semibold text-gray-700">No Results Found</h3>
        <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {notes.map((note) => (
        <Card
          key={note.id}
          className={cn(
            "p-5 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all group",
            "hover:border-primary/50 bg-white relative flex flex-col justify-between",
          )}
        >
          <div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-gray-100 group-hover:bg-primary/10 transition">
                {getFileIcon(note.fileType)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold truncate text-gray-800 group-hover:text-primary transition">
                  {note.title}
                </h3>
                {note.course && (
                  <p className="text-sm text-gray-500">
                    {note.course.name}{" "}
                    {note.course.code && (
                      <span className="text-xs">({note.course.code})</span>
                    )}
                  </p>
                )}
                {note.course?.professor && (
                  <p className="text-xs text-muted-foreground">
                    Prof. {note.course.professor.name}
                  </p>
                )}
                {note.semester && (
                  <p className="text-xs text-muted-foreground">
                    {note.semester.name} {note.semester.year}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1 italic">
                  Uploaded: {new Date(note.createdAt).toLocaleDateString()}
                </p>
                {showUploader && note.uploader && (
                    <p className="text-xs text-gray-400 mt-1">
                        By: {note.uploader.name}
                    </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center gap-3">
            <Link href={`/view/${note.id}`} passHref className="flex-grow">
                <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                >
                    <Eye className="w-4 h-4 mr-2" /> View
                </Button>
            </Link>
            {note.uploaderId === currentUserId && (
                <>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(note)}
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDelete(note.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </>
            )}
            <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{note.averageRating.toFixed(1)}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

