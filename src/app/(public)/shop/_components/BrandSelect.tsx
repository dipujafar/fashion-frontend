"use client"
import { useGetBrandsQuery } from '@/redux/api/brand.api';
import React, { useCallback, useState } from 'react'
import { ChevronDown, Search, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from '@/components/ui/skeleton';

export default function BrandSelect() {

    const searchParams = useSearchParams()

    const categoryId = searchParams.get("category")

    const { data: brands, isLoading, isError } = useGetBrandsQuery({ categoryId });

    const selectedBrands = searchParams.get("brand")?.split(",") || [];

    const router = useRouter();

    const pathname = usePathname();

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

    const handleSelect = (brand: string) => {
        updateQueryParam("brand", brand)
    }

    const isbrandSelected = selectedBrands.length > 0;

    // filter brands by the search query (case-insensitive)
    const filteredBrands = brands?.data?.filter((option) =>
        option?.name?.toLowerCase().includes(query.trim().toLowerCase())
    );

    if (isLoading) {
        return (
            <Skeleton className="h-8 w-24" />
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={cn("justify-between hover:bg-zinc-50 duration-150 border border-gray-300 shadow-none cursor-pointer rounded px-2.5 h-8", isbrandSelected && "border-gray-700")}>
                    <span className="flex items-center gap-2">
                        <span className={cn("text-foreground text-base font-normal", isbrandSelected && "font-semibold")}>Brand</span>
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 rounded-none w-56" align='start'>

                <div className="flex items-center gap-2 bg-white px-3 py-3 border-b border-gray-300 focus-visible:bg-zinc-50">
                    <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find a brand"
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
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

                {filteredBrands?.length ? (
                    filteredBrands.map((option) => {
                        const isChecked = selectedBrands.includes(option.id);

                        return (
                            <div key={option.id} onClick={() => handleSelect(option.id)} className="p-0 border-b border-gray-200 last:border-b-0">
                                <button
                                    className="w-full flex items-center justify-between p-3 hover:bg-accent transition-colors text-left cursor-pointer"
                                >
                                    <span className="text-sm font-medium">{option?.name}</span>
                                    <Checkbox className='rounded border-gray-500 data-[state=checked]:text-white' checked={isChecked} />
                                </button>
                            </div>
                        )
                    })
                ) : (
                    <div className="p-3 text-sm text-muted-foreground text-center">
                        No brands found
                    </div>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}