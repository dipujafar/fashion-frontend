import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "./calendar";

export default function DateSelector({
  date,
  setDate,
  className,
  title = "Filter by date",
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  className?: string;
  title?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger className="w-full text-start shadow-lg">
        <div className="p-2 bg-black/5 rounded-lg border flex  justify-between ">
          <p className="text-[#8A8A8A]">{title}</p>
          <CalendarDays size={20} color="#8A8A8A" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className={className}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
