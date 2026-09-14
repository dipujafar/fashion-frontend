"use client"
import React, { useCallback } from 'react'
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox"
import { conditionOptions } from '@/components/shared/UserProfile/AddProduct/schema';

export default function ConditionSelect() {

    const searchParams = useSearchParams()

    const router = useRouter();

    const pathname = usePathname();
    const selectedconditions = searchParams.get("condition")?.split(",") || [];


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

    const handleSelect = (conditions: string) => {
        updateQueryParam("condition", conditions)
    }

    const isConditionSelected = selectedconditions.length > 0;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={cn("justify-between hover:bg-zinc-50 duration-150 border border-gray-300 shadow-none cursor-pointer rounded px-2.5 h-8", isConditionSelected && "border-gray-700")}>
                    <span className="flex items-center gap-2">
                        <span className={cn("text-foreground text-base font-normal", isConditionSelected && "font-semibold")}>Condition</span>
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 rounded-none w-64 max-h-96 overflow-y-auto" align='start'>

                <>

                    {conditionOptions?.length ? (
                        conditionOptions.map((option) => {
                            const isChecked = selectedconditions.includes(option.value);

                            return (
                                <div key={option.value} onClick={() => handleSelect(option.value)} className="p-0 border-b border-gray-200 last:border-b-0">
                                    <button
                                        className="w-full flex items-center justify-between p-3 hover:bg-accent transition-colors text-left cursor-pointer">

                                        <div>
                                            <p className="text-base font-medium">{option?.label}</p>
                                            <p className='text-sm text-gray-600'>{option?.description}</p>
                                        </div>

                                        <Checkbox className='rounded-xs border-gray-500 data-[state=checked]:text-white' checked={isChecked} />
                                    </button>
                                </div>
                            )
                        })
                    ) : (
                        <div className="p-3 text-sm text-muted-foreground text-center">
                            No conditions found
                        </div>
                    )}

                </>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}