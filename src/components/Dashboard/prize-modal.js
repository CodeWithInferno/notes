"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Award, Gift, Users, Calendar, MapPin } from "lucide-react"

export default function ViewPrizesModal() {
  const [raffles, setRaffles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const res = await fetch("/api/raffle/get-prizes")
        const data = await res.json()
        if (res.ok) setRaffles(data.raffles)
        else console.error("Fetch error:", data.error)
      } catch (err) {
        console.error("Server error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPrizes()
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm border-0 transition-colors duration-200">
          <Award className="w-4 h-4 mr-2" />
          View Available Prizes
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-white">
        <div className="overflow-y-auto max-h-[85vh]">
          <DialogHeader className="border-b border-gray-200 pb-6 mb-6">
            <div className="text-center space-y-3">
              <DialogTitle className="text-3xl font-bold text-gray-900">Prize Information</DialogTitle>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore the prizes available in our university raffle program. All proceeds support student initiatives
                and campus improvements.
              </p>
            </div>
          </DialogHeader>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Loading prize information...</p>
            </div>
          ) : (
            <div className="space-y-10">
              {raffles.map((raffle, raffleIndex) => (
                <div key={raffle.id} className="space-y-6">
                  {/* Raffle Header */}
                  <div className="text-center pb-4 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{raffle.title}</h2>
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Active Campaign</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Open to All Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Campus Wide</span>
                      </div>
                    </div>
                  </div>

                  {raffle.prizes.length === 0 ? (
                    <Card className="p-12 text-center bg-gray-50 border border-gray-200">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Gift className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Prizes Coming Soon</h3>
                      <p className="text-gray-600">
                        Prize details for this raffle will be announced shortly. Please check back for updates.
                      </p>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {raffle.prizes.map((prize, prizeIndex) => (
                        <Card
                          key={prize.id}
                          className="group bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                          {/* Prize Rank */}
                          <div className="absolute top-4 right-4 z-10">
                            <Badge className="bg-blue-100 text-blue-800 font-semibold">Prize #{prizeIndex + 1}</Badge>
                          </div>

                          {/* Prize Image */}
                          <div className="relative w-full h-48 bg-gray-100">
                            {prize.image_url ? (
                              <Image
                                src={prize.image_url || "/placeholder.svg"}
                                alt={prize.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Gift className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* Prize Content */}
                          <div className="p-6 space-y-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{prize.name}</h3>
                              {prize.description && (
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                  {prize.description}
                                </p>
                              )}
                            </div>

                            {/* Prize Details */}
                            {(prize.size || prize.color) && (
                              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                                {prize.size && (
                                  <Badge variant="outline" className="text-xs font-normal">
                                    Size: {prize.size}
                                  </Badge>
                                )}
                                {prize.color && (
                                  <Badge variant="outline" className="text-xs font-normal">
                                    Color: {prize.color}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <div className="bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">University Raffle Program</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                This raffle is organized by the Student Activities Office to support campus initiatives. All
                participants must be current students, faculty, or staff members. Winners will be contacted via their
                official university email address.
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                <span>• Fair & Transparent Process</span>
                <span>• Official University Program</span>
                <span>• Supporting Student Life</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
