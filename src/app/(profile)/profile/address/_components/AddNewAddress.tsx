"use client"
import BillingAddressModal from '@/app/(public)/checkout/[cartGroupId]/_components/Billing/BillingAddressModal';
import { IBillingDetails } from '@/types';
import React, { useState } from 'react'

function AddNewAddress({ defaultdata, actionBtn }: { defaultdata: IBillingDetails | null, actionBtn: React.ReactNode }) {
    const [showAddAddress, setShowAddAddress] = useState<boolean>(false);
    return (
        <div>

            <button onClick={() => setShowAddAddress(true)}>
                {actionBtn}
            </button>

            <BillingAddressModal
                open={showAddAddress}
                onOpenChange={setShowAddAddress}
                defaultValue={defaultdata}
                title='Buying Address'
            />
        </div>
    )
}

export default AddNewAddress