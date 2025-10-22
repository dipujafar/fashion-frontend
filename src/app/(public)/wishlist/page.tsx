import React from "react";
import WishListTable from "./_components/WishListTable";
import Container from "@/components/shared/Container";
import WishListMobileContainer from "./_components/wishListForMobile/WishListMobileContainer";

export default function WishListPage() {
  return (
    <Container>
      <div className=" md:hidden">
        <WishListMobileContainer />
      </div>
      <div className="hidden md:block">
        <WishListTable />
      </div>
    </Container>
  );
}
