"use client";
import { FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // assuming your utility fn

export default function NotesGrid({ notes, onViewNote }) {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="text-red-500" />;
      case "docx":
      case "doc":
        return <FileText className="text-blue-500" />;
      default:
        return <FileText />;
    }
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-24">
        <FileText className="mx-auto h-14 w-14 text-gray-300" />
        <h3 className="mt-6 text-xl font-semibold text-gray-700">No Notes Available</h3>
        <p className="text-gray-500 text-sm">Upload your first note and start collaborating smarter ✨</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {notes.map((note) => (
        <Card
          key={note.id}
          className={cn(
            "p-5 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all group",
            "hover:border-primary/50 bg-white relative"
          )}
        >
          {/* Icon + Title */}
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-primary/10 transition">
              {getFileIcon(note.fileType)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold truncate text-gray-800 group-hover:text-primary transition">
                {note.title}
              </h3>
              <p className="text-sm text-gray-500">
                {note.subject} <span className="text-xs">({note.subjectCode})</span>
              </p>
              <p className="text-xs text-muted-foreground">Prof. {note.professor}</p>
              <p className="text-xs text-muted-foreground">{note.semester}</p>
              <p className="text-xs text-gray-400 mt-1 italic">Uploaded: {note.date}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-between gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="w-full group/view-btn transition hover:bg-primary hover:text-white"
              onClick={() => onViewNote?.(note.file_path)}
            >
              <Eye className="w-4 h-4 mr-2 group-hover/view-btn:text-white" /> View
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
