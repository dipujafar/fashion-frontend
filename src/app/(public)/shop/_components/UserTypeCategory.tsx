"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "charity",
    label: "Charity",
  },
  {
    value: "charity_store",
    label: "Charity Store",
  },
  {
    value: "eco_friendly_stores",
    label: "Eco-Friendly Stores",
  },
  {
    value: "influencer",
    label: "Influencer",
  },
  {
    value: "ambassadors",
    label: "Ambassadors",
  },
  {
    value: "professional_seller",
    label: "Professional Seller",
  },
  {
    value: "individual_seller",
    label: "Individual Seller",
  },
];

export function UserTypeCategory() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="lg:w-[200px] justify-between border-none bg-primary-light-pink"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.09)" }}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "User Type"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[200px] p-0 mt-2">
        <Command className="bg-primary-light-pink">
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
