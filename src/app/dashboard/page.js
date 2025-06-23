'use client';
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import NotesGrid from "../../components/Dashboard/notes-grid";
import UploadSection from "../../components/Dashboard/upload-section";
import RaffleCard from "../../components/Dashboard/raffle-card";
import NoteViewer from "../../components/Dashboard/note-viewer";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [viewingFile, setViewingFile] = useState(null);
  const [raffleEntries, setRaffleEntries] = useState(3);

  const handleAddNote = (newNote) => {
    const noteToAdd = {
      date: new Date().toISOString().split('T')[0],
      ...newNote,
    };
    setNotes([...notes, noteToAdd]);
    setRaffleEntries(raffleEntries + 1);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  useEffect(() => {
    const initUser = async () => {
      try {
        const res = await fetch('/api/init-user');
        const text = await res.text();

        try {
          const json = JSON.parse(text);
          if (!res.ok) {
            console.error('User init failed:', json.error);
          } else {
            console.log('User exists or was added');
          }
        } catch (jsonErr) {
          console.error('Invalid JSON response:', text);
        }
      } catch (err) {
        console.error('Error calling init-user:', err);
      }
    };

    initUser();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('/api/notes/mine');
        const data = await res.json();
        if (res.ok) {
          setNotes(data.notes);
        } else {
          console.error("Failed to fetch notes:", data.error);
        }
      } catch (err) {
        console.error("Error fetching user notes:", err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Study Notes Dashboard</h1>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Award className="text-yellow-500" />
            <span className="font-medium">Raffle Entries: {raffleEntries}</span>
          </div>
        </div>

        <Tabs defaultValue="my-notes" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="my-notes">My Notes</TabsTrigger>
            <TabsTrigger value="upload">Upload Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="my-notes">
            <NotesGrid 
              notes={notes}
              onDeleteNote={handleDeleteNote}
              onViewNote={(filePath) => setViewingFile(filePath)}
            />
          </TabsContent>

          <TabsContent value="upload">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UploadSection onNoteUploaded={handleAddNote} />
              <RaffleCard entries={raffleEntries} />

              {/* STEM Tutoring Resources Card */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">STEM Tutoring Resources</h3>
                    <p className="text-sm text-gray-600">Access study materials</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Browse resources from tutors and other students</p>
                </div>
                <button className="w-full mt-4 py-2 border border-green-200 rounded-md text-green-700 hover:bg-green-100 transition-colors">
                  Browse Resources
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {viewingFile && (
        <NoteViewer
          filePath={viewingFile}
          onClose={() => setViewingFile(null)}
        />
      )}
    </div>
  );
}
