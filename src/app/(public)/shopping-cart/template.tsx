import { ReactNode } from "react";

import Container from "@/components/shared/Container";
import OrderSummaryCard from "./_components/OrderSummaryCard";

const ShoppingPageTemplate = ({children}: {children: ReactNode}) => {
  return (
    <Container className="md:pt-10 md:pb-16 pt-5 pb-8">
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 xl:gap-x-7 gap-y-5  justify-center">
        {children}
        <OrderSummaryCard />
      </div>
    </Container>
  );
};

export default ShoppingPageTemplate;
