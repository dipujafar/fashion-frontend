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
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { ChevronDown, Truck, MapPin, CheckCircle2, Eye, RefreshCw, X, Loader2, MessageCircleMore, EllipsisVertical, CircleX } from 'lucide-react'
import { IOrder, IsellerGroup, OrderStatus } from "@/types"
import { cn } from "@/lib/utils"
import { CancelOrder, ConfirmOrder, MarkShipped } from "@/lib/Actions/Order.action"
import { toast } from "sonner"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import BillingDetailsView from "./BillingDetailsView"
import CancelOrderForm, { CancelOrderFormValues } from "./CancelOrderForm"
import CancelReasonView from "./CancelReasonView"

type StatusAction = {
    label: React.ReactNode;
    icon: React.ReactNode;
    action: () => void;
    destructive?: boolean;
};

type DialogKey = "confirm" | "cancel" | "ship" | null;

function SellActions({ status, sellerGroupId, order }: { status: OrderStatus, sellerGroupId: string, order: IsellerGroup }) {

    const [openDialog, setOpenDialog] = useState<DialogKey>(null)
    const [loadingAction, setLoadingAction] = useState<DialogKey>(null)
    const isLoading = loadingAction !== null

    // helper: only lets a dialog close/open when nothing is loading
    const handleOpenChange = (key: Exclude<DialogKey, null>) => (next: boolean) => {
        if (isLoading) return;
        setOpenDialog(next ? key : null);
    }

    const handleConfirmOrder = async () => {
        setLoadingAction("confirm")
        try {
            const res = await ConfirmOrder({ payload: { sellerGroupId } });
            if (res?.error) {
                toast.error(res?.error);
                return;
            }
            toast.success("Order confirmed");
            setOpenDialog(null);
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error;
            }
            toast.error(error?.data?.message);
        }
        finally {
            setLoadingAction(null)
        }
    }

    const handleCancelOrder = async (data: CancelOrderFormValues) => {
        setLoadingAction("cancel")
        try {
            const res = await CancelOrder({ payload: { sellerGroupId, ...data } });
            if (res?.error) {
                toast.error(res?.error);
                return;
            }
            toast.success("Order cancelled");
            setOpenDialog(null);
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error;
            }
            toast.error(error?.data?.message);
        }
        finally {
            setLoadingAction(null)
        }
    }

    const handleMarkShippedOrder = async () => {
        setLoadingAction("ship")
        try {
            const res = await MarkShipped({ payload: { sellerGroupId } });
            if (res?.error) {
                toast.error(res?.error);
                return;
            }
            toast.success("Order marked as shipped");
            setOpenDialog(null);
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error;
            }
            toast.error(error?.data?.message);
        }
        finally {
            setLoadingAction(null)
        }
    }

    const getActionsForStatus = (status: OrderStatus): StatusAction[] => {
        switch (status) {
            case OrderStatus.PENDING:
                return [
                    {
                        label: <AlertDialog open={openDialog === "confirm"} onOpenChange={handleOpenChange("confirm")}>
                            <AlertDialogTrigger className="cursor-pointer">
                                Confirm Order
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to <span className="text-green-500 underline-offset-2 underline">confirm</span> this order ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Once you confirm the order, it will be processed and shipped to the buyer.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer" disabled={isLoading}>No</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="cursor-pointer"
                                        disabled={isLoading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleConfirmOrder();
                                        }}
                                    >
                                        {loadingAction === "confirm" && <Loader2 className="animate-spin" size={16} />}
                                        {loadingAction === "confirm" ? "Confirming..." : "Yes, Confirm"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>,
                        icon: <CheckCircle2 size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.order?.billingDetails} />,
                        icon: <Truck size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                    {
                        label: <AlertDialog open={openDialog === "cancel"} onOpenChange={handleOpenChange("cancel")}>
                            <AlertDialogTrigger className="cursor-pointer">
                                Cancel Order
                            </AlertDialogTrigger>
                            <AlertDialogContent>

                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to <span className="text-red-600 underline underline-offset-2">cancel</span> this order ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Once you cancel the order, it will be marked as cancelled and the buyer will be notified.
                                    </AlertDialogDescription>

                                </AlertDialogHeader>

                                <CancelOrderForm handleCancelOrder={handleCancelOrder} isLoading={isLoading} loadingAction={loadingAction} />



                            </AlertDialogContent>
                        </AlertDialog>,
                        icon: <CircleX size={16} className="text-destructive" />,
                        action: () => { },
                        destructive: true,
                    },
                ]
            case OrderStatus.CONFIRMED:
                return [
                    {
                        label: <AlertDialog open={openDialog === "ship"} onOpenChange={handleOpenChange("ship")}>
                            <AlertDialogTrigger className="cursor-pointer">
                                Mark as Shipped
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to mark this order as shipped ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Once you mark the order as shipped, it will be updated in the system and the buyer will be notified.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer" disabled={isLoading}>No</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="cursor-pointer"
                                        disabled={isLoading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleMarkShippedOrder();
                                        }}
                                    >
                                        {loadingAction === "ship" && <Loader2 className="animate-spin" size={16} />}
                                        {loadingAction === "ship" ? "Marking as Shipped..." : "Yes, Mark as Shipped"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>,
                        icon: <Truck size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                    {
                        label: <AlertDialog open={openDialog === "cancel"} onOpenChange={handleOpenChange("cancel")}>
                            <AlertDialogTrigger className="cursor-pointer">
                                Cancel Order
                            </AlertDialogTrigger>
                            <AlertDialogContent>

                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to <span className="text-red-600  underline underline-offset-2">cancel</span> this order ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Once you cancel the order, it will be marked as cancelled and the buyer will be notified.
                                    </AlertDialogDescription>

                                </AlertDialogHeader>

                                <CancelOrderForm handleCancelOrder={handleCancelOrder} isLoading={isLoading} loadingAction={loadingAction} />



                            </AlertDialogContent>
                        </AlertDialog>,
                        icon: <CircleX size={16} className="text-destructive" />,
                        action: () => { },
                        destructive: true,
                    },
                ]
            case OrderStatus.SHIPPED:
                return [
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                    {
                        label: 'Contact Buyer',
                        icon: <MessageCircleMore size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                ]
            case OrderStatus.DELIVERED:
                return [
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                    // {
                    //     label: 'Mark as Completed',
                    //     icon: <CheckCircle2 size={16} />,
                    //     action: () => { },
                    //     destructive: false,
                    // },
                ]
            case OrderStatus.COMPLETED:
                return [
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                    {
                        label: 'View Invoice',
                        icon: <Eye size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                ]
            case OrderStatus.CANCELLED:
                return [
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                    {
                        label: <CancelReasonView cancelReason={order?.cancelReason} cancelReasonDetails={order?.cancelReasonDetails} cancelledBy={order?.cancelledBy} trigger="View Cancellation Reason" />,
                        icon: <Eye size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                    {
                        label: 'Relist Product',
                        icon: <RefreshCw size={16} />,
                        action: () => { },
                        destructive: false,
                    },
                ]
            default:
                return []
        }
    }

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={"sm"} className="cursor-pointer flex flex-row items-center gap-x-1 shadow-none">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40 rounded-none p-0" align="end">

                <DropdownMenuGroup>

                    {
                        getActionsForStatus(status)?.map((action, index) => {
                            return <React.Fragment key={index}>
                                {action.destructive && <DropdownMenuSeparator className="my-0" />}
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className={cn("cursor-pointer p-2 rounded-none", action.destructive && "text-red-600 hover:!text-red-600")}>
                                    {action.icon}
                                    {action.label}
                                </DropdownMenuItem>
                            </React.Fragment>
                        })
                    }

                </DropdownMenuGroup>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}

export default SellActions