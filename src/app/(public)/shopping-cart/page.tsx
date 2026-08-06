import Container from '@/components/shared/Container'
import React from 'react'
import { Button } from "@/components/ui/button";
import CustomAvatar from "@/components/ui/custom-avatar";
import GetCartProds from "@/lib/services/Cartprods";
import { ICartGroup } from "@/types";
import { defaultImg } from "@/utils/defaultImg";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import DltCart from '@/components/shared/Navbar/NavIconsWithDropDown/DltCart';

function ShopingCart() {
    const cartPromise = GetCartProds();
    return (
        <div className='bg-[#F6F6F6]'>
            <Container className="max-w-6xl text-gray-800">
                <h3 className='text-xl md:text-2xl font-semibold py-3 md:py-5'>Shoping Cart</h3>

                <Suspense key={Date.now()} fallback={<div className="flex-center h-40">
                    <span className="loaderDark"> </span>
                </div>}>
                    <CartProds cartPromise={cartPromise} />
                </Suspense>

            </Container>
        </div>
    )
}

export default ShopingCart;



const CartProds = async ({ cartPromise }: { cartPromise: Promise<{ data: ICartGroup[] }> }) => {
    const cartProds = await cartPromise;

    const cart = cartProds?.data;

    return <>
        {
            <div className="space-y-5">
                {
                    cartProds?.data?.map((cartGroup) => {

                        const totalExtraDonation = cartGroup?.items?.reduce((acc, item) => acc + (item?.extraDonation || 0), 0);

                        const itemTotal = cartGroup?.items?.reduce((acc, item) => acc + (item?.product?.finalPrice || 0), 0) + totalExtraDonation;

                        const totalPrice = itemTotal + totalExtraDonation;

                        return <div key={cartGroup?.id} className="flex flex-col lg:flex-row items-center bg-white p-5 shadow-lg justify-start gap-3">

                            <div className="w-full lg:w-3/5">
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
                                        <Link
                                            href={`/member/${cartGroup?.seller?.userName}`}
                                            className="flex items-center cursor-pointer"
                                        >
                                            <p className="underline underline-offset-1 text-sm">{cartGroup?.seller?._count?.products} items for sale</p>
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
                                                        <DltCart cartItemId={item?.id} productId={item?.product?.id} />
                                                    </div>
                                                </div>

                                            </div>

                                        ))
                                    }

                                </div>
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex justify-between items-center pb-3 ">
                                    <span className="font-semibold text-neutral-900">Item(s)</span>
                                    <span className="font-bold text-neutral-900">${itemTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 ">
                                    <span className="font-semibold text-neutral-900">Extra Donation</span>
                                    <span className="font-bold text-neutral-900">${totalExtraDonation.toFixed(2)}</span>
                                </div>
                                <p className="text-gray-700 text-sm mb-3">Shipping calculated at checkout</p>

                                <div className="flex justify-between items-center py-3 border-t border-neutral-200">
                                    <span className="font-bold text-neutral-900">Total</span>
                                    <span className="font-bold text-neutral-900">${totalPrice.toFixed(2)}</span>
                                </div>

                                <Link href={`/checkout/${cartGroup?.id}`}>
                                    <Button variant={"default"} className="w-full mt-2 rounded-none py-5 border-2 border-primary-black cursor-pointer font-semibold">Checkout {cartGroup?.items.length} items</Button>
                                </Link>
                            </div>


                        </div>
                    })
                }
            </div>
        }

        {cart?.length <= 0 && <div className="py-8">
            <Image src={"/empty-cart.png"} alt="empty-cart" className="h-28 w-auto mx-auto" height={500} width={500} />
            <p className="text-center text-gray-500">No items in cart</p>
            <center>
                <Link href={"/shop"}>
                    <Button variant={"default"} className="mt-2 mx-auto text-center rounded-none py-5 border-2 cursor-pointer font-semibold">Browse</Button>
                </Link>
            </center>
        </div>}

    </>

}