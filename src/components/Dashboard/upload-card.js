"use client"
import { useState } from "react"
import { Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UploadSection({ onNoteUploaded }) {
  const [isUploading, setIsUploading] = useState(false)
  const [semester, setSemester] = useState("Spring 2025")

  const handleFileUpload = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const newNote = {
      title: formData.get("title"),
      subject: formData.get("subject"),
      subjectCode: formData.get("subjectCode"),
      professor: formData.get("professor"),
      semester: semester,
      fileType: formData.get("file").name.split(".").pop(),
    }

    // In a real app, you would upload the file to a server here
    onNoteUploaded(newNote)
    setIsUploading(false)
    e.target.reset()
  }

  return (
    <Dialog open={isUploading} onOpenChange={setIsUploading}>
      <DialogTrigger asChild>
        <Card className="p-6 flex flex-col items-center justify-center h-64 border-dashed cursor-pointer hover:bg-gray-50 transition-colors">
          <Plus className="h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-500 font-medium">Upload New Notes</p>
          <p className="text-xs text-gray-400 mt-1">Earn a raffle entry for each upload!</p>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Study Notes</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g., Calculus Chapter 5 Notes" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="e.g., Mathematics" required />
            </div>
            <div>
              <Label htmlFor="subjectCode">Subject Code</Label>
              <Input id="subjectCode" name="subjectCode" placeholder="e.g., MATH 101" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="professor">Professor</Label>
              <Input id="professor" name="professor" placeholder="e.g., Dr. Smith" required />
            </div>
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                  <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                  <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="file">File</Label>
            <div className="mt-1 flex items-center justify-center w-full">
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOCX, PPT, etc.</p>
                </div>
                <Input id="file" name="file" type="file" className="hidden" required />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsUploading(false)}>
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

