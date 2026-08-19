import { Button } from "@/components/ui/button";
import CustomAvatar from "@/components/ui/custom-avatar";
import Empty from "@/components/ui/empty";
import {
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CartIcon } from "@/icons";
import GetCartProds from "@/lib/services/Cartprods";
import { ICartGroup } from "@/types";
import { defaultImg } from "@/utils/defaultImg";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import DltCart from "./DltCart";

export default function CartDropDown() {

  const cartPromise = GetCartProds();

  return (
    <>
      <MenubarTrigger className="cursor-pointer">
        <CartIcon className="size-5 lg:size-7" />
      </MenubarTrigger>
      <MenubarContent className="min-w-xs rounded-none">

        <div className="border-b border-gray-200">
          <p className="text-base font-medium px-3 pt-2 pb-3 text-center">Shopping Cart</p>
        </div>

        <Suspense key={Date.now()} fallback={<div className="flex-center h-28">
          <span className="loaderDark !w-10"> </span>
        </div>}>
          <CartProds cartPromise={cartPromise} />
        </Suspense>

      </MenubarContent>
    </>
  );
}

const CartProds = async ({ cartPromise }: { cartPromise: Promise<{ data: ICartGroup[] }> }) => {
  const cartProds = await cartPromise;

  const cart = cartProds?.data;

  return <>
    {
      <div className="space-y-3 overflow-y-auto max-h-[450px]">
        {
          cartProds?.data?.map((cartGroup) => (
            <MenubarItem key={cartGroup?.id} className="flex-none hover:!bg-none">

              <div className="w-full">

                <div className="flex flex-row items-center gap-x-3 mb-2">

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
                      <React.Fragment key={item?.id}>
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
                              <p className="text-lg font-bold">${item?.product?.finalPrice?.toFixed(2)}</p>
                              <p className="text-sm text-gray-700">${item?.product?.size?.title}</p>
                            </Link>
                            <DltCart cartItemId={item?.id} productId={item?.product?.id} />
                          </div>
                        </div>

                      </React.Fragment>
                      
                    ))
                  }
                  <Link href={`/checkout/${cartGroup?.id}`}>
                    <Button variant={"default"} className="w-full mt-2 rounded-none py-5 border-2 border-primary-black cursor-pointer font-semibold">Checkout</Button>
                  </Link>
                </div>
              </div>

            </MenubarItem>
          ))
        }
      </div>
    }

    {cart?.length <= 0 && <div className="py-10">
      <Image src={"/empty_cart.gif"} alt="empty-cart" className="h-24 w-auto mx-auto" height={500} width={500} />
      <p className="text-center text-gray-500 text-sm mt-1">No items in cart</p>
      <center>
        <Link href={"/shop"}>
          <Button variant={"default"} className="mt-2 mx-auto text-center rounded-none py-5 border-2 cursor-pointer font-semibold">Browse</Button>
        </Link>
      </center>
    </div>}

    {cart?.length > 0 && <Link href={"/shopping-cart"}>
      <Button variant={"outline"} className="w-full mt-2 rounded-none py-5 border-2 border-primary-black cursor-pointer font-semibold">View All</Button>
    </Link>}
  </>

}