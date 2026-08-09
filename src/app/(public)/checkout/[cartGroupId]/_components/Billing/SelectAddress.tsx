"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

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

interface PlacePrediction {
    description: string;
    place_id: string;
}

function SelectAddress({ control, setValue }: any) {
    const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
    const [inputValue, setInputValue] = useState("");

    const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Initialize Google services once the script/API is available
    useEffect(() => {
        if (typeof window !== "undefined" && window.google?.maps?.places) {
            autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
            // PlacesService needs a DOM node or map instance; a detached div works for details lookups
            placesServiceRef.current = new window.google.maps.places.PlacesService(
                document.createElement("div")
            );
        }
    }, []);

    const fetchPredictions = (input: string) => {
        if (!input || !autocompleteServiceRef.current) {
            setPredictions([]);
            return;
        }
        autocompleteServiceRef.current.getPlacePredictions(
            { input },
            (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                    setPredictions(
                        results.map((r) => ({
                            description: r.description,
                            place_id: r.place_id,
                        }))
                    );
                } else {
                    setPredictions([]);
                }
            }
        );
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchPredictions(value), 250);
    };

    const handleSelectPlace = (placeId: string, description: string, fieldOnChange: (v: string) => void) => {
        fieldOnChange(description);
        setInputValue(description);

        if (!placesServiceRef.current) return;

        placesServiceRef.current.getDetails(
            {
                placeId,
                fields: ["formatted_address", "geometry", "address_components"],
            },
            (place, status) => {
                if (status !== window.google.maps.places.PlacesServiceStatus.OK || !place) return;

                const components = place.address_components ?? [];
                const getComponent = (type: string) =>
                    components.find((c) => c.types.includes(type))?.long_name ?? "";

                setValue("city", getComponent("locality"));
                setValue("state", getComponent("administrative_area_level_1"));
                setValue("zipCode", getComponent("postal_code"));
                setValue("country", getComponent("country"));
            }
        );
    };

    const comboboxItems = useMemo(
        () => predictions.map((p) => ({ name: p.description, code: p.place_id })),
        [predictions]
    );

    return (
        <FormField
            control={control}
            name="streetAddress"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                        <Combobox
                            items={comboboxItems}
                            value={field.value || ""}
                            onValueChange={(description) => {
                                setInputValue(description);
                                const match = predictions.find((p) => p.description === description);
                                if (match) {
                                    handleSelectPlace(match.place_id, match.description, field.onChange);
                                } else {
                                    field.onChange(description ?? "");
                                    handleInputChange(description ?? "");
                                }
                            }}
                        >
                            <ComboboxInput
                                placeholder="Enter your address"
                                className="bg-white border-[#e1e1e1] md:py-5 rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black text-lg md:text-base py-5"
                            />
                            <ComboboxContent className="rounded-none p-0">
                                <ComboboxEmpty>No addresses found.</ComboboxEmpty>
                                <ComboboxList className="max-h-[300px] overflow-y-auto">
                                    {(item: { name: string; code: string }) => (
                                        <ComboboxItem
                                            key={item.code}
                                            value={item.name}
                                            className="cursor-pointer py-2.5 rounded-none hover:bg-zinc-100 border-b border-b-gray-200"
                                        >
                                            {item.name}
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

export default SelectAddress;