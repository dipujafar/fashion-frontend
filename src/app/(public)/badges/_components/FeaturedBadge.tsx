interface FeaturedBadgeProps {
  icon: string
  title: string
  description: string
  subtitle?: string
}

export function FeaturedBadge({ icon, title, description, subtitle }: FeaturedBadgeProps) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="rounded-3xl border-4 border-foreground bg-background p-6 space-y-4">
        {/* Icon Circle */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-foreground flex items-center justify-center text-5xl">{icon}</div>
        </div>

        {/* Text Content */}
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-sm font-semibold text-foreground">{subtitle}</p>}
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
