"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import BillingAddressForm from "./BillingAddressForm";
import { IBillingDetails } from "@/types";
import { useRef } from "react";

// Remove ICharityWithDetails entirely, ICharity is enough now

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultValue: IBillingDetails | null
}

function BillingAddressModal({
    open,
    onOpenChange,
    defaultValue
}: Props) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 gap-0 rounded-none">
                <DialogHeader className="p-6 pb-4 border-b border-gray-200">
                    <DialogTitle className="text-lg font-semibold text-center">
                        Add Address
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 space-y-4 py-5">
                    <BillingAddressForm defaultValue={defaultValue} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BillingAddressModal