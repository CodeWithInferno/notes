"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function RaffleDetailPage() {
  const [raffle, setRaffle] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    if (id) {
      const fetchRaffle = async () => {
        setLoading(true)
        const res = await fetch(`/api/raffles/${id}`)
        const data = await res.json()
        setRaffle(data)
        setLoading(false)
      }
      fetchRaffle()
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!raffle) {
    return <div>Raffle not found.</div>
  }

  const winners = raffle.entries.filter(entry => entry.isWinner);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">{raffle.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{raffle.description}</p>
        
        <h2 className="text-2xl font-bold mt-8">Prizes</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {raffle.raffle_prizes.map(prize => (
            <Card key={prize.id}>
              {prize.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={prize.imageUrl}
                    alt={prize.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{prize.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{prize.description}</p>
                <Badge>{prize.quantity} available</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {winners.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-8">Winners</h2>
            <Card className="mt-4">
              <CardContent className="pt-6">
                <ul>
                  {winners.map(entry => (
                    <li key={entry.id} className="flex justify-between items-center p-2 border-b">
                      <span>{entry.user.name}</span>
                      <Badge variant="secondary">{entry.user.email}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
