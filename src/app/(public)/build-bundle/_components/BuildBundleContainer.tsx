"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import ProductCard from "@/components/shared/Cards/ProductCard";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/ui/common-button";
import { productsData } from "@/data/dummyData.tsx";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReviewBundleModal from "./ReviewBundleModal";

export default function () {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<TProduct[]>([]);
  const [openReviewBundleModal, setOpenReviewBundleModal] = useState(false);
  const discount = useSearchParams().get("discount");
  const minimumItems = useSearchParams().get("item");

  const allAddedData = productsData?.filter((user) =>
    selectedProductIds?.includes(user?._id)
  );

  useEffect(() => {
    setSelectedProducts(
      productsData?.filter((user) => selectedProductIds?.includes(user?._id))
    );
  }, [selectedProductIds]);

  const openReviewBundleModalHandler = () => {
    setOpenReviewBundleModal(true);
  };

  return (
    <>
      <Container>
        {/* -------------------------------------------------- added products for bundle -------------------------------- */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-x-2 items-center flex-wrap">
            <div className="flex flex-wrap gap-2">
              {selectedProducts?.map((user) => (
                <Image
                  key={user?._id}
                  src={user?.image}
                  alt="user_image"
                  width={1200}
                  height={1200}
                  className="rounded-xl h-[100px] w-[100px] "
                />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex">Item: {selectedProductIds?.length}</div>
              <div className="flex">
                Price: $
                {allAddedData?.reduce(
                  (acc: number, curr: TProduct) => acc + curr?.price,
                  0
                )}
              </div>
              <div className="flex">
                Bundle Discount: {selectedProductIds?.length ? discount : 0}%{" "}
              </div>
            </div>
          </div>
          <CommonButton
            handlerFunction={openReviewBundleModalHandler}
            disabled={selectedProductIds?.length < Number(minimumItems)}
            className="bg-transparent text-primary-black border-b-2 border-r-2 border-black hover:bg-gray-100"
          >
            Review Bundle
          </CommonButton>
        </div>
        {/* ----------------------------------------------------------------------------------------------------- */}
        <div>
          <h5 className="md:text-2xl text-lg font-bold text-center mb-4">
            Build a bundle
          </h5>
        </div>
        {/* --------------------------------------------- all uploaded products ------------------------------------ */}
        <div className="grid grid-cols-2 lg:grid-cols-3  xl:grid-cols-4   2xl:grid-cols-5  gap-4 xl:gap-6 ">
          {productsData?.map((user) => (
            <ProductCard data={user} key={user?._id}>
              {/* -------------------------------- add to bundle button and remove button ---------------------------- */}
              <div className="md:-translate-y-2 -translate-y-1">
                {selectedProductIds?.includes(user?._id) ? (
                  <Button
                    onClick={() =>
                      setSelectedProductIds([
                        ...selectedProductIds.filter((id) => id !== user?._id),
                      ])
                    }
                    variant={"outline"}
                    className={cn(
                      "w-full cursor-pointer bg-transparent  border-[#E12728] text-[#E12728] hover:bg-[#E12728] hover:text-white duration-300 h-[30px] md:h-auto "
                    )}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      setSelectedProductIds([user?._id, ...selectedProductIds])
                    }
                    variant={"outline"}
                    className={cn(
                      "w-full cursor-pointer border-[#232323] h-[30px] md:h-auto"
                    )}
                  >
                    Added to bundle
                  </Button>
                )}
              </div>
            </ProductCard>
          ))}
        </div>
      </Container>
      <ReviewBundleModal
        open={openReviewBundleModal}
        setOpen={setOpenReviewBundleModal}
        selectedProducts={selectedProducts}
      />
    </>
  );
}
