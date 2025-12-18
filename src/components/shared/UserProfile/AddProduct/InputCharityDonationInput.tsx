"use client";;
import React from "react";
import { PlusCircle, ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectDonationOption from "./SelectDonationOption";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";



const charities = [
  { value: "save_the_children", label: "Save the Children" },
  { value: "plant_more_trees", label: "Plant More Trees" },
  { value: "women_for_women_international", label: "Women for Women International" },
];

export default function InputCharityDonationInput({
    form,
    fields,
    append,
    remove,
}: any) {
    return (
        <>
            {fields.map((field: any, index: number) => (
                <div
                    key={field.id}
                    className="grid grid-cols-2 md:gap-4 gap-x-2"
                >
                    {/* Charity Select */}
                    <FormField
                        control={form.control}
                        name={`donations.${index}.donateToCharity`}
                        render={({ field }) => {
                            const [open, setOpen] = React.useState(false);

                            return (
                                <FormItem>
                                    <FormLabel>
                                        Donate to charity <span className="text-xs"> (Minimum 5% donation required) </span><SelectDonationOption />
                                    </FormLabel>

                                    <Popover open={open} onOpenChange={setOpen} >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full justify-between bg-[#f2f2f2] md:py-5"
                                                >
                                                    {field.value
                                                        ? charities.find(
                                                            (charity) => charity.value === field.value
                                                        )?.label
                                                        : (
                                                            <span className="text-muted-foreground">
                                                                Select charity
                                                            </span>
                                                        )}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-full p-0">
                                            <Command >
                                                <CommandInput placeholder="Search charities..." />
                                                <CommandList>
                                                    <CommandEmpty>No charity found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {charities.map((charity) => (
                                                            <CommandItem
                                                                key={charity.value}
                                                                value={charity.value}
                                                                onSelect={(value) => {
                                                                    field.onChange(value);
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value === charity.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {charity.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    {/* Donation Amount */}
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name={`donations.${index}.donationAmount`}
                            render={({ field }) => (
                                <FormItem className="flex-1 mt-2">
                                    <FormLabel>Amount (%)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter Amount (%)"
                                            {...field}
                                            className="bg-[#f2f2f2] md:py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Remove button */}
                        {index > 0 && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="self-end -translate-y-1 "
                                onClick={() => remove(index)}
                            >
                                ✕
                            </Button>
                        )}
                    </div>
                </div>
            ))}

            {/* Add More Button */}
            <Button
                type="button"
                variant="secondary"
                onClick={() =>
                    append({ donateToCharity: "", donationAmount: 0 })
                }
                className="font-medium rounded-none border-b-2 border-r-2 border-black cursor-pointer"
            >
                <PlusCircle /> Add More
            </Button>

        </>
    )
}
