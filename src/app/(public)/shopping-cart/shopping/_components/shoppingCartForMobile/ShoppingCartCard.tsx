"use client";;
import { useState } from "react";
import { X } from "lucide-react";
import { AuthenticateIcon } from "@/icons";
import Image from "next/image";
import ConfirmationPopover from "@/components/shared/popover/ConfirmationPopover";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  donation: string;
  shipping_fees: string;
  features: string[];
}

export function ShoppingCartCard({
  name,
  image,
  price,
  quantity,
  color,
  size,
  donation,
  shipping_fees,
  features,
}: ProductCardProps) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setCurrentQuantity(newQuantity);
    }
  };

  const handleDelete = () => {
    console.log("Deleted");
  };

  const totalPrice = price * currentQuantity;

  return (
    <div className="border border-border rounded-lg p-2 bg-card space-y-1">
      {/* Features badges */}
      <div className="flex flex-col gap-y-0.5 max-w-[250px]">
        {features?.map((feature, idx) => (
          <div
            key={idx}
            className="flex gap-x-1.5 justify-between bg-[#F3FFF9] px-1"
          >
            <div className="flex items-center gap-x-0.5">
              <AuthenticateIcon className="size-2.5" />
              <h5 className="text-[10px] text-[#00B047]">{feature}</h5>
            </div>
            <div className="flex items-center gap-x-0.5">
              <p className="text-[10px] text-[#00B047]">$15.00</p>
              <h5 className="text-xs bg-[#00B047]/20 text-[#00B047] rounded-full cursor-pointer">
                <X className="size-3" />
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex gap-2">
        {/* Product image */}
        <div className="flex-shrink-0">
          <Image
            width={100}
            height={100}
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-32 h-40 object-cover rounded"
          />
        </div>

        {/* Product details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">Size: {size}</p>
              <p className="text-sm text-muted-foreground">Color: {color}</p>
              <p className="text-sm text-muted-foreground">
                Shipping Fees: ${shipping_fees}
              </p>
            </div>
            <ConfirmationPopover
              title="Are you sure you want to remove this product from your cart?"
              handleConfirm={handleDelete}
            />
          </div>

          {/* Quantity and price section */}
          <div className="flex justify-between items-center gap-1 ">
            {/* Quantity selector */}
            <div className="border-2  rounded-full flex items-center  gap-x-1 max-w-fit  ">
              <button
                onClick={() => handleQuantityChange(currentQuantity - 1)}
                className={`size-8 border flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300 cursor-pointer hover:bg-black/50`}
              >
                −
              </button>
              <span className="px-1 border-l border-r border-border">
                {currentQuantity}
              </span>
              <button
                onClick={() => handleQuantityChange(currentQuantity + 1)}
                className=" size-8 border flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300 cursor-pointer hover:bg-black/50"
              >
                +
              </button>
            </div>

            {/* Price info */}
            <div className="">
              <p className="text-sm text-muted-foreground">
                Price:
                <span className="font-semibold"> ${totalPrice.toFixed(2)}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Donation: {donation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
