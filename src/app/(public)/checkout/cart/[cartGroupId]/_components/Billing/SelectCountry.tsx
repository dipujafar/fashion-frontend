"use client"
import React from 'react'

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
} from "@/components/ui/combobox"
import { countries } from '@/utils/constant';


function SelectCountry({
    control,
    setValue,
}: any) {

    return (
        <div>
            <FormField
                control={control}
                name="country"
                render={({ field }) => {

                    const selectedCountry = countries.find(
                        (country) => country.name === field.value
                    );

                    setValue("countryCode", selectedCountry?.code || "");

                    return <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Combobox
                                items={countries}
                                value={selectedCountry?.name || ""}
                                onValueChange={(country) => {
                                    field.onChange(country || "");
                                }}
                            >
                                <ComboboxInput placeholder="Select a country" className={"bg-white border-[#e1e1e1] md:py-5 rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 focus:border has-[[data-slot=input-group-control]:focus-visible]:border-primary-black text-lg md:text-base py-5"} />
                                <ComboboxContent className="rounded-none p-0">
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList className={""}>
                                        {(country) => (
                                            <ComboboxItem
                                                key={`${country?.code} ${country?.name}`}
                                                value={country?.name}
                                                className="cursor-pointer py-2.5 rounded-none hover:bg-zinc-100 border-b border-b-gray-200"
                                            >
                                                {country?.name}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                }
                }
            />


        </div>
    )
}

export default SelectCountry