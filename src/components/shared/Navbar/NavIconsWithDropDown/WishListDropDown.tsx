
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Empty from "@/components/ui/empty";
import LoadingSpin from "@/components/ui/loading-spin";
import {
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { HeartIcon } from "@/icons";
import GetFavouriteProds from "@/lib/services/FavoriteProds";
import { useGetFavoriteProductQuery } from "@/redux/api/favoriteProductApi";
import { IProduct, IWishListData } from "@/types";
import { defaultImg } from "@/utils/defaultImg";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import DltToFavourite from "./DltToFavourite";

export default async function WishListDropDown() {
  // const { data: wishListData, isLoading } = useGetFavoriteProductQuery(undefined);

  // console.log(wishListData?.data);

  const favPromise = GetFavouriteProds();

  return (
    <>
      <MenubarTrigger>
        <HeartIcon className="size-5 lg:size-6 " />
      </MenubarTrigger>
      <MenubarContent className="md:min-w-sm min-w-[300px] overflow-y-auto max-h-[calc(100vh-100px)]">

        <Suspense fallback={<div className="flex-center h-[300px]">
          <LoadingSpin color="black" size={50} />
        </div>}>
          <FavProds favPromise={favPromise} />
        </Suspense>
      </MenubarContent>
    </>
  );
};

const FavProds = async ({ favPromise }: { favPromise: Promise<{ data: { id: string, product: IProduct }[] }> }) => {
  const favoriteProds = await favPromise;




  return <>
    {favoriteProds?.data?.length === 0 ? <div className="h-[300px] flex-center">
      <Empty message="No Favorite Product" />
    </div> :
      favoriteProds?.data?.map((product, idx: number) => (
        <div key={idx}>
          <MenubarItem className="cursor-pointer">
            <Card className="p-4 hover:shadow-md transition-shadow w-full">
              <div className="flex items-start gap-3">
                <Image
                  src={product?.product?.images?.[0]?.url || defaultImg.product}
                  alt={'product image'}
                  width={1200}
                  height={1200}
                  placeholder="blur"
                  blurDataURL={defaultImg.placeholderImg}
                  className="w-12 h-12 rounded-md object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-lg break-words">
                        {product?.product?.title}
                      </p>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        ${product?.product?.finalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <DltToFavourite prodId={product?.product?.id} />
              </div>
            </Card>
          </MenubarItem>
        </div>
      ))}
    {favoriteProds?.data?.length > 0 && <Link href={"/wishlist"}>
      <Button className="w-full mt-2">View All</Button>
    </Link>}
  </>

}
