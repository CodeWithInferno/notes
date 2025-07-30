"use client"
import { useState, useEffect } from "react"
import Header from "@/components/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function RaffleCard({ raffle }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{raffle.title}</CardTitle>
        <CardDescription>{raffle.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {raffle.raffle_prizes.length} prize(s) available.
        </p>
        <p>
          {raffle._count.entries} entries so far.
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/raffles/${raffle.id}`} passHref>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function RafflesPage() {
  const [raffles, setRaffles] = useState({ active: [], upcoming: [], past: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRaffles = async (status) => {
      const res = await fetch(`/api/raffles?status=${status}`)
      const data = await res.json()
      return data.raffles || []
    }

    const loadAll = async () => {
      setLoading(true)
      const [active, upcoming, past] = await Promise.all([
        fetchRaffles("active"),
        fetchRaffles("upcoming"),
        fetchRaffles("past"),
      ])
      setRaffles({ active, upcoming, past })
      setLoading(false)
    }

    loadAll()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Raffles</h1>
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {raffles.active.map((raffle) => (
                <RaffleCard key={raffle.id} raffle={raffle} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {raffles.upcoming.map((raffle) => (
                <RaffleCard key={raffle.id} raffle={raffle} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {raffles.past.map((raffle) => (
                <RaffleCard key={raffle.id} raffle={raffle} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
