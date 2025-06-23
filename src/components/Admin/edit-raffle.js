"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

export default function RaffleEditor({ raffle, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(raffle.title)
  const [description, setDescription] = useState(raffle.description || "")
  const [startTime, setStartTime] = useState(raffle.start_time)
  const [endTime, setEndTime] = useState(raffle.end_time)

  const handleUpdate = async () => {
    const res = await fetch("/api/raffle/update-raffle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: raffle.id,
        title,
        description,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
      }),
    })
    const data = await res.json()
    if (data.success) {
      onUpdate()
      setOpen(false)
    } else {
      alert("Failed to update raffle")
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4 text-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Raffle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="datetime-local"
              value={new Date(startTime).toISOString().slice(0, 16)}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              type="datetime-local"
              value={new Date(endTime).toISOString().slice(0, 16)}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button onClick={handleUpdate}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(raffle.id)}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </>
  )
}
