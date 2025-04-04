import { Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function RaffleCard({ entries }) {
  return (
    <Card className="p-6 bg-blue-50 border-blue-100">
      <div className="flex items-center gap-3">
        <Award className="h-10 w-10 text-blue-500" />
        <div>
          <h3 className="font-medium">STEM Center Raffle</h3>
          <p className="text-sm text-gray-600">Upload notes to earn entries!</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Your entries: <span className="font-bold">{entries}</span>
        </p>
        <p className="text-xs text-gray-500 mt-2">Next drawing: April 15, 2025</p>
      </div>
      <Button className="w-full mt-4">View Prizes</Button>
    </Card>
  )
}

