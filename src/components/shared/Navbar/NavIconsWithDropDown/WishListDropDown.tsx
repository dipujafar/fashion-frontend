import { productData } from "@/app/(public)/wishlist/_components/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {  HeartIcon } from "@/icons";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WishListDropDown() {
  return (
    <>
      <MenubarTrigger>
        <HeartIcon className="size-5 lg:size-6 " />
      </MenubarTrigger>
      <MenubarContent className="md:min-w-sm">
        {productData.map((product, idx: number) => (
          <div key={idx}>
            <MenubarItem className="cursor-pointer">
              <Card className="p-4 hover:shadow-md transition-shadow w-full">
                <div className="flex items-start gap-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={1200}
                    height={1200}
                    className="w-12 h-12 rounded-md object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-lg break-words">
                          {product.name}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div onClick={(e) => e.preventDefault()}>
                    <Heart fill="red" className="size-5 text-red-600 border-red-600" />
                  </div>
                </div>
              </Card>
            </MenubarItem>
          </div>
        ))}
        <Link href={"/wishlist"}>
          <Button className="w-full mt-2">View All</Button>
        </Link>
      </MenubarContent>
    </>
  );
}
