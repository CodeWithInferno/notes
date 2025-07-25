"use client"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// We can reuse the Combobox from the UploadSection, so we'll need to export it.
// For now, let's assume a simplified version.

export default function EditNoteModal({ note, academics, isOpen, onClose, onNoteUpdated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [courseId, setCourseId] = useState("")
  const [semesterId, setSemesterId] = useState("")

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setDescription(note.description || "")
      setCourseId(note.courseId)
      setSemesterId(note.semesterId)
    }
  }, [note])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/notes/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, courseId, semesterId }),
    })

    if (res.ok) {
      onNoteUpdated()
      onClose()
    } else {
      alert("Failed to update note.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          {/* Simplified selects for now. We can replace these with the Combobox later. */}
          <div>
            <Label htmlFor="course">Course</Label>
            <select id="course" value={courseId} onChange={(e) => setCourseId(e.target.value)} className="w-full p-2 border rounded">
              {academics.courses.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
            </select>
          </div>
           <div>
            <Label htmlFor="semester">Semester</Label>
            <select id="semester" value={semesterId} onChange={(e) => setSemesterId(e.target.value)} className="w-full p-2 border rounded">
              {academics.semesters.map(sem => <option key={sem.id} value={sem.id}>{sem.name} {sem.year}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
