import React from "react";
import ShoppingCartTable from "./_components/ShoppingCartTable";
import ShoppingCartMobileContainer from "./_components/shoppingCartForMobile/ShoppingCartMobileContainer";

const ShoppingPage = () => {
  return (
    <div>
      <div className="hidden md:block">
        <ShoppingCartTable />
      </div>
      <div className="md:hidden">
        <ShoppingCartMobileContainer />
      </div>
    </div>
  );
};

export default ShoppingPage;
