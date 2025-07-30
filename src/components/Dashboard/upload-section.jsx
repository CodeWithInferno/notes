"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Upload, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Reusable Combobox Component
function Combobox({
  items,
  value,
  onSelect,
  placeholder,
  searchPlaceholder,
  emptyPlaceholder,
  onAddNew,
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? items.find((item) => item.id === value)?.name
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>
              <Button variant="ghost" size="sm" onClick={() => onAddNew()}>
                <Plus className="mr-2 h-4 w-4" />
                {emptyPlaceholder}
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onSelect(item.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function UploadSection({ onNoteUploaded }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [academics, setAcademics] = useState({
    courses: [],
    professors: [],
    semesters: [],
  })
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedProfessor, setSelectedProfessor] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)

  // Fetch academic data
  useEffect(() => {
    if (isOpen) {
      const fetchAcademics = async () => {
        const res = await fetch("/api/academics")
        if (res.ok) {
          const data = await res.json()
          setAcademics(data)
        }
      }
      fetchAcademics()
    }
  }, [isOpen])

  const handleAddNew = useCallback(async (type, name) => {
    const endpoint = "/api/academics/create"
    let data = {}

    if (type === 'semester') {
        const parts = name.split(' ');
        const year = parseInt(parts.pop(), 10);
        const season = parts.join(' ');
        if(isNaN(year)) {
            alert("Invalid semester format. Please use 'Season Year', e.g., 'Spring 2025'.");
            return;
        }
        data = { name: season, year };
    } else {
        data = { name };
    }
    
    if(type === 'course') {
        const code = prompt(`Enter a course code for ${name}:`);
        if(!code) return;
        data.code = code;
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data }),
    })

    if (res.ok) {
      const newItem = await res.json()
      setAcademics((prev) => ({
        ...prev,
        [`${type}s`]: [...prev[`${type}s`], newItem],
      }))
      // Automatically select the new item
      if (type === 'course') setSelectedCourse(newItem.id);
      if (type === 'professor') setSelectedProfessor(newItem.id);
      if (type === 'semester') setSelectedSemester(newItem.id);
    } else {
      const { error } = await res.json();
      alert(`Error: ${error}`);
    }
  }, [])

  const handleFileUpload = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const form = e.target
    const formData = new FormData(form)

    // Append selected IDs
    formData.append("courseId", selectedCourse)
    formData.append("professorId", selectedProfessor)
    formData.append("semesterId", selectedSemester)

    const res = await fetch("/api/notes/upload", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      const data = await res.json()
      onNoteUploaded(data.note)
      setIsOpen(false)
      form.reset()
    } else {
      const { error } = await res.json();
      alert(`Upload failed: ${error}`);
    }
    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="p-6 flex flex-col items-center justify-center h-64 border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
          <Plus className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground font-medium">Upload New Notes</p>
          <p className="text-xs text-muted-foreground/80 mt-1">
            Earn a raffle entry for each upload!
          </p>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Study Notes</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <Label htmlFor="title">Note Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Chapter 5 Summary"
              required
            />
          </div>
          
          <div>
            <Label>Course</Label>
            <Combobox
              items={academics.courses}
              value={selectedCourse}
              onSelect={setSelectedCourse}
              placeholder="Select a course"
              searchPlaceholder="Search courses..."
              emptyPlaceholder="Add a new course"
              onAddNew={() => {
                const name = prompt("Enter new course name:");
                if (name) handleAddNew('course', name);
              }}
            />
          </div>

          <div>
            <Label>Professor</Label>
            <Combobox
              items={academics.professors}
              value={selectedProfessor}
              onSelect={setSelectedProfessor}
              placeholder="Select a professor"
              searchPlaceholder="Search professors..."
              emptyPlaceholder="Add a new professor"
              onAddNew={() => {
                const name = prompt("Enter new professor name:");
                if (name) handleAddNew('professor', name);
              }}
            />
          </div>

          <div>
            <Label>Semester</Label>
            <Combobox
              items={academics.semesters}
              value={selectedSemester}
              onSelect={setSelectedSemester}
              placeholder="Select a semester"
              searchPlaceholder="Search semesters..."
              emptyPlaceholder="Add a new semester"
              onAddNew={() => {
                const name = prompt("Enter new semester (e.g., Spring 2025):");
                if (name) handleAddNew('semester', name);
              }}
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              name="description"
              placeholder="Any extra details about the note"
            />
          </div>

          <div>
            <Label htmlFor="file">File</Label>
            <div className="mt-1 flex items-center justify-center w-full">
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOCX, PPT, etc.
                  </p>
                </div>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  className="hidden"
                  required
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}