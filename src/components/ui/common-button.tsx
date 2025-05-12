import { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import AnimatedArrow from "../animatedArrows/AnimatedArrow";

const CommonButton = ({
  children,
  className,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <Button
      disabled={disabled}
      className={cn(
        "rounded  uppercase md:min-w-40 md:py-5 cursor-pointer bg-black hover:bg-black/90 group ",
        className
      )}
    >
      {children} <AnimatedArrow></AnimatedArrow>
    </Button>
  );
};

export default CommonButton;
