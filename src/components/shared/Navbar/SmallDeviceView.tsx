"use client";;
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TableOfContents } from "lucide-react";
import { SheetContentContainer } from "./SmallDeviceSheetContentComponents/SheetContentContainer";
import { useState } from "react";

const SmallDeviceView = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden block ">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <TableOfContents size={25} />
        </SheetTrigger>
        <SheetContent className="pt-10 w-full">
          <SheetContentContainer open={open} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SmallDeviceView;
