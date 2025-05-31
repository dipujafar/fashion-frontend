import CommonButton from "@/components/ui/common-button";
import { cn } from "@/lib/utils";
import { TOfferProduct } from "@/types";
import Image from "next/image";

export function OfferProductCard({ product }: { product: TOfferProduct }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex gap-2">
          <div className="w-1/2">
            <Image
              width={220}
              height={220}
              src={product.images[0] || "/placeholder.svg"}
              alt={`Product ${product.itemNumber}`}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
          <div className="w-1/2 grid grid-cols-2 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <Image
                width={110}
                height={110}
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Product ${product.itemNumber} thumbnail ${index + 1}`}
                className="w-full h-auto rounded-md object-cover"
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Item Number</p>
            <p className="font-medium">{product.itemNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p
              className={cn(
                "font-medium",
                product.status === "Offer Accepted" && "text-green-600",
                product.status === "Expired" && "text-red-600"
              )}
            >
              {product.status}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Product Price</p>
            <p className="font-medium">${product.productPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Offer Price</p>
            <p className="font-medium">${product.offerPrice.toFixed(2)}</p>
          </div>
        </div>

        {product.timeRemaining && (
          <p
            className={cn(
              "text-sm mt-2",
              product.status === "Offer Accepted"
                ? "text-green-600"
                : "text-red-600"
            )}
          >
            {product.status === "Expired"
              ? "Expired"
              : `Expire in ${product.timeRemaining}`}
          </p>
        )}
        {!product.timeRemaining && product.status === "Expired" && (
          <p className="text-sm mt-2 text-red-600">Expired</p>
        )}
      </div>

      <div className="border-t p-4">
        <CommonButton className=" w-full bg-transparent text-black  hover:bg-black/20 group duration-500 border-b-3 border-r-3 border-black">
          {product.status === "Offer Accepted" ? "BUY NOW" : "MESSAGE SELLER"}
        </CommonButton>
      </div>
    </div>
  );
}
