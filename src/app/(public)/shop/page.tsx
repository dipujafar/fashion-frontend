import Container from "@/components/shared/Container";
import React, { Suspense } from "react";
import ShopPageContainer from "./_components/ShopPageContainer";

export const metadata = {
  title: "Shop",
  description: "Enjoy your shopping with Fashion!",
};

const ShopPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <ShopPageContainer></ShopPageContainer>
      </Container>
    </Suspense>
  );
};

export default ShopPage;
