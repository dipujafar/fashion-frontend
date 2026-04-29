"use client"
import { productData } from "@/app/(public)/wishlist/_components/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CartIcon } from "@/icons";
import { removeFromCart } from "@/redux/features/cart.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { defaultImg } from "@/utils/defaultImg";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDropDown() {

  const cart = useAppSelector(state => state?.cart);
  const dispatch = useAppDispatch();

  const handleDltTocart = (productId: string) => {
    dispatch(removeFromCart(productId));
  }

  return (
    <>
      <MenubarTrigger>
        <CartIcon className="size-5 lg:size-6 " />
      </MenubarTrigger>
      <MenubarContent className="md:min-w-sm overflow-y-auto max-h-[calc(100vh-100px)]">
        {cart?.items.map((product) => (
          <div key={product?.id}>
            <MenubarItem className="cursor-pointer">
              <Card className="p-4 hover:shadow-md transition-shadow w-full">
                <div className="flex items-start gap-3">
                  <Image
                    src={product?.product?.images[0]?.url || defaultImg?.product}
                    alt={product?.product?.title}
                    width={1200}
                    height={1200}
                    placeholder="blur"
                    blurDataURL={defaultImg?.placeholderImg}
                    className="w-12 h-12 rounded-md object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-lg break-words">
                          {product?.product?.title}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          ${product?.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="cursor-pointer" onClick={() => handleDltTocart(product?.id)}>
                    <Trash className="size-5 text-red-500" />
                  </button>
                </div>
              </Card>
            </MenubarItem>
          </div>
        ))}
        {cart?.items?.length <= 0 && <div className="py-10">
          <Image src={"/empty-cart.png"} alt="empty-cart" className="h-28 w-auto mx-auto" height={500} width={500} />
        </div>}
        {cart?.items?.length > 0 && <Link href={"/shopping-cart/shopping"}>
          <Button className="w-full mt-2">View All</Button>
        </Link>}
      </MenubarContent>
    </>
  );
}
