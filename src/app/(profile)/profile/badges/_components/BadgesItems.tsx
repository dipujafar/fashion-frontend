import { IBadge } from "@/types";
import Image from "next/image";


export function Badge({ badge }: { badge: IBadge }) {

  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-foreground bg-background hover:bg-muted transition-colors">

      <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center text-2xl flex-shrink-0">
        <Image src={badge?.icon} alt={badge?.name} width={64} height={64} className="h-7 w-7" />
      </div>

      {/* Badge Title */}
      <h3 className="font-bold text-foreground text-center text-sm">{badge?.name}</h3>

      {/* Badge Description */}
      <p className="text-xs text-muted-foreground text-center">{badge?.description}</p>

      {/* Progress Bar (if applicable) */}

      <div className="w-full mt-2 space-y-1">
        <div className="w-full bg-muted rounded-full h-1.5 border border-foreground">
          <div
            className="bg-foreground h-1.5 rounded-full transition-all"
            style={{
              width: `${Math.min((badge?.progress / badge.target) * 100, 100)}%`,
            }}
          />
        </div>
        <p className="text-xs font-medium text-foreground text-center">
          {badge.progress} / {badge.target}
        </p>
      </div>

    </div>
  )
}
