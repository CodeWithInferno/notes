"use client"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import NotesGrid from "@/components/Dashboard/notes-grid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText } from "lucide-react"

function MultiSelectFilter({ title, options, selected, onSelectedChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selected.includes(option)}
            onCheckedChange={() => {
              const newSelected = selected.includes(option)
                ? selected.filter((item) => item !== option)
                : [...selected, option]
              onSelectedChange(newSelected)
            }}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function ExplorePage() {
  const [loading, setLoading] = useState(true)
  const [allNotes, setAllNotes] = useState([])
  const [filterOptions, setFilterOptions] = useState({ courses: [], professors: [], semesters: [] })
  const [activeFilters, setActiveFilters] = useState({
    course: [],
    semester: [],
    professor: [],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/notes/explore")
        if (!res.ok) {
          router.replace("/dashboard")
          return
        }
        const data = await res.json()
        setAllNotes(data.notes || [])
        setFilterOptions(data.filterOptions || { courses: [], professors: [], semesters: [] })
      } catch (err) {
        console.error("Fetch error:", err)
        router.replace("/dashboard")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  const filteredNotes = useMemo(() => {
    return allNotes
      .filter((note) => {
        const isCourseMatch = activeFilters.course.length === 0 || activeFilters.course.includes(note.course?.name)
        const isSemesterMatch = activeFilters.semester.length === 0 || activeFilters.semester.includes(`${note.semester?.name} ${note.semester?.year}`)
        const isProfessorMatch = activeFilters.professor.length === 0 || activeFilters.professor.includes(note.course?.professor?.name)
        const isSearchMatch = !searchQuery || note.title.toLowerCase().includes(searchQuery.toLowerCase())
        return isCourseMatch && isSemesterMatch && isProfessorMatch && isSearchMatch
      })
  }, [allNotes, activeFilters, searchQuery])

  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-24">Loading notes...</div>
    }
    if (allNotes.length === 0) {
      return (
        <div className="text-center py-24">
            <FileText className="mx-auto h-14 w-14 text-gray-300" />
            <h3 className="mt-6 text-xl font-semibold text-gray-700">No Notes to Explore</h3>
            <p className="text-gray-500 text-sm">It looks like no notes have been shared by other users yet.</p>
        </div>
      )
    }
    return (
      <>
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white rounded-lg border">
          <Input
            placeholder="Search by note title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <div className="flex gap-2">
            <MultiSelectFilter
              title="Courses"
              options={filterOptions.courses}
              selected={activeFilters.course}
              onSelectedChange={(selected) => setActiveFilters(prev => ({ ...prev, course: selected }))}
            />
            <MultiSelectFilter
              title="Professors"
              options={filterOptions.professors}
              selected={activeFilters.professor}
              onSelectedChange={(selected) => setActiveFilters(prev => ({ ...prev, professor: selected }))}
            />
            <MultiSelectFilter
              title="Semesters"
              options={filterOptions.semesters}
              selected={activeFilters.semester}
              onSelectedChange={(selected) => setActiveFilters(prev => ({ ...prev, semester: selected }))}
            />
          </div>
        </div>
        <NotesGrid notes={filteredNotes} showUploader={true} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Explore Notes</h1>
          <p className="text-gray-600 mt-2">
            Find the study materials you need from our community.
          </p>
        </div>
        {renderContent()}
      </main>
    </div>
  )
}
