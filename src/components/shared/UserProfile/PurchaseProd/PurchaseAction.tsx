"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { EllipsisVertical, Truck, Headphones } from 'lucide-react'
import { IOrder } from "@/types"
import { useRouter } from "next/navigation"

function PurchaseAction({ order }: { order: IOrder }) {
    const router = useRouter();

    const orderNumberWithoutHash = (order?.orderNumber ?? "").replace(/^#/, "");

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="cursor-pointer flex flex-row items-center gap-x-1 shadow-none">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40 rounded-none p-0" align="end">
                    <DropdownMenuGroup>

                        <DropdownMenuItem
                            onSelect={() => router.push(`/order-tracking?orderCode=${orderNumberWithoutHash}`)}
                            className="cursor-pointer p-2 rounded-none"
                        >
                            <Truck size={16} />
                            Track Order
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onSelect={() => router.push(`/contact-us`)}
                            className="cursor-pointer p-2 rounded-none"
                        >
                            <Headphones size={16} />
                            Contact Support
                        </DropdownMenuItem>

                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>


        </>
    )
}
export default PurchaseAction