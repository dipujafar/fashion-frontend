"use client";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarDays, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function UploadProductDataFilterOptionAndNav({
  user,
  baseLink,
}: {
  user: string;
  baseLink: string;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const pathLocation = usePathname();
  const currentPath = pathLocation?.split("/");
  return (
    <div>
      {/* ------------------- filter and navigate section ------------------ */}
      <div className={cn("mb-4 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 md:gap-4 gap-2", user === "charity store" && "md:grid-cols-3")}>
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search here...."
            className="pl-10 bg-black/5 py-5"
          />
        </div>
        <div>
          <Popover>
            <PopoverTrigger className="w-full text-start">
              <div className="p-2 bg-black/5 rounded-lg border flex  justify-between ">
                <p className="text-[#8A8A8A]">Filter by date</p>
                <CalendarDays size={20} color="#8A8A8A" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className=""
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>
        <Link href={`${baseLink}`}>
          <div
            className={cn(
              "p-2 bg-black/5 rounded-lg text-[#8A8A8A]",
              pathLocation === baseLink && "bg-black text-white"
            )}
          >
            <p> My listings</p>
          </div>
        </Link>
        <Link href={`${baseLink}/sale`}>
          <div
            className={cn(
              "p-2 bg-black/5 rounded-lg text-[#8A8A8A]",
              currentPath?.includes("sale") && "bg-black text-white"
            )}
          >
            <p>Sale</p>
          </div>
        </Link>
      { user !== "charity store" &&  <Link href={`${baseLink}/purchase-product`}>
          <div
            className={cn(
              "p-2 bg-black/5 rounded-lg text-[#8A8A8A]",
              currentPath?.includes("purchase-product") && "bg-black text-white"
            )}
          >
            <p>Purchase</p>
          </div>
        </Link>}
      </div>
    </div>
  );
}
