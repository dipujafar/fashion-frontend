"use client"
import { useState } from "react"
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

import { ChevronDown, Printer, Truck, MapPin, CheckCircle2, Eye, RefreshCw, X, Loader2 } from 'lucide-react'
import { IOrder, OrderStatus } from "@/types"
import { cn } from "@/lib/utils"
import { CancelOrder, ConfirmOrder } from "@/lib/Actions/Order.action"
import { toast } from "sonner"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import BillingDetailsView from "./BillingDetailsView"

function SellActions({ status, sellerGroupId, order }: { status: OrderStatus, sellerGroupId: string, order: IOrder }) {

    const [confirmOpen, setConfirmOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const [cancelOpen, setCancelOpen] = useState(false)
    const [cancelLoading, setCancelLoading] = useState(false)

    const handleConfirmOrder = async () => {
        setConfirmLoading(true)
        try {
            const res = await ConfirmOrder({ payload: { sellerGroupId } });
            if (res?.error) {
                toast.error(res?.error);
                return;
            }
            toast.success("Order confirmed");
            setConfirmOpen(false);
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error;
            }
            toast.error(error?.data?.message);
        }
        finally {
            setConfirmLoading(false)
        }
    }

    const handleCancelOrder = async () => {
        setCancelLoading(true)
        try {
            const res = await CancelOrder({ payload: { sellerGroupId } });
            if (res?.error) {
                toast.error(res?.error);
                return;
            }
            toast.success("Order cancelled");
            setCancelOpen(false);
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error;
            }
            toast.error(error?.data?.message);
        }
        finally {
            setCancelLoading(false)
        }
    }

    const getActionsForStatus = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PENDING:
                return [
                    {
                        label: <AlertDialog open={confirmOpen} onOpenChange={(next) => {
                            if (confirmLoading) return;
                            setConfirmOpen(next);
                        }}>
                            <AlertDialogTrigger className="cursor-pointer">
                                Confirm Order
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to confirm this order ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Once you confirm the order, it will be processed and shipped to the buyer.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer" disabled={confirmLoading}>No</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="cursor-pointer"
                                        disabled={confirmLoading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleConfirmOrder();
                                        }}
                                    >
                                        {confirmLoading && <Loader2 className="animate-spin" size={16} />}
                                        {confirmLoading ? "Confirming..." : "Yes, Confirm"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>,
                        icon: <CheckCircle2 size={16} />,
                        action: () => { },
                    },
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.billingDetails} />,
                        icon: <Truck size={16} />,
                        action: () => () => { },
                    },
                    {
                        label: <AlertDialog open={cancelOpen} onOpenChange={(next) => {
                            if (cancelLoading) return;
                            setCancelOpen(next);
                        }}>
                            <AlertDialogTrigger className="cursor-pointer">
                                Cancel Order
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to cancel this order ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Once you cancel the order, it will be marked as cancelled and the buyer will be notified.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer" disabled={cancelLoading}>No</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="cursor-pointer"
                                        disabled={cancelLoading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleCancelOrder();
                                        }}
                                    >
                                        {cancelLoading && <Loader2 className="animate-spin" size={16} />}
                                        {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>,
                        icon: <X size={16} />,
                        action: () => () => { },
                        destructive: true,
                    },
                ]
            case OrderStatus.CONFIRMED:
                return [
                    {
                        label: 'Mark as Shipped',
                        icon: <Truck size={16} />,
                        action: () => { },
                    },
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => () => { },
                    },
                    {
                        label: 'Print Shipping Label',
                        icon: <Printer size={16} />,
                        action: () => () => { },
                    },
                    {
                        label: <AlertDialog open={cancelOpen} onOpenChange={(next) => {
                            if (cancelLoading) return;
                            setCancelOpen(next);
                        }}>
                            <AlertDialogTrigger className="cursor-pointer">
                                Cancel Order
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to cancel this order ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Once you cancel the order, it will be marked as cancelled and the buyer will be notified.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer" disabled={cancelLoading}>No</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="cursor-pointer"
                                        disabled={cancelLoading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleCancelOrder();
                                        }}
                                    >
                                        {cancelLoading && <Loader2 className="animate-spin" size={16} />}
                                        {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>,
                        icon: <X size={16} />,
                        action: () => () => { },
                        destructive: true,
                    },
                ]
            case OrderStatus.SHIPPED:
                return [
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => () => { },
                    },
                    {
                        label: 'Contact Buyer',
                        icon: <Eye size={16} />,
                        action: () => () => { },
                    },
                ]
            case OrderStatus.DELIVERED:
                return [
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => () => { },
                    },
                    {
                        label: 'Mark as Completed',
                        icon: <CheckCircle2 size={16} />,
                        action: () => { },
                    },
                ]
            case OrderStatus.COMPLETED:
                return [
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => () => { },
                    },
                    {
                        label: 'View Invoice',
                        icon: <Eye size={16} />,
                        action: () => () => { },
                    },
                ]
            case OrderStatus.CANCELLED:
                return [
                    {
                        label: <BillingDetailsView trigger="View Shipping Details" billingDetails={order?.billingDetails} />,
                        icon: <MapPin size={16} />,
                        action: () => () => { },
                    },
                    {
                        label: 'View Cancellation Reason',
                        icon: <Eye size={16} />,
                        action: () => () => { },
                    },
                    {
                        label: 'Relist Product',
                        icon: <RefreshCw size={16} />,
                        action: () => () => { },
                    },
                ]
            default:
                return []
        }
    }

    return (
        <DropdownMenu>

            <DropdownMenuTrigger >
                <Button variant="outline" size={"sm"} className="cursor-pointer flex flex-row items-center gap-x-1">
                    Actions
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="start">

                <DropdownMenuGroup>

                    {
                        getActionsForStatus(status)?.map((action, index) => {
                            return <>
                                {action.destructive && <DropdownMenuSeparator />}
                                <DropdownMenuItem key={index} onSelect={(e) => e.preventDefault()} className={cn("cursor-pointer", action.destructive && "text-red-600 hover:!text-red-600")}>
                                    {action.icon}
                                    {action.label}
                                </DropdownMenuItem>
                            </>
                        })
                    }

                </DropdownMenuGroup>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}

export default SellActions