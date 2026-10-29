import React from "react";
import { type LucideIcon } from "lucide-react";

interface EmptyContributionStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function EmptyContributionState({
  icon: Icon,
  title,
  description,
}: EmptyContributionStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6 rounded-xl border border-dashed border-gray-200 bg-zinc-50/50">
      <div className="size-16 rounded-full bg-green-600/10 text-green-800 flex items-center justify-center mb-4">
        <Icon className="size-8" strokeWidth={1.75} />
      </div>
      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5">
        {title}
      </h4>
      <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default EmptyContributionState;

