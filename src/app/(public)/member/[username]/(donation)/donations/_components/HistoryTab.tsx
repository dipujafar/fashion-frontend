"use client"
import { TabsTrigger } from '@/components/ui/tabs'
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';
import React from 'react'

function HistoryTab({ tabName }: { tabName: string }) {
    const updateparams = useUpdateSearchParams();

    const handleTab = (tab: string) => {
        updateparams({ tab })
    }

    return (
        <TabsTrigger
            value={tabName}
            onClick={() => handleTab(tabName)}
            className="flex-none data-[state=active]:shadow-none  data-[state=active]:border-b-2 data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black py-5 w-auto hover:bg-gray-50 duration-200 rounded-none text-xs md:text-sm lg:text-base lg:px-3.5">
            {tabName}
        </TabsTrigger>
    )
}

export default HistoryTab