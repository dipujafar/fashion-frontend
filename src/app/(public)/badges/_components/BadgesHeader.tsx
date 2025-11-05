"use client"

const TOTAL_BADGES = 11
const EARNED_BADGES = 2 

export function BadgesHeader() {
  const progress = (EARNED_BADGES / TOTAL_BADGES) * 100

  return (
    <div className="mb-5 md:mb-10">
      <div className="flex items-baseline gap-2 mb-2">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Badges</h1>
        {/* <p className="text-lg md:text-xl text-muted-foreground">
          {EARNED_BADGES} of {TOTAL_BADGES} Earned
        </p> */}
      </div>

      <p className="text-muted-foreground mb-6 text-base">
        Unlock badges by completing sustainable fashion actions on Fashi-ON
      </p>

      {/* <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #34C1B2 0%, #2EA48F 100%)",
          }}
        />
      </div> */}
    </div>
  )
}
