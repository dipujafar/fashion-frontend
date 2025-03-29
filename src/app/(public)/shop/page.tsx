import Container from "@/components/shared/Container";
import React from "react";
import ShopPageContainer from "./_components/ShopPageContainer";

export const metadata = {
  title: "Shop",
  description: "Enjoy your shopping with Fashion!",
};

const ShopPage = () => {
  return (
    <Container>
      <ShopPageContainer></ShopPageContainer>
    </Container>
  );
};

export default ShopPage;
