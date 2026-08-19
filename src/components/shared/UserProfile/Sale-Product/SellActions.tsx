"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { RefreshCw, EllipsisVertical } from 'lucide-react'
import { IOrder, OrderStatus } from "@/types"
import { toast } from "sonner"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import CancelOrderForm, { CancelOrderFormValues } from "./CancelOrderForm"

type DialogKey = "confirm" | "cancel" | "ship" | null;

export default function SellActions({ order }: { order: IOrder }) {
    const [loadingAction, setLoadingAction] = useState<DialogKey>(null)
    const [cancelOpen, setCancelOpen] = useState(false) // <-- controlled state
    const isLoading = loadingAction !== null

    const handleCancelOrder = async (data: CancelOrderFormValues) => {
        setLoadingAction("cancel")
        try {
            toast.success("Order cancelled");
            setCancelOpen(false) // close on success
        } catch (error: any) {
            if (isRedirectError(error)) throw error;
            toast.error(error?.data?.message);
        } finally {
            setLoadingAction(null)
        }
    }

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
                        {/* {order?.status === OrderStatus.PENDING && (
                            <>
                                <DropdownMenuSeparator className="my-0" />
                                <DropdownMenuItem
                                    onSelect={() => setCancelOpen(true)} // let the menu close, then open dialog
                                    className="cursor-pointer p-2 rounded-none text-red-600 hover:!text-red-600"
                                >
                                    <CircleX size={16} className="text-destructive" />
                                    Cancel Order
                                </DropdownMenuItem>
                            </>
                        )} */}
                        {order?.status === OrderStatus.CANCELLED && (
                            <DropdownMenuItem onSelect={() => { }} className="cursor-pointer p-2 rounded-none">
                                <RefreshCw size={16} />
                                Relist Product
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Rendered as a sibling, not nested inside the dropdown item */}
            <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
                <AlertDialogContent className="rounded-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure to <span className="text-red-600 underline underline-offset-2">Cancel</span> the whole order?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Once you cancel the order, it will be marked as cancelled and the buyer will be notified.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <CancelOrderForm handleCancelOrder={handleCancelOrder} isLoading={isLoading} />
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}