import Container from "@/components/shared/Container";
import React, { Suspense } from "react";
import SellerBundleTiers from "../../../_components/SellerBundleTiers";
import BundleItems from "./BundleItems";
import { ProductGridSkeleton } from "@/components/skeletons/ProductsCardSkeleton";
import BundleFooter from "./BundleFooter";

export default function ({ userName }: { userName: string }) {

  return (
    <>
      <Container>

        {/* -----------------------------------Title------------------------------------ */}
        <div className="flex flex-row justify-between items-center my-5 gap-5">
          <div>
            <h5 className="md:text-2xl text-lg font-bold">
              Build a bundle
            </h5>
            <p className="text-base text-gray-600 max-w-base">Get discounts for purchasing multiple items together! Also, save on shipping fees.</p>
          </div>

          <SellerBundleTiers userName={userName} isShowBtn={true} />
        </div>

        {/* --------------------------------------------- all uploaded products ------------------------------------ */}
        <Suspense key={Date.now()} fallback={<ProductGridSkeleton />}>
          <BundleItems userName={userName} />
        </Suspense>

      </Container>

      <BundleFooter userName={userName} />

    </>
  );
}
