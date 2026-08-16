import { Button } from '@/components/ui/button';
import { GetUserBillingDetails } from '@/lib/services/UserDetails';
import { Addresses, IBillingDetails } from '@/types';
import React, { Suspense } from 'react'
import AddNewAddress from './_components/AddNewAddress';
import UpdateSellingAddress from './_components/UpdateSellingAddress';

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

    const noAddressExists = !data?.data?.buyingAddress && !data?.data?.sellingAddress;

    return (
        <div className="space-y-3">
            <div>
                <div className="pt-10 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Addresses</h2>
                    {noAddressExists && <AddNewAddress defaultdata={null} actionBtn={<Button
                        type="button"
                        variant={"default"}
                        size={"sm"}
                        className="rounded-none cursor-pointer"
                    >
                        Add New
                    </Button>}
                    />}
                </div>
                <p className="mt-1 text-sm text-gray-600">
                    Manage the addresses used for selling and buying.
                </p>
            </div>

            {noAddressExists ? <p className='text-gray-700 text-center mt-20'>No addresses saved yet.</p>

                : <div className='space-y-5 mt-10 max-w-xs'>
                    <AddressCard accent='selling' label='Selling Address' address={data?.data?.sellingAddress} kind='Selling' />
                    <AddressCard accent='buying' label='Buying Address' address={data?.data?.buyingAddress} kind='Buying' />
                </div>
            }



        </div>
    )
}

function AddressCard({
    kind,
    accent,
    label,
    address,
}: {
    kind: string;
    accent: "selling" | "buying";
    label: string;
    address: IBillingDetails | null;
}) {
    if (!address) {
        return (
            <section className="flex flex-col items-center justify-center rounded-md border border-dashed border-border p-6 text-center ">
                <div className="flex items-center gap-2">
                    <span
                        className={`inline-flex h-2.5 w-2.5 rounded-full ${accent === "selling" ? "bg-chart-1" : "bg-chart-2"
                            }`}
                        aria-hidden="true"
                    />
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        {kind} address
                    </h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                    No {kind.toLowerCase()} address saved yet.
                </p>
                <Button
                    type="button"
                    variant={"outline"}
                    size={"sm"}
                    className="mt-4 rounded-none cursor-pointer"
                >
                    + Add {kind.toLowerCase()} address
                </Button>
            </section>
        );
    }

    return (
        <section className="rounded border border-gray-200 p-5">
            
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span
                        className={`inline-flex h-2.5 w-2.5 rounded-full ${accent === "selling" ? "bg-chart-1" : "bg-chart-2"
                            }`}
                        aria-hidden="true"
                    />
                    <h3 className="font-semibold text-card-foreground">
                        {kind} address
                    </h3>
                </div>
            </div>

            <div className="mt-4 space-y-1">
                
                <p className="text-sm text-muted-foreground">{address?.address1}</p>
                {address?.address2 && (
                    <p className="text-sm text-muted-foreground">{address.address2}</p>
                )}
                <p className="text-sm text-muted-foreground">
                    {address?.city}, {address?.state} {address?.zip_code}
                </p>
                <p className="text-sm text-muted-foreground">{address?.country}</p>
                <p className="pt-1 text-sm text-muted-foreground">{address?.contact}</p>
            </div>

            <div className="mt-5 flex gap-2">
                {accent === "selling" ? <UpdateSellingAddress defaultdata={address} actionBtn={<Button
                    type="button"
                    variant={"default"}
                    size={"sm"}
                    className="rounded-none cursor-pointer"

                >
                    Edit
                </Button>} /> : <AddNewAddress defaultdata={address} actionBtn={<Button
                    variant={"default"}
                    type="button"
                    className="rounded-none cursor-pointer"
                >
                    Edit
                </Button>} />
                }
            </div>
        </section>
    );
}