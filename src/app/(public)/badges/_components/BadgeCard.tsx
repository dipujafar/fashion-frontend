"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "./data"


interface BadgeCardProps {
  badge: Badge
}

const EARNED_BADGE_IDS = ["style-starter", "first-purchase"] // Demo: earned badges

export function BadgeCard({ badge }: BadgeCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isEarned = EARNED_BADGE_IDS.includes(badge.id)

  const badgeColors: Record<string, string> = {
    "style-starter": "from-emerald-400 to-emerald-600",
    "first-purchase": "from-coral-400 to-coral-600",
    "first-sale": "from-teal-400 to-teal-600",
    "tree-planter": "from-green-400 to-green-600",
    "clothing-donor": "from-blue-400 to-blue-600",
    "money-donor": "from-yellow-400 to-yellow-600",
    "eco-hero": "from-purple-400 to-purple-600",
    "frequent-seller": "from-pink-400 to-pink-600",
    "top-buyer": "from-indigo-400 to-indigo-600",
    "speedy-shipper": "from-orange-400 to-orange-600",
    "fashion-activist": "from-amber-300 via-amber-400 to-amber-500",
  }

  const colorClass = badgeColors[badge.id] || "from-teal-400 to-teal-600"

  return (
    <Card
      className={`relative flex flex-col items-center justify-center p-2 md:p-8 rounded-2xl transition-all duration-300 cursor-pointer ${
        isEarned
          ? "border-2 border-black shadow-lg hover:shadow-xl hover:scale-105"
          : "border border-gray-300 opacity-60 hover:opacity-75"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center md:mb-4 transition-all duration-300 ${
          isEarned ? `bg-gradient-to-br ${colorClass}` : "bg-gray-300"
        }`}
      >
        <span className="text-4xl md:text-5xl">{badge.icon}</span>
      </div>

      <h3 className="text-center font-bold text-foreground text-base md:text-lg mb-2 text-balance">{badge.name}</h3>

      <p className="text-center text-muted-foreground text-sm leading-relaxed mb-2 md:mb-4">{badge.description}</p>

      {!isEarned && (
        
        <div className="text-center text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg">
          <p className="font-medium">Unlock by:</p>
          <p className="mt-1">{badge.trigger}</p>
        </div>
      )}

      {isEarned && (
        <div className="text-center">
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
            ✓ Earned
          </span>
        </div>
      )}
    </Card>
  )
}
