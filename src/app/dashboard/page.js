'use client'
import React, { useState, useEffect, useCallback } from "react"
import Header from "../../components/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import NotesGrid from "../../components/Dashboard/notes-grid"
import UploadSection from "../../components/Dashboard/upload-section"
import EditNoteModal from "../../components/Dashboard/EditNoteModal"
import RaffleHighlightCard from "../../components/Dashboard/RaffleHighlightCard"
import Link from "next/link"
import { Award } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const NotesGridSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
                <Skeleton className="h-32 w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/5" />
                </div>
            </div>
        ))}
    </div>
)

export default function Dashboard() {
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [academics, setAcademics] = useState({ courses: [], semesters: [] })
  const [loading, setLoading] = useState(true)

  const fetchAcademics = useCallback(async () => {
    const res = await fetch("/api/academics")
    if (res.ok) {
      setAcademics(await res.json())
    }
  }, [])

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes/mine")
      if (res.ok) {
        const data = await res.json()
        setNotes(data.notes || [])
      } else {
        const errorData = await res.json()
        if (errorData.error !== 'User not found') {
          console.error("Failed to fetch notes:", errorData)
        }
      }
    } catch (err) {
      console.error("Error fetching user notes:", err)
    }
  }, [])

  useEffect(() => {
    const initializeUserAndFetchData = async () => {
      setLoading(true)
      const userRes = await fetch('/api/init-user');
      if (userRes.ok) {
        const { user } = await userRes.json();
        setUser(user);
      }
      await Promise.all([fetchNotes(), fetchAcademics()])
      setLoading(false)
    }
    initializeUserAndFetchData()
  }, [fetchNotes, fetchAcademics])

  const handleNoteUploaded = useCallback(() => {
    fetchNotes()
    setUser(prev => prev ? { ...prev, kudosPoints: prev.kudosPoints + 10 } : null)
  }, [fetchNotes])

  const handleDeleteNote = async (noteId) => {
    if (confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
        const res = await fetch(`/api/notes/${noteId}`, { method: 'DELETE' });
        if (res.ok) {
            fetchNotes();
        } else {
            alert("Failed to delete the note.");
        }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Study Notes Dashboard</h1>
          {user && (
            <div className="flex items-center gap-2 mt-4 md:mt-0">
                <Award className="text-secondary" />
                <span className="font-medium">
                    {user.kudosPoints} Kudos Points
                </span>
            </div>
          )}
        </div>

        <Tabs defaultValue="my-notes" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="my-notes">My Notes</TabsTrigger>
            <TabsTrigger value="upload">Upload Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="my-notes">
            {loading ? (
                <NotesGridSkeleton />
            ) : (
                <NotesGrid
                  notes={notes}
                  currentUserId={user?.id}
                  onEdit={setEditingNote}
                  onDelete={handleDeleteNote}
                />
            )}
          </TabsContent>

          <TabsContent value="upload">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UploadSection onNoteUploaded={handleNoteUploaded} />
              <RaffleHighlightCard />
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">STEM Tutoring Resources</h3>
                    <p className="text-sm text-muted-foreground">Access study materials</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Browse resources from tutors and other students</p>
                </div>
                <Link href="/explore" passHref>
                  <button className="w-full mt-4 py-2 border border-border rounded-md text-primary hover:bg-primary/10 transition-colors">
                    Browse Resources
                  </button>
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {editingNote && (
        <EditNoteModal
            note={editingNote}
            academics={academics}
            isOpen={!!editingNote}
            onClose={() => setEditingNote(null)}
            onNoteUpdated={fetchNotes}
        />
      )}
    </div>
  )
}