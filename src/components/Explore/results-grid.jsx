import Link from "next/link";
import { Download, Star, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ResultsGrid({ notes }) {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="text-red-500" />;
      case "docx":
        return <FileText className="text-blue-500" />;
      case "xlsx":
        return <FileText className="text-green-500" />;
      default:
        return <FileText className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex-1">
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-8 text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No results found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            {notes.length} results found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <Card
                key={note.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        {getFileIcon(note.fileType)}
                        <Badge
                          variant="outline"
                          className="ml-2 uppercase text-xs"
                        >
                          {note.fileType}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm ml-1">{note.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-medium text-lg mb-1 line-clamp-1">
                      {note.title}
                    </h3>

                    <div className="flex flex-col space-y-1 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">Subject:</span>
                        {note.subject} ({note.subjectCode})
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">Professor:</span>
                        {note.professor}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {formatDate(note.date)}
                      </div>
                    </div>

                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                      {note.semester}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4 bg-gray-50 border-t">

                <Link href={`/view?file=${encodeURIComponent(note.file_path)}`} className="w-full">
                  <Button size="sm" className="w-full">
                    View
                  </Button>
                </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
