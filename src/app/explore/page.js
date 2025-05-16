"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Landing/header"
import FilterSidebar from "@/components/Explore/filter-sidebar"
import ResultsGrid from "@/components/Explore/results-grid"
import SearchBar from "@/components/Explore/search-bar"
import { useRouter } from "next/navigation"

import Link from "next/link"; // don't forget if not imported!


export default function Explore() {
  const [allNotes, setAllNotes] = useState([])
  const [isApproved, setIsApproved] = useState(null)
  const [filteredNotes, setFilteredNotes] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    subject: [],
    semester: [],
    fileType: [],
    professor: [],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("/api/check-user-role")
        const data = await res.json()
  
        if (!res.ok || data.is_approved !== true) {
          router.replace("/dashboard")
        } else {
          setIsApproved(true)
        }
      } catch (err) {
        console.error("Access check failed", err)
        router.replace("/dashboard")
      }
    }
  
    checkAccess()
  }, [])
  
  useEffect(() => {
    if (isApproved !== true) return
  
    const fetchNotes = async () => {
      try {
        const res = await fetch('/api/notes/explore')
        const data = await res.json()
  
        if (res.ok) {
          setAllNotes(data.notes)
        } else {
          console.error('Failed to fetch notes:', data.error)
        }
      } catch (err) {
        console.error('Fetch error:', err)
      }
    }
  
    fetchNotes()
  }, [isApproved])
  
  
  // Apply filters and search
  useEffect(() => {
    let results = [...allNotes];
  
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.subject.toLowerCase().includes(query) ||
          note.subjectCode.toLowerCase().includes(query) ||
          note.professor.toLowerCase().includes(query),
      );
    }
  
    if (activeFilters.subject.length > 0) {
      results = results.filter((note) => activeFilters.subject.includes(note.subject));
    }
  
    if (activeFilters.semester.length > 0) {
      results = results.filter((note) => activeFilters.semester.includes(note.semester));
    }
  
    if (activeFilters.fileType.length > 0) {
      results = results.filter((note) => activeFilters.fileType.includes(note.fileType));
    }
  
    if (activeFilters.professor.length > 0) {
      results = results.filter((note) => activeFilters.professor.includes(note.professor));
    }
  
    results.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'downloads':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  
    setFilteredNotes(results);
  }, [allNotes, activeFilters, searchQuery, sortBy]);
  

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

