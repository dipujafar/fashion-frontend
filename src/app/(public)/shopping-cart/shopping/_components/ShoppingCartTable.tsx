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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, removeFromCart, selectCartItems, updateQuantity } from "@/redux/features/cart.slice";
import { defaultImg } from "@/utils/defaultImg";

const ShoppingCartTable = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id: productId, quantity }))
    }
  };

  const dltProductTocart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const clearAllCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="col-span-2  rounded-md ">
      <Table className="lg:text-lg w-full overflow-x-auto">
        <TableHeader className="py-10 text-white bg-black">
          <TableRow className="border-none !text-white hover:bg-transparent">
            <TableHead className="text-white py-5">Product</TableHead>
            <TableHead className="text-white py-5 ">Price</TableHead>
            <TableHead className="text-white py-5 ">Extra Donation</TableHead>
            <TableHead className="text-white py-5 ">Shipping Fees</TableHead>
            <TableHead className="text-white py-5  text-center">
              Quantity
            </TableHead>
            <TableHead className="text-white py-5">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems?.map((data) => (
            <TableRow key={data?.id} className="hover:bg-transparent">
              <TableCell className="font-medium min-w-fit">
                <div className="flex gap-x-2">
                  <button onClick={() => dltProductTocart(data?.id)} className="border size-6 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 group duration-300">
                    <X className="group-hover:text-red-700 duration-300 size-4" />
                  </button>
                  <div className=" flex flex-col lg:flex-row xl:flex-col 2xl:flex-row items-center md:gap-3 gap-1  min-w-fit">
                    <Image
                      src={data?.product?.images[0]?.url || defaultImg?.product}
                      alt="product_image"
                      width={950}
                      height={700}
                      placeholder="blur"
                      blurDataURL={defaultImg?.placeholderImg}
                      className="md:size-28 size-20 rounded object-cover origin-center"
                    />
                    <div className="flex flex-col lg:gap-y-1.5">
                      {/* {data?.features?.map((feature, idx) => (
                        <div key={idx} className="flex gap-x-1.5 justify-between bg-[#F3FFF9] px-1">
                          <div className="flex items-center gap-x-0.5">
                            <AuthenticateIcon className="size-2.5" />
                            <h5 className="text-[10px] text-[#00B047]">
                              {feature}
                            </h5>
                          </div>
                          <div className="flex items-center gap-x-0.5">
                            <p className="text-[10px] text-[#00B047]">$15.00</p>
                            <h5 className="text-xs bg-[#00B047]/20 text-[#00B047] rounded-full cursor-pointer">
                              <X className="size-3" />
                            </h5>
                          </div>
                        </div>
                      ))} */}

                      <p className="truncate font-medium 2xl:text-lg text-sm">
                        {data?.product?.title}
                      </p>
                      <div className="flex gap-x-1">
                        <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-500 border-r-1 pr-2">
                          <p>Color:</p>
                          <p>{data?.product?.color}</p>
                        </div>
                        <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-500 ">
                          <p>Size:</p>
                          <p>{data?.product?.size?.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>${data?.price?.toFixed(2)}</TableCell>
              <TableCell className="text-center">${data?.extra_donation?.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                ${data?.shipping_fee}
              </TableCell>
              <TableCell className=" ">
                {/* quantity */}
                <div className="border-2  rounded-full flex items-center gap-x-3 max-w-fit mx-auto  ">
                  <button
                    onClick={() => handleQuantityChange(data?.id, (data?.quantity - 1))}
                    className={`size-8 border flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300 cursor-pointer hover:bg-black/50`}
                    disabled={data?.quantity < 1}
                  >
                    -
                  </button>
                  <p>{data?.quantity}</p>
                  <button
                    onClick={() => handleQuantityChange(data?.id, (data?.quantity + 1))}
                    className=" size-8 border flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300 cursor-pointer hover:bg-black/50"
                  >
                    +
                  </button>
                </div>
              </TableCell>
              <TableCell>
                ${data?.total_price.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {
        cartItems?.length <= 0 && <div className="min-h-64 flex flex-col items-center justify-center">
          <Image src={defaultImg?.empty_cart} height={500} width={500} alt="cart img" className="h-28 w-auto mx-auto" />
          <Link href="/shop">
            <Button className=" text-primary-black hover:text-primary-white  ease-in  group overflow-hidden cursor-pointer group bg-white border">
              Shop Now
            </Button>
          </Link>
        </div>
      }

      <hr />
      <div className="flex flex-wrap gap-2 md:justify-between items-center justify-center px-4 mt-5">
        {cartItems?.length > 0 && <Link href="/shop">
          <Button variant={"default"} className=" text-primary-black hover:text-primary-white  ease-in  group overflow-hidden cursor-pointer group bg-white border">
            <AnimatedArrowReverse />
            Return to shop
          </Button>
        </Link>}
        {cartItems?.length > 0 && <Button onClick={clearAllCart} className=" text-primary-black  hover:text-primary-white hover:bg-gray-500  cursor-pointer bg-white border">
          Clear Cart
        </Button>}
      </div>
    </div>
  );
};

export default ShoppingCartTable;
