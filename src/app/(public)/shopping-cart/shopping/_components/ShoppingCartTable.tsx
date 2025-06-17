"use client";

import AnimatedArrowReverse from "@/components/animatedArrows/AnimatedArrowReverse";
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
import Link from "next/link";
import { useState } from "react";

const productData = [
  {
    name: "Teens Top & Pant",
    image: "/offer_page_product3.png",
    price: 25,
    quantity: 2,
    seller_info: "AquaPet Seller",
    color: "Brown",
    size: "XLL",
    donation: "10%",
    shipping_fees: "30.00",
  },
  {
    name: "Teens Top & Pant",
    image: "/offer_page_product3.png",
    price: 24,
    quantity: 3,
    seller_info: "AquaPet Seller",
    color: "Brown",
    size: "XLL",
    donation: "10%",
    shipping_fees: "30.00",
  },
  {
    name: "Teens Top & Pant",
    image: "/offer_page_product3.png",
    price: 24,
    quantity: 3,
    seller_info: "AquaPet Seller",
    color: "Brown",
    size: "XLL",
    donation: "10%",
    shipping_fees: "30.00",
  },
];

const ShoppingCartTable = () => {
  // Initialize state with quantities from productData
  const [quantities, setQuantities] = useState(
    productData.map((product) => product.quantity)
  );

  const handleQuantityChange = (idx: number, change: number) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, index) =>
        index === idx ? Math.max(quantity + change, 0) : quantity
      )
    );
  };

  return (
    <div className="col-span-2  rounded-md ">
      <Table className="lg:text-lg w-full overflow-x-auto">
        <TableHeader className="py-10 text-white bg-black">
          <TableRow className="border-none !text-white hover:bg-transparent">
            <TableHead className="text-white py-5">Fishes</TableHead>
            <TableHead className="text-white py-5 ">Price</TableHead>
            <TableHead className="text-white py-5 ">Donation</TableHead>
            <TableHead className="text-white py-5 ">Shipping Fees</TableHead>
            <TableHead className="text-white py-5  text-center">
              Quantity
            </TableHead>
            <TableHead className="text-white py-5">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData?.map((data, idx) => (
            <TableRow key={idx} className="hover:bg-transparent">
              <TableCell className="font-medium min-w-fit">
                <div className="flex gap-x-2">
                  <div className="border lg:size-8 size-6  rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 group duration-300">
                    <X
                      size={20}
                      className="group-hover:text-red-700 duration-300"
                    />
                  </div>
                  <div className=" flex flex-col lg:flex-row items-center md:gap-3 gap-1  min-w-fit">
                    <Image
                      src={data?.image}
                      alt="product_image"
                      width={950}
                      height={700}
                      className="md:size-28 size-20 rounded object-cover origin-center"
                    />
                    <div className="flex flex-col lg:gap-y-1">
                      <p className="truncate font-medium lg:text-lg text-sm">
                        {data?.name}
                      </p>
                      <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-500">
                        <p>Seller info:</p>
                        <p>{data?.seller_info}</p>
                      </div>
                      <div className="flex gap-x-2">
                        <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-500 border-r-2 pr-2">
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
              <TableCell>${data?.price}</TableCell>
              <TableCell className="text-center">${data?.donation}</TableCell>
              <TableCell className="text-center">${data?.shipping_fees}</TableCell>
              <TableCell className=" ">
                {/* quantity */}
                <div className="border-2  rounded-full flex items-center gap-x-3 max-w-fit mx-auto  ">
                  <button
                    onClick={() => handleQuantityChange(idx, -1)}
                    className={`size-10 border flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300 cursor-pointer hover:bg-black/50`}
                    disabled={quantities[idx] === 1}
                  >
                    -
                  </button>
                  <p>{quantities[idx]}</p>
                  <button
                    onClick={() => handleQuantityChange(idx, 1)}
                    className=" size-10 border flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300 cursor-pointer hover:bg-black/50"
                  >
                    +
                  </button>
                </div>
              </TableCell>
              <TableCell>
                ${(Number(quantities[idx]) * Number(data?.price)).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr />
      <div className="flex flex-wrap gap-2 md:justify-between items-center justify-center px-4 mt-5">
        <Link href="/shop">
          <Button className=" text-primary-black hover:text-primary-white  ease-in  group overflow-hidden cursor-pointer group bg-white border">
            <AnimatedArrowReverse />
            Return to shop
          </Button>
        </Link>
        <Button className=" text-primary-black  hover:text-primary-white hover:bg-gray-500  cursor-pointer bg-white border">
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCartTable;
