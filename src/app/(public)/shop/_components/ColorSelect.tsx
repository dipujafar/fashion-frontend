"use client"
import React, { useCallback, useState } from 'react'
import { ChevronDown, Search, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox"
import { colors } from '@/components/shared/UserProfile/AddProduct/schema';

export default function ColorSelect() {

    const searchParams = useSearchParams()

    const router = useRouter();

    const pathname = usePathname();
    const selectedColors = searchParams.get("color")?.split(",") || [];

    // search state
    const [query, setQuery] = useState("");

    const updateQueryParam = useCallback(
        (key: string, value: string, targetId?: string) => {
            const currentValues = searchParams.get(key)?.split(",") || [];

            let newValues: string[];
            if (currentValues.includes(value)) {
                newValues = currentValues.filter((v) => v !== value);
            } else {
                newValues = [...currentValues, value];
            }

            const params = new URLSearchParams(searchParams.toString());
            if (newValues.length > 0) {
                params.set(key, newValues.join(","));
            } else {
                params.delete(key);
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });

            // optional scroll to element
            setTimeout(() => {
                if (targetId) {
                    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                }
            }, 50);

        },
        [searchParams, router]
    );

    const handleSelect = (color: string) => {
        updateQueryParam("color", color)
    }

    const isColorSelected = selectedColors.length > 0;


    // filter colors by the search query (case-insensitive)
    const filteredColors = colors?.filter((option) =>
        option?.name?.toLowerCase().includes(query.trim().toLowerCase())
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={cn("justify-between hover:bg-zinc-50 duration-150 border border-gray-300 shadow-none cursor-pointer rounded px-2.5 h-8", isColorSelected && "border-gray-700")}>
                    <span className="flex items-center gap-2">
                        <span className={cn("text-foreground text-base font-normal", isColorSelected && "font-semibold")}>Color</span>
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 rounded-none w-60 max-h-96 overflow-y-auto" align='start'>

                <>

                    <div className="flex items-center gap-2 bg-white border-b px-3 border-gray-300 hover:bg-zinc-100">
                        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Find a color"
                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground py-3"
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        {query && (
                            <button
                                type="button"
                                className="cursor-pointer"
                                onClick={() => setQuery("")}
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        )}
                    </div>

                    {filteredColors?.length ? (
                        filteredColors.map((option) => {
                            const isChecked = selectedColors.includes(option.name);
                            const color = option;

                            return (
                                <div key={option.name} onClick={() => handleSelect(option.name)} className="p-0 border-b border-gray-200 last:border-b-0">
                                    <button
                                        className="w-full flex items-center justify-between p-3 hover:bg-accent transition-colors text-left cursor-pointer"
                                    >

                                        <div className='flex flex-row items-center gap-x-2'>
                                            <div
                                                className="size-6 rounded-full border border-border "
                                                style={{
                                                    background:
                                                        color.name === "Multi"
                                                            ? "linear-gradient(90deg, #FF0000, #00FF00, #0000FF)"
                                                            : color.hex,
                                                    border:
                                                        color.name === "White" ||
                                                            color.name === "Clear"
                                                            ? "1px solid #e5e5e5"
                                                            : "none",
                                                }}
                                            />

                                            <span className="text-sm font-medium">{option?.name}</span>
                                        </div>

                                        <Checkbox className='rounded-xs border-gray-500 data-[state=checked]:text-white' checked={isChecked} />
                                    </button>
                                </div>
                            )
                        })
                    ) : (
                        <div className="p-3 text-sm text-muted-foreground text-center">
                            No colors found
                        </div>
                    )}

                </>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}