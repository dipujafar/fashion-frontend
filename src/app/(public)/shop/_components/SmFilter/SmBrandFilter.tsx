"use client"
import { useGetBrandsQuery } from '@/redux/api/brand.api';
import React, { useCallback, useState } from 'react'
import {  Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

export default function SmBrandFilter({ categoryId }: { categoryId?: string }) {

    const searchParams = useSearchParams()

    const { data: brands, isLoading, isError, isSuccess } = useGetBrandsQuery({ categoryId });

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

    // filter brands by the search query (case-insensitive)
    const filteredBrands = brands?.data?.filter((option) =>
        option?.name?.toLowerCase().includes(query.trim().toLowerCase())
    );

    return (
        <>

            {isLoading ? <div className="flex-center h-24 lg:h-32">
                <span className="loaderDark !w-10"> </span>
            </div> : isSuccess ? <>

                <div className="flex items-center gap-2 bg-white border-b px-3 border-gray-300 hover:bg-zinc-100">
                    <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find a brand"
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

                {filteredBrands?.length ? (
                    filteredBrands.map((option) => {
                        const isChecked = selectedBrands.includes(option.id);

                        return (
                            <div key={option.id} onClick={() => handleSelect(option.id)} className="p-0 border-b border-gray-200 last:border-b-0">
                                <button
                                    className="w-full flex items-center justify-between p-3 hover:bg-accent transition-colors text-left cursor-pointer"
                                >
                                    <span className="text-sm font-medium">{option?.name}</span>
                                    <Checkbox className='rounded-xs border-gray-500 data-[state=checked]:text-white' checked={isChecked} />
                                </button>
                            </div>
                        )
                    })
                ) : (
                    <div className="p-3 text-sm text-muted-foreground text-center">
                        No brands found
                    </div>
                )}

            </> : <></>}
        </>

    )
}
