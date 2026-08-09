"use client";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const PhoneInput = React.forwardRef(
  //@ts-ignore
  ({ className, onChange, ...props }, ref) => {
    return (
      <RPNInput.default
        //@ts-ignore
        ref={ref}
        className={cn("flex cursor-pointer", className)}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        onChange={(value) => onChange?.(value || "")}
        {...props}
      />
    );
  }
);
PhoneInput.displayName = "PhoneInput";

//@ts-ignore
const InputComponent = React.forwardRef(({ className, ...props }, ref) => (
  <Input
    className={cn(
      "bg-white border-[#e1e1e1] md:py-5 rounded rounded-l-none shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3",
      className
    )}
    {...props}
    //@ts-ignore
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

//@ts-ignore
const CountrySelect = ({ disabled = false, value, onChange, options }) => {
  const handleSelect = React.useCallback(
    //@ts-ignore
    (country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn(
            "flex gap-1 rounded-e-none rounded-s-sm border border-primary-black/10 px-3 md:py-5 bg-[#F5F5F5]"
          )}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDown
            className={cn(
              "-mr-2 h-6 w-6 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[300px] p-0">
        <Command>
          <CommandList>
            <ScrollArea className="h-72">
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="p-0">
                {options
                  //@ts-ignore
                  .filter((x) => x.value)
                  //@ts-ignore
                  .map((option) => (
                    <CommandItem
                      className="gap-2 cursor-pointer rounded-none py-2"
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className="flex-1 text-sm">{option.label}</span>
                      {option.value && (
                        <span className="text-sm text-foreground/50">
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// @ts-ignore
const FlagComponent = ({ country, countryName }) => {
  // @ts-ignore
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-4 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };
