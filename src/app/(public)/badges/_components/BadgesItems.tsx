import { BadgeData } from "./BadgeCard"


interface BadgeProps {
  badge: BadgeData
}

export function Badge({ badge }: BadgeProps) {
  const getBorderColor = (category: string) => {
    switch (category) {
      case "eco":
        return "border-foreground"
      case "charity":
        return "border-foreground"
      default:
        return "border-foreground"
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-lg border-2 border-foreground bg-background hover:bg-muted transition-colors">
      {/* Badge Icon Circle */}
      <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-2xl flex-shrink-0">
        {badge.icon}
      </div>

      {/* Badge Title */}
      <h3 className="font-bold text-foreground text-center text-sm">{badge.title}</h3>

      {/* Badge Description */}
      <p className="text-xs text-muted-foreground text-center">{badge.description}</p>

      {/* Progress Bar (if applicable) */}
      {badge.progress && (
        <div className="w-full mt-2 space-y-1">
          <div className="w-full bg-muted rounded-full h-1.5 border border-foreground">
            <div
              className="bg-foreground h-1.5 rounded-full transition-all"
              style={{
                width: `${Math.min((badge.progress.current / badge.progress.total) * 100, 100)}%`,
              }}
            />
          </div>
          <p className="text-xs font-medium text-foreground text-center">
            {badge.progress.current} / {badge.progress.total}
          </p>
        </div>
      )}
    </div>
  )
}
