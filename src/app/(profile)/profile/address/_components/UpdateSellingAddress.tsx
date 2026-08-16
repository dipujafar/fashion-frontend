"use client"
import BillingAddressModal from '@/app/(public)/checkout/[cartGroupId]/_components/Billing/BillingAddressModal';
import { Button } from '@/components/ui/button';
import { updateSellingDetails } from '@/lib/Actions/Cart.action';
import { IBillingDetails } from '@/types';
import React, { useState } from 'react'

function UpdateSellingAddress({ defaultdata, actionBtn }: { defaultdata: IBillingDetails | null, actionBtn : React.ReactNode }) {
    const [showEditAddress, setShowEditAddress] = useState<boolean>(false);

    const updateAddressFn = async (data: any) => {

        await updateSellingDetails(data);
    }

    return (
        <div>

            <button onClick={() => setShowEditAddress(true)}>
                {actionBtn}
            </button>

            <BillingAddressModal
                open={showEditAddress}
                onOpenChange={setShowEditAddress}
                defaultValue={defaultdata}
                title='Selling Address'
                updateAddressFn={updateAddressFn}
            />
        </div>
    )
}
export default UpdateSellingAddress