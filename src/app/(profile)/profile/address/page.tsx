import { Button } from '@/components/ui/button';
import { GetUserBillingDetails } from '@/lib/services/UserDetails';
import { Addresses } from '@/types';
import React, { Suspense } from 'react'

function AddressPage() {

    const addressesPromise = GetUserBillingDetails();

    return (
        <div>
            <Suspense fallback={<div className="flex-center h-40 bg-white">
                <span className="loaderDark !w-12"> </span>
            </div>}>
                <AddressList addressesPromise={addressesPromise} />
            </Suspense>
        </div>
    )
}

export default AddressPage;

const AddressList = async ({ addressesPromise }: { addressesPromise: Promise<{ data: Addresses }> }) => {

    const data = await addressesPromise;

    return (
        <div className="space-y-3">
            <div>
                <div className="pt-10 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Addresses</h2>
                    <Button
                        variant={"default"}
                        type="button"
                        className="rounded-none cursor-pointer"
                    >
                        Add address
                    </Button>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                    Manage the addresses used for selling and buying.
                </p>
            </div>

            

        </div>
    )
}