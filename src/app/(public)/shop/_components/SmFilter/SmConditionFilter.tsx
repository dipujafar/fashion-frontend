"use client"
import React, { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { conditionOptions } from '@/components/shared/UserProfile/AddProduct/schema';

export default function SmConditionFilter() {

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

    return (
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
    )
}