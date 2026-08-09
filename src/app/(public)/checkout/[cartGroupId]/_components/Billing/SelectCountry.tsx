"use client"
import React, { useEffect, useMemo, useState } from 'react'

import {
    Form,
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


function SelectCountry({
    control
}: any) {

    const [countries, setCountries] = useState<{ name: string, code: string }[]>([]);

    useEffect(() => {
        fetch("/data/countries.json")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
            });
    }, []);

    // -------- Keep data memoized to load once ------------ //
    const memoizedAllCountries = useMemo<any>(() => countries, [countries]);

    return (
        <div>
            <FormField
                control={control}
                name="country"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Combobox
                                items={memoizedAllCountries}
                                value={field.value || ""}
                                onValueChange={(countryName) => {
                                    field.onChange(countryName || "");
                                }}
                            >
                                <ComboboxInput placeholder="Select a country" className={"bg-white border-[#e1e1e1] md:py-5 rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 focus:border-1 has-[[data-slot=input-group-control]:focus-visible]:border-primary-black text-lg md:text-base py-5"} />
                                <ComboboxContent className="rounded-none p-0">
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList className={"max-h-[300px] overflow-y-auto "}>
                                        {(country) => (
                                            <ComboboxItem
                                                key={country?.code ?? country?.name}
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
                )}
            />


        </div>
    )
}

export default SelectCountry