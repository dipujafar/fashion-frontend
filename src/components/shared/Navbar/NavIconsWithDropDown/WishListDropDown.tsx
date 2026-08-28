"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MenubarContent,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { HeartIcon } from "@/icons";
import { defaultImg } from "@/utils/defaultImg";
import Image from "next/image";
import Link from "next/link";
import DltToFavourite from "./DltToFavourite";
import { useMyFavoriteProductsQuery } from "@/redux/api/favoriteProductApi";
import { IFavoriteItem } from "@/app/(public)/favourites/_components/WishListContainer";

export default function WishListDropDown() {

  const { isLoading, data } = useMyFavoriteProductsQuery();

  return (
    <>
      <MenubarTrigger className="cursor-pointer relative">
        <HeartIcon className="size-5 lg:size-6 " />
      </MenubarTrigger>
      <MenubarContent className="rounded-none min-w-xs">

        <div className="border-b border-gray-200 py-2 px-3">
          <p className="text-base font-medium text-center">Favourites</p>
        </div>

        {isLoading ? <div className="flex-center h-28">
          <span className="loaderDark !w-10"> </span>
        </div> : <FavProds favoriteProds={data?.data?.data || []} />}

      </MenubarContent>
    </>
  );
};

const FavProds = ({ favoriteProds }: { favoriteProds: IFavoriteItem[] }) => {

  return <div>
    <div className="overflow-y-auto max-h-[450px] space-y-2 mt-2 px-1">
      {favoriteProds?.length === 0 ? <div className="py-10 space-y-2">
        <Image src={"/Heart.gif"} unoptimized alt="empty-cart" className="h-12 w-auto mx-auto" height={500} width={500} />
        <p className="text-center text-gray-500 text-sm">No products in favourites</p>
      </div> :
        favoriteProds?.map((product) => (
          <div key={product?.id}>
            <Card className="p-2 shadow-none rounded cursor-pointer w-full">
              <div className="flex items-start gap-3">
                <Image
                  src={product?.product?.images?.[0]?.url || defaultImg.product}
                  alt={'product image'}
                  width={1200}
                  height={1200}
                  placeholder="blur"
                  blurDataURL={defaultImg.placeholderImg}
                  className="w-16 h-16 rounded object-cover"
                />

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="flex-1">
                      <p className="text-base break-words font-medium text-gray-800">
                        {product?.product?.title}
                      </p>

                      <p className="text-sm font-semibold">
                        {product?.product?.size?.title}
                      </p>


                      <span className="text-sm whitespace-nowrap">
                        ${product?.product?.finalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <DltToFavourite prodId={product?.product?.id} />
              </div>
            </Card>
          </div>
        ))}
    </div>

    {favoriteProds?.length > 0 && <Link href={"/favourites"}>
      <Button variant={"default"} className="w-full mt-2 rounded-none py-4 border-2 border-primary-black cursor-pointer font-medium">View All</Button>
    </Link>}
  </div>

}
