import CustomAvatar from '@/components/ui/custom-avatar';
import { getCheckoutItems } from '@/lib/services/Cartprods';
import { ICartGroup } from '@/types';
import { defaultImg } from '@/utils/defaultImg';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'

async function CheckoutItems({ cartGroupId }: { cartGroupId: string }) {

    const cartPromise = getCheckoutItems(cartGroupId);

    return (
        <div>
            <Suspense fallback={<div className="flex-center h-40 bg-white">
                <span className="loaderDark !w-12"> </span>
            </div>}>
                <CartProds cartPromise={cartPromise} />
            </Suspense>
        </div>
    )
}

const CartProds = async ({ cartPromise }: { cartPromise: Promise<{ data: ICartGroup }> }) => {
    const cartProds = await cartPromise;

    const cartGroup = cartProds?.data;

    return <>
        {
            <div className="space-y-5">

                <div className="flex flex-col lg:flex-row items-center bg-white p-5 shadow justify-start gap-3">

                    <div className="w-full">
                        <div className="flex flex-row items-center gap-x-3 mb-2 w-full">

                            <Link
                                href={`/member/${cartGroup?.seller?.userName}`}
                                className="cursor-pointer"
                            >
                                <CustomAvatar image={cartGroup?.seller?.picture?.url || null} name={cartGroup?.seller?.userName} className="!size-10"></CustomAvatar>
                            </Link>

                            <div>
                                <Link
                                    href={`/member/${cartGroup?.seller?.userName}`}
                                    className="flex items-center cursor-pointer"
                                >
                                    <p className="font-bold text-lg leading-4">{cartGroup?.seller?.userName}</p>
                                </Link>
                            </div>

                        </div>

                        <div className="space-y-2">
                            {
                                cartGroup?.items?.map((item) => (
                                    <div key={item?.id}>

                                        <div className="flex flex-row gap-x-2 items-start">
                                            <Link
                                                href={`/shop/${item?.product?.id}`}
                                                className="cursor-pointer"
                                            ><Image src={item?.product?.images?.[0]?.url || defaultImg?.product} alt={item?.product?.title} placeholder="blur" blurDataURL={defaultImg?.placeholderImg} width={200} height={200} className="h-28 w-28" />
                                            </Link>
                                            <div>
                                                <Link
                                                    href={`/shop/${item?.product?.id}`}
                                                    className="space-y-1"
                                                >
                                                    <p className="text-lg line-clamp-1 text-gray-700">{item?.product?.title}</p>
                                                    <div className='flex flex-row items-center gap-x-2'>
                                                        <p className="text-lg font-bold">${item?.product?.finalPrice?.toFixed(2)}</p>
                                                        {item?.extraDonation > 0 && (
                                                            <p className="text-sm font-bold">+ {item?.extraDonation?.toFixed(2)} (extra donation)</p>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-700">${item?.product?.size?.title}</p>
                                                </Link>

                                            </div>
                                        </div>

                                    </div>

                                ))
                            }

                        </div>
                    </div>



                </div>
            </div>
        }

        {/* {cart?.length <= 0 && <div className="py-8">
            <Image src={"/empty-cart.png"} alt="empty-cart" className="h-28 w-auto mx-auto" height={500} width={500} />
            <p className="text-center text-gray-500">No items in cart</p>
            <center>
                <Link href={"/shop"}>
                    <Button variant={"default"} className="mt-2 mx-auto text-center rounded-none py-5 border-2 cursor-pointer font-semibold">Browse</Button>
                </Link>
            </center>
        </div>} */}

    </>

}

export default CheckoutItems