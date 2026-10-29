"use client";

import React, { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { countries } from "@/utils/constant";
import Flag from "@/components/shared/Flag";

interface RegistrationCountryFieldProps {
  control: any;
  name?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export default function RegistrationCountryField({
  control,
  name = "registrationCountry",
  label = "Registration Country",
  required = false,
  placeholder = "Select registration country",
}: RegistrationCountryFieldProps) {
  const anchor = useComboboxAnchor();
  const countryValue = useWatch({ control, name });

  const selectedCountry = useMemo(
    () =>
      countries.find(
        (c) => c.name === countryValue || c.code === countryValue
      ),
    [countryValue]
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-gray-900">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Combobox
              items={countries}
              value={selectedCountry?.name || field.value || ""}
              onValueChange={(val) => field.onChange(val || "")}
            >
              <div ref={anchor} className="relative">
                {selectedCountry && (
                  <Flag
                    code={selectedCountry.code}
                    name={selectedCountry.name}
                    className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2"
                  />
                )}
                <ComboboxInput
                  placeholder={placeholder}
                  className={cn(
                    "bg-white border-[#e1e1e1] rounded shadow-none !py-5 !text-base px-3.5",
                    "focus:ring-0 focus:border has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-primary-black",
                    selectedCountry && "pl-9"
                  )}
                />
              </div>

              <ComboboxContent anchor={anchor} className="rounded-none">
                <ComboboxEmpty>No countries found.</ComboboxEmpty>
                <ComboboxList>
                  {(country) => (
                    <ComboboxItem
                      key={`${country.code}-${country.name}`}
                      value={country.name}
                      className="cursor-pointer py-2.5 rounded-none hover:bg-zinc-100 border-b border-b-gray-200 flex flex-row gap-x-2 items-center px-3 text-sm md:text-base"
                    >
                      <Flag code={country.code} name={country.name} />
                      {country.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

