"use client"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Award } from "lucide-react"

export default function RaffleHighlightCard() {
  const [activeRaffle, setActiveRaffle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActiveRaffle = async () => {
      try {
        const res = await fetch("/api/raffles?status=active")
        const data = await res.json()
        if (data.raffles && data.raffles.length > 0) {
          setActiveRaffle(data.raffles[0])
        }
      } catch (error) {
        console.error("Failed to fetch active raffle", error)
      } finally {
        setLoading(false)
      }
    }
    fetchActiveRaffle()
  }, [])

  if (loading) {
    return (
      <Card className="p-6">
        <p>Loading raffles...</p>
      </Card>
    )
  }

  if (!activeRaffle) {
    return (
       <Card className="p-6 bg-secondary/10 border-border">
        <div className="flex items-center gap-3">
            <Award className="h-10 w-10 text-secondary" />
            <div>
                <h3 className="font-medium">No Active Raffles</h3>
                <p className="text-sm text-muted-foreground">Check back later for new events!</p>
            </div>
        </div>
         <div className="w-full mt-4">
            <Link href="/raffles" passHref>
                <Button className="w-full">View Past Raffles</Button>
            </Link>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-secondary/10 border-border">
       <div className="flex items-center gap-3">
        <Award className="h-10 w-10 text-secondary" />
        <div>
            <h3 className="font-medium">{activeRaffle.title}</h3>
            <p className="text-sm text-muted-foreground">A new raffle is underway!</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          Prizes include: {activeRaffle.raffle_prizes.slice(0, 2).map(p => p.name).join(', ')}...
        </p>
      </div>
      <div className="w-full mt-4">
        <Link href="/raffles" passHref>
          <Button className="w-full">View All Raffles & Prizes</Button>
        </Link>
      </div>
    </Card>
  )
}
