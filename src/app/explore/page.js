"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Landing/header"
import FilterSidebar from "@/components/Explore/filter-sidebar"
import ResultsGrid from "@/components/Explore/results-grid"
import SearchBar from "@/components/Explore/search-bar"

export default function Explore() {
  const [allNotes, setAllNotes] = useState([
    {
      id: 1,
      title: "Calculus Notes",
      date: "2025-03-28",
      subject: "Mathematics",
      subjectCode: "MATH 101",
      professor: "Dr. Smith",
      semester: "Spring 2025",
      fileType: "pdf",
      downloads: 42,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Physics Lab Report",
      date: "2025-03-25",
      subject: "Physics",
      subjectCode: "PHYS 201",
      professor: "Dr. Johnson",
      semester: "Spring 2025",
      fileType: "docx",
      downloads: 28,
      rating: 4.2,
    },
    {
      id: 3,
      title: "Chemistry Formulas",
      date: "2025-03-20",
      subject: "Chemistry",
      subjectCode: "CHEM 110",
      professor: "Dr. Williams",
      semester: "Spring 2025",
      fileType: "pdf",
      downloads: 35,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Biology Cell Structure",
      date: "2025-03-15",
      subject: "Biology",
      subjectCode: "BIO 150",
      professor: "Dr. Brown",
      semester: "Spring 2025",
      fileType: "pdf",
      downloads: 31,
      rating: 4.3,
    },
    {
      id: 5,
      title: "Computer Science Algorithms",
      date: "2025-03-10",
      subject: "Computer Science",
      subjectCode: "CS 202",
      professor: "Dr. Davis",
      semester: "Spring 2025",
      fileType: "pdf",
      downloads: 56,
      rating: 4.8,
    },
    {
      id: 6,
      title: "Statistics Probability",
      date: "2025-03-05",
      subject: "Mathematics",
      subjectCode: "MATH 205",
      professor: "Dr. Miller",
      semester: "Spring 2025",
      fileType: "xlsx",
      downloads: 24,
      rating: 4.0,
    },
  ])

  const [filteredNotes, setFilteredNotes] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    subject: [],
    semester: [],
    fileType: [],
    professor: [],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")

  // Apply filters and search
  useEffect(() => {
    let results = [...allNotes]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.subject.toLowerCase().includes(query) ||
          note.subjectCode.toLowerCase().includes(query) ||
          note.professor.toLowerCase().includes(query),
      )
    }

    // Apply filters
    if (activeFilters.subject.length > 0) {
      results = results.filter((note) => activeFilters.subject.includes(note.subject))
    }

    if (activeFilters.semester.length > 0) {
      results = results.filter((note) => activeFilters.semester.includes(note.semester))
    }

    if (activeFilters.fileType.length > 0) {
      results = results.filter((note) => activeFilters.fileType.includes(note.fileType))
    }

    if (activeFilters.professor.length > 0) {
      results = results.filter((note) => activeFilters.professor.includes(note.professor))
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date)
        case "title":
          return a.title.localeCompare(b.title)
        case "downloads":
          return b.downloads - a.downloads
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

    setFilteredNotes(results)
  }, [allNotes, activeFilters, searchQuery, sortBy])

  // Get unique values for filters
  const getFilterOptions = () => {
    const subjects = [...new Set(allNotes.map((note) => note.subject))]
    const semesters = [...new Set(allNotes.map((note) => note.semester))]
    const fileTypes = [...new Set(allNotes.map((note) => note.fileType))]
    const professors = [...new Set(allNotes.map((note) => note.professor))]

    return { subjects, semesters, fileTypes, professors }
  }

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev }

      if (newFilters[filterType].includes(value)) {
        // Remove filter if already selected
        newFilters[filterType] = newFilters[filterType].filter((item) => item !== value)
      } else {
        // Add filter
        newFilters[filterType] = [...newFilters[filterType], value]
      }

      return newFilters
    })
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption)
  }

  const clearAllFilters = () => {
    setActiveFilters({
      subject: [],
      semester: [],
      fileType: [],
      professor: [],
    })
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Explore Study Notes</h1>
          <p className="text-gray-600 mt-2">Browse and filter through study materials shared by other students</p>
        </div>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <FilterSidebar
            filterOptions={getFilterOptions()}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
          />

          <ResultsGrid notes={filteredNotes} />
        </div>
      </main>
    </div>
  )
}

