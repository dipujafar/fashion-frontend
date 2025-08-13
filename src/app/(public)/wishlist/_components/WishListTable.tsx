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
import { AuthenticateIcon } from "@/icons";
import { X } from "lucide-react";
import Image from "next/image";

const productData = [
  {
    name: "Teens Top & Pant",
    image: "/offer_page_product3.png",
    price: 25,
    date: "24 Feb, 2024",
    color: "Red",
    size: "XLL",
  },
  {
    name: "Teens Top & Pant",
    image: "/offer_page_product3.png",
    price: 24,
    date: "24 Feb, 2024",
    color: "Green",
    size: "XLL",
  },
  {
    name: "Teens Top & Pant",
    image: "/offer_page_product3.png",
    price: 24,
    date: "24 Feb, 2024",
    color: "Blue",
    size: "XLL",
  },
];

export default function WishListTable() {
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
        {productData?.map((data, idx) => (
          <TableRow key={idx} className="hover:bg-transparent">
            <TableCell className="font-medium min-w-fit">
              <div className="flex gap-x-2">
                <div className="border  size-6  rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 group duration-300">
                  <X className="group-hover:text-red-700 duration-300 size-4" />
                </div>
                <div className=" flex flex-col lg:flex-row xl:flex-col 2xl:flex-row items-center md:gap-3 gap-1  min-w-fit">
                  <Image
                    src={data?.image}
                    alt="product_image"
                    width={950}
                    height={700}
                    className="md:size-28 size-20 rounded object-cover origin-center"
                  />
                  <div className="flex flex-col lg:gap-y-1.5">
                    <div className="flex gap-x-1.5 justify-between bg-[#F3FFF9] px-1">
                      <div className="flex items-center gap-x-0.5">
                        <AuthenticateIcon className="size-2.5" />
                        <h5 className="text-[10px] text-[#00B047]">
                          Authentication of Goods
                        </h5>
                      </div>
                      <div className="flex items-center gap-x-0.5">
                        <p className="text-[10px] text-[#00B047]">$15.00</p>
                        <h5 className="text-xs bg-[#00B047]/20 text-[#00B047] rounded-full cursor-pointer">
                          <X className="size-3" />
                        </h5>
                      </div>
                    </div>
                    <div className="flex gap-x-1.5 justify-between bg-[#F3FFF9] px-1">
                      <div className="flex items-center gap-x-0.5">
                        <AuthenticateIcon className="size-2.5" />
                        <h5 className="text-[10px] text-[#00B047]">
                          Buyer Protection
                        </h5>
                      </div>
                      <div className="flex items-center gap-x-0.5">
                        <p className="text-[10px] text-[#00B047]">$15.00</p>
                        <h5 className="text-xs bg-[#00B047]/20 text-[#00B047] rounded-full cursor-pointer">
                          <X className="size-3" />
                        </h5>
                      </div>
                    </div>
                    <p className="truncate font-medium 2xl:text-lg text-sm">
                      {data?.name}
                    </p>
                    <div className="flex gap-x-1">
                      <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-500 border-r-1 pr-2">
                        <p>Color:</p>
                        <p>{data?.color}</p>
                      </div>
                      <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-500 ">
                        <p>Size:</p>
                        <p>{data?.size}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>

            <TableCell className="text-center">${data?.price}</TableCell>
            <TableCell className="text-center">{data?.date}</TableCell>
            <TableCell className="text-center"><Button className="group group cursor-pointer">Add to Cart <AnimatedArrow /></Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
