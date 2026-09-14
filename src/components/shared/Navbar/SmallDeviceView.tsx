"use client";;
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SheetContentContainer } from "./SmallDeviceSheetContentComponents/SheetContentContainer";
import { useState } from "react";
import { User } from "lucide-react";

const SmallDeviceView = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden block ">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <User size={22} />
        </SheetTrigger>
        <SheetContent className="pt-10 w-[82%] ">
          <SheetContentContainer open={open} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SmallDeviceView;
