"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const ratingVariants = cva(
  "flex items-center space-x-1" // Base class for rating stars
);

interface RatingProps extends VariantProps<typeof ratingVariants> {
  rating: number; // The rating value (can be decimal, e.g., 4.5)
  className?: string; // Optional className for additional styling
  size?: number; // Optional size for stars (default is 20)
}

const Rating = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & RatingProps
>(({ rating, className, size = 20, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(ratingVariants(), className)} {...props}>
      {[...Array(5)].map((_, index) => {
        // Calculate the fill percentage for this star
        const fillPercentage = Math.max(0, Math.min(1, rating - index));

        return (
          <span key={index} className="relative inline-block">
            {/* Background star (empty) */}
            <Star
              size={size}
              className="text-gray-400"
              fill="none"
              stroke="currentColor"
            />

            {/* Foreground star (filled) with width based on fill percentage */}
            {fillPercentage > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage * 100}%` }}
              >
                <Star
                  size={size}
                  className="text-[#F7B814]"
                  fill="currentColor"
                  stroke="currentColor"
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
});

Rating.displayName = "Rating";

export { Rating };
