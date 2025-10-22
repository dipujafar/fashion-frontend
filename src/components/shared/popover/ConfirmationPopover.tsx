import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2 } from "lucide-react";
import React from "react";

type TProps = {
  title: string;
  handleConfirm: () => void;
  children?: React.ReactNode;
};

export default function ConfirmationPopover({
  title,
  handleConfirm,
  children,
}: TProps) {
  return (
    <Popover>
      <PopoverTrigger>
        {children ? (
          children
        ) : (
          <button className="text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={() => handleConfirm()} size={"sm"} className="">
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
