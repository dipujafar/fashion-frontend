import Container from "@/components/shared/Container";
import React, { Suspense } from "react";
import ShopPageContainer from "./_components/ShopPageContainer";
import { ProductGridSkeleton } from "@/components/skeletons/ProductsCardSkeleton";

export const metadata = {
  title: "Shop",
  description: "Enjoy your shopping with Fashion!",
};

const ShopPage = () => {
  return (
    <Suspense fallback={<Container><ProductGridSkeleton /></Container>}>
      <Container>
        <ShopPageContainer></ShopPageContainer>
      </Container>
    </Suspense>
  );
};

export default ShopPage;
