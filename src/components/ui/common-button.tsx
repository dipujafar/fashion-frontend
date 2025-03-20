import { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const CommonButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Button
      className={cn(
        "rounded border-r-3 border-b-3 border-primary-red uppercase md:min-w-40 md:py-5 cursor-pointer hover:bg-primary-light-pink hover:text-primary-black ",
        className
      )}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
