"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import ProductCard from "@/components/shared/Cards/ProductCard";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/ui/common-button";
import { productsData } from "@/data/dummyData.tsx";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function () {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const discount = useSearchParams().get("discount");

  const allAddedData = productsData?.filter((user) =>
    selectedProducts?.includes(user?._id)
  );
  console.log("allAddedData", allAddedData);

  return (
    <Container>
      {/* -------------------------------------------------- added products for bundle -------------------------------- */}
      <div className="flex justify-between items-center">
        <div>
            <div className="flex flex-col gap-y-2">
                <div className="flex">Item: {selectedProducts?.length}</div>
                <div className="flex">Price: ${allAddedData?.reduce((acc, curr) => acc + curr?.price, 0)}</div>
                <div className="flex">Bundle Discount: {discount}  </div>
            </div>
        </div>
        <CommonButton className="bg-transparent text-primary-black border-b-2 border-r-2 border-black hover:bg-gray-100">Review Bundle</CommonButton>
      </div>
      {/* ----------------------------------------------------------------------------------------------------- */}
      <div>
        <h5 className="md:text-2xl text-lg font-bold text-center mb-4">
          Build a bundle
        </h5>
      </div>
      {/* --------------------------------------------- all uploaded products ------------------------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4   2xl:grid-cols-5  gap-4 xl:gap-6 ">
        {productsData?.map((user) => (
          <ProductCard data={user} key={user?._id} ownProduct={true}>
            {/* -------------------------------- add to bundle button and remove button ---------------------------- */}
            <div className="-translate-y-2">
              {selectedProducts?.includes(user?._id) ? (
                <Button
                  onClick={() =>
                    setSelectedProducts([
                      ...selectedProducts.filter((id) => id !== user?._id),
                    ])
                  }
                  variant={"outline"}
                  className={cn(
                    "w-full cursor-pointer bg-transparent  border-[#E12728] text-[#E12728] hover:bg-[#E12728] hover:text-white duration-300"
                  )}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    setSelectedProducts([user?._id, ...selectedProducts])
                  }
                  variant={"outline"}
                  className={cn("w-full cursor-pointer border-[#232323]")}
                >
                  Added to bundle
                </Button>
              )}
            </div>
          </ProductCard>
        ))}
      </div>
    </Container>
  );
}
