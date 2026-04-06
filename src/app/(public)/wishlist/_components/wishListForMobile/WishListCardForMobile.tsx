"use client";;
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import ConfirmationPopover from "@/components/shared/popover/ConfirmationPopover";
import { IWishListData } from "@/types";
import moment from "moment";
import { toast } from "sonner";
import Link from "next/link";

export function WishListCardForMobile({ product, deleteWishListProduct }: { product: IWishListData, deleteWishListProduct: (id: string) => void }) {
  const handleDelete = async (id: string) => {
    deleteWishListProduct(id);
  };

  return (
    <div className="border border-border rounded-lg p-2 bg-card space-y-1">
      {/* Features badges */}
      <div className="flex flex-col gap-y-0.5 max-w-[250px]">
      </div>

      {/* Main content */}
      <div className="flex gap-2">
        {/* Product image */}
        <Link href={`/shop/${product?.product?.id}`} className="flex-shrink-0">
          <Image
            width={100}
            height={100}
            src={product?.product?.images?.[0]?.url}
            alt={`${product?.product?.title} image`}
            placeholder="blur"
            blurDataURL={"/p-images/blurImage.jpg"}
            className="w-32 h-40 object-cover rounded"
          />
        </Link>

        {/* Product details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Link href={`/shop/${product?.product?.id}`} className="text font-semibold text-foreground">{product?.product?.title}</Link>
              <p className="text-sm text-muted-foreground">Size: {product?.product?.size?.title || "N/A"}</p>
              <p className="text-sm text-muted-foreground">Color: {product?.product?.color || "N/A"}</p>
            </div>
            <div className="flex gap-x-2 items-center">
              <div className="size-8 flex justify-center items-center rounded-full bg-gray-100 cursor-pointer">
                <ShoppingCart className="size-4" />
              </div>
              <ConfirmationPopover
                title="Are you sure you want to remove this product from your wishlist?"
                handleConfirm={() => handleDelete(product?.product?.id)}
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
              <span className="font-semibold"> ${product?.product?.finalPrice?.toFixed(2)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Date:
              <span className="font-semibold"> {moment(product?.createdAt).fromNow()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
