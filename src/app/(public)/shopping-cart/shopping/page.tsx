import React from "react";
import ShoppingCartTable from "./_components/ShoppingCartTable";
import ShoppingCartMobileContainer from "./_components/shoppingCartForMobile/ShoppingCartMobileContainer";
import BillingDetailsContainer from "./_components/Billing/BillingDetailsContainer";

const ShoppingPage = () => {
  return (
    <div>
      <div className="hidden md:block">
        <ShoppingCartTable />
        <div className="mt-10">
          <BillingDetailsContainer />
        </div>
      </div>
      <div className="md:hidden">
        <ShoppingCartMobileContainer />
      </div>
    </div>
  );
};

export default ShoppingPage;
