"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import BillingAddressForm from "./BillingAddressForm";
import { IBillingDetails } from "@/types";

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
            <DialogContent className="p-0 gap-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-lg font-semibol text-center">
                        Add Address
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 space-y-4 pb-5">
                    <BillingAddressForm defaultValue={defaultValue} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BillingAddressModal