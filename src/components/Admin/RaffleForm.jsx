"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import Image from "next/image"

export default function RaffleForm({ raffle, onSubmit, onCancel }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [prizes, setPrizes] = useState([{ name: "", description: "", quantity: 1, imageUrl: null, file: null }])

  useEffect(() => {
    if (raffle) {
      setTitle(raffle.title)
      setDescription(raffle.description || "")
      setStartTime(new Date(raffle.startTime).toISOString().slice(0, 16))
      setEndTime(new Date(raffle.endTime).toISOString().slice(0, 16))
      setPrizes(raffle.raffle_prizes.length > 0 ? raffle.raffle_prizes.map(p => ({...p, file: null})) : [{ name: "", description: "", quantity: 1, imageUrl: null, file: null }])
    }
  }, [raffle])

  const handlePrizeChange = (index, field, value) => {
    const newPrizes = [...prizes]
    newPrizes[index][field] = value
    setPrizes(newPrizes)
  }

  const handleImageUpload = async (index) => {
    const prize = prizes[index];
    if (!prize.file) return;
    
    const formData = new FormData();
    formData.append('file', prize.file);

    const res = await fetch('/api/admin/upload-prize-image', {
        method: 'POST',
        body: formData,
    });

    if (res.ok) {
        const { imageUrl } = await res.json();
        handlePrizeChange(index, 'imageUrl', imageUrl);
    } else {
        alert('Image upload failed.');
    }
  }

  const addPrize = () => {
    setPrizes([...prizes, { name: "", description: "", quantity: 1, imageUrl: null, file: null }])
  }

  const removePrize = (index) => {
    const newPrizes = prizes.filter((_, i) => i !== index)
    setPrizes(newPrizes)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endpoint = raffle ? `/api/raffles/${raffle.id}` : "/api/raffles"
    const method = raffle ? "PUT" : "POST"

    // We only need to send the imageUrl, not the local file object
    const prizesToSubmit = prizes.map(({file, ...rest}) => rest);

    await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, startTime, endTime, prizes: prizesToSubmit }),
    })
    onSubmit()
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{raffle ? "Edit Raffle" : "Create New Raffle"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Raffle Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <Input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <h3 className="font-bold">Prizes</h3>
          {prizes.map((prize, index) => (
            <div key={index} className="p-4 border-border rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Prize Name"
                        value={prize.name}
                        onChange={(e) => handlePrizeChange(index, "name", e.target.value)}
                        required
                    />
                    <Input
                        type="number"
                        placeholder="Quantity"
                        value={prize.quantity}
                        onChange={(e) => handlePrizeChange(index, "quantity", parseInt(e.target.value))}
                        required
                        min="1"
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removePrize(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                 <Input
                    placeholder="Prize Description"
                    value={prize.description}
                    onChange={(e) => handlePrizeChange(index, "description", e.target.value)}
                />
                <div className="flex items-center gap-2">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePrizeChange(index, "file", e.target.files[0])}
                        className="flex-grow"
                    />
                    <Button type="button" onClick={() => handleImageUpload(index)} disabled={!prize.file}>Upload</Button>
                    {prize.imageUrl && <Image src={prize.imageUrl} alt="Prize preview" width={40} height={40} className="rounded-md" />}
                </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addPrize}>
            Add Another Prize
          </Button>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{raffle ? "Update Raffle" : "Create Raffle"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
