"use client"
import { useState, useEffect } from "react"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import RaffleForm from "@/components/Admin/RaffleForm" // We will create this next

export default function AdminRafflesPage() {
  const [raffles, setRaffles] = useState([])
  const [editingRaffle, setEditingRaffle] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const fetchRaffles = async () => {
    const res = await fetch("/api/raffles")
    const data = await res.json()
    setRaffles(data.raffles || [])
  }

  useEffect(() => {
    fetchRaffles()
  }, [])

  const handleFormSubmit = () => {
    fetchRaffles()
    setIsFormOpen(false)
    setEditingRaffle(null)
  }

  const handleDrawWinners = async (id) => {
    if (confirm("Are you sure you want to draw winners for this raffle? This cannot be undone.")) {
      await fetch(`/api/raffles/${id}/draw`, { method: "POST" })
      fetchRaffles()
    }
  }
  
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this raffle?")) {
        await fetch(`/api/raffles/${id}`, { method: 'DELETE' });
        fetchRaffles();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Raffles</h1>
          <Button onClick={() => { setEditingRaffle(null); setIsFormOpen(true); }}>
            Create New Raffle
          </Button>
        </div>

        {isFormOpen && (
          <RaffleForm
            raffle={editingRaffle}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Entries</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {raffles.map((raffle) => {
              const now = new Date()
              const startTime = new Date(raffle.startTime)
              const endTime = new Date(raffle.endTime)
              const status = now < startTime ? "Upcoming" : now > endTime ? "Past" : "Active"

              return (
                <TableRow key={raffle.id}>
                  <TableCell>{raffle.title}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>{raffle._count.entries}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => { setEditingRaffle(raffle); setIsFormOpen(true); }}>Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDrawWinners(raffle.id)} disabled={status !== 'Past'}>Draw Winners</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(raffle.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}
