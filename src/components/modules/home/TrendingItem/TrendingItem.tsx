import Container from "@/components/shared/Container";
import TrendingTitle from "./TrendingTitle";
import { IProduct } from "@/types";
import GetTrendingProds from "@/lib/services/TrendingProds";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/skeletons/ProductsCardSkeleton";
import PreviewProduct from "@/components/shared/DisplayProductSection/PreviewProduct";

const TrendingItem = () => {

  const prodPromise = GetTrendingProds();

  return (
    <Container>
      <TrendingTitle />

      <Suspense fallback={<ProductGridSkeleton />}>
        <Products prodPromise={prodPromise} />
      </Suspense>

    </Container>
  );
};

export default TrendingItem;

const Products = async ({ prodPromise }: { prodPromise: Promise<{ data: IProduct[] }> }) => {
  const res = await prodPromise;

  return <PreviewProduct productData={res?.data} />
}
