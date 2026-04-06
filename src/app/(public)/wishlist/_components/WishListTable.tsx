import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import Image from "next/image";
import { IWishListData } from "@/types";
import moment from "moment";
import Link from "next/link";
import WishlistSkeleton from "@/components/skeletons/WishlistSkeleton";
import Empty from "@/components/ui/empty";

export default function WishListTable({ data, loading, deleteWishListProduct }: { data: IWishListData[], loading: boolean, deleteWishListProduct: (id: string) => void }) {
  if (loading) return <WishlistSkeleton />
  if (data?.length === 0) return <div className="min-h-[calc(100vh-450px)] flex-center"> <Empty message="No Favorite Product" /></div>
  return (
    <Table className="lg:text-lg w-full overflow-x-auto">
      <TableHeader className="py-10 text-white bg-black">
        <TableRow className="border-none !text-white hover:bg-transparent">
          <TableHead className="text-white py-5">Product</TableHead>
          <TableHead className="text-white py-5 text-center">Price</TableHead>
          <TableHead className="text-white py-5 text-center ">
            Date Added
          </TableHead>
          <TableHead className="text-white py-5 text-center ">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((data, idx) => (
          <TableRow key={idx} className="hover:bg-transparent">
            <TableCell className="font-medium min-w-fit">
              <div className="flex gap-x-2">
                <div onClick={() => deleteWishListProduct(data?.product?.id)} className="border  size-6  rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 group duration-300">
                  <X className="group-hover:text-red-700 duration-300 size-4" />
                </div>
                <div className=" flex flex-col lg:flex-row xl:flex-col 2xl:flex-row items-center md:gap-3 gap-1  min-w-fit">
                  <Link href={`/shop/${data?.product?.id}`}>
                    <Image
                      src={data?.product?.images?.[0]?.url}
                      alt="product_image"
                      width={950}
                      height={700}
                      placeholder="blur"
                      blurDataURL={"/p-images/blurImage.jpg"}
                      className="md:size-28 size-20 rounded object-cover origin-center"
                    />
                  </Link>
                  <div className="flex flex-col lg:gap-y-1.5">


                    <Link href={`/shop/${data?.product?.id}`} className="truncate font-medium 2xl:text-lg text-sm">
                      {data?.product?.title}
                    </Link>
                    <div className="flex gap-x-1">
                      <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-500 border-r-1 pr-2">
                        <p>Color:</p>
                        <p>{data?.product?.color || "N/A"}</p>
                      </div>
                      <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-500 ">
                        <p>Size:</p>
                        <p>{data?.product?.size?.title || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>

            <TableCell className="text-center">${data?.product?.finalPrice?.toFixed(2)}</TableCell>
            <TableCell className="text-center">{moment(data?.createdAt).fromNow()}</TableCell>
            <TableCell className="text-center">
              <Button className="group group cursor-pointer">
                Add to Cart <AnimatedArrow />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
