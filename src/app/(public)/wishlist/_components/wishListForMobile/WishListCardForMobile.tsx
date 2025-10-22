"use client";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { AuthenticateIcon, CartIcon } from "@/icons";
import Image from "next/image";
import ConfirmationPopover from "@/components/shared/popover/ConfirmationPopover";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  date: string;
  color: string;
  size: string;
  features: string[];
}

export function WishListCardForMobile({
  name,
  image,
  price,
  date,
  color,
  size,
  features,
}: ProductCardProps) {
  const handleDelete = () => {
    console.log("Deleted");
  };

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
            </div>
            <div className="flex gap-x-2 items-center">
              <div className="size-8 flex justify-center items-center rounded-full bg-gray-100 cursor-pointer">
                <ShoppingCart className="size-4" />
              </div>
              <ConfirmationPopover
                title="Are you sure you want to remove this product from your cart?"
                handleConfirm={handleDelete}
              >
                <button className="size-8 flex justify-center items-center rounded-full bg-red-100 cursor-pointer">
                  <Trash2 className="size-3" />
                </button>
              </ConfirmationPopover>
            </div>
          </div>

          {/* Quantity and price section */}

          {/* Price info */}
          <div>
            <p className="text-sm text-muted-foreground">
              Price:
              <span className="font-semibold"> ${price.toFixed(2)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Date:
              <span className="font-semibold"> ${date}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
