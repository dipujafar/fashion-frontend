import ProductCard from "@/components/shared/Cards/ProductCard";
import Container from "@/components/shared/Container";
import { productsData } from "@/data/dummyData.tsx";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import GetProductsByType from "@/lib/services/ProductsByType";
import { IProduct } from "@/types";
import { ProductGridSkeleton } from "@/components/skeletons/ProductsCardSkeleton";
import FeatureProdcards from "./FeatureProdcards";
import FeatureProdTitle from "./FeatureProdTitle";

const FeatureProduct = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const query: { type?: string } = {};

  const type = searchParams.type;

  // if (type) {
  //   query.type = type
  // }

  const prodPromise = GetProductsByType({ query });

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
