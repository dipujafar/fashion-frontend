"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import BillingAddressForm from "./BillingAddressForm";
import { IBillingDetails } from "@/types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultValue: IBillingDetails | null;
    title?: string;
    updateAddressFn?: (data: any) => Promise<void>
}

function BillingAddressModal({
    open,
    onOpenChange,
    defaultValue,
    title = "Shipping Details",
    updateAddressFn
}: Props) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 gap-0 rounded-none">
                <DialogHeader className="p-6 pb-4 border-b border-gray-200">
                    <DialogTitle className="text-lg font-semibold text-center">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 space-y-4 py-5">
                    <BillingAddressForm defaultValue={defaultValue} onOpenChange={onOpenChange} updateAddressFn={updateAddressFn} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BillingAddressModal