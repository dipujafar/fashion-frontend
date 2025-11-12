import { Badge } from "./BadgesItems"


export interface BadgeData {
  id: string
  title: string
  description: string
  icon: string
  category: "general" | "eco" | "charity"
  progress?: {
    current: number
    total: number
  }
}

interface BadgeGridProps {
  badges: BadgeData[]
  title?: string
}

export function BadgeGrid({ badges, title }: BadgeGridProps) {
  return (
    <div className="w-full space-y-6">
      {title && <h2 className="text-2xl font-bold text-foreground">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <Badge key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  )
}
