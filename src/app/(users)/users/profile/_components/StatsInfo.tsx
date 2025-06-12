import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function StatsInfo() {
  return (
    <Card style={{boxShadow: "1px 4px 10px 0px rgba(0, 0, 0, 0.15)"}} className="w-full  p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* First Row */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <p className="text-2xl font-medium">20+</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Donations Raised</p>
          <p className="text-2xl font-medium">$5.00</p>
        </div>

        {/* Second Row */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Followers</p>
          <p className="text-2xl font-medium">12k+</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Following</p>
          <p className="text-2xl font-medium">24</p>
        </div>

        {/* Third Row */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Item Sold</p>
          <p className="text-2xl font-medium">100</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Rating & Review</p>
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <p className="text-2xl font-medium">4.9</p>
            <p className="text-sm text-muted-foreground">(12 Reviews)</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
