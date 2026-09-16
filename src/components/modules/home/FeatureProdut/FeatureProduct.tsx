import Container from "@/components/shared/Container";
import React, { Suspense } from "react";
import { IProduct } from "@/types";
import { ProductGridSkeleton } from "@/components/skeletons/ProductsCardSkeleton";
import FeatureProdcards from "./FeatureProdcards";
import GetTrendingProds from "@/lib/services/TrendingProds";

const FeatureProduct = async () => {

  const prodPromise = GetTrendingProds();

  return (
    <Container className="lg:space-y-8 space-y-4">

      {/* <FeatureProdTitle /> */}

      {/* --------------Products------------ */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <Products prodPromise={prodPromise} />
      </Suspense>

    </Container>
  );
};

export default FeatureProduct;

const Products = async ({ prodPromise }: { prodPromise: Promise<{ data: IProduct[] }> }) => {
  const res = await prodPromise;

  return <FeatureProdcards productsData={res?.data} />
}
