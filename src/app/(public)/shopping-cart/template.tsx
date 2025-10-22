import { ReactNode } from "react";

import Container from "@/components/shared/Container";
import OrderSummaryCard from "./_components/OrderSummaryCard";
import DonationCard from "./_components/DonationCard";

const ShoppingPageTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Container className=" md:pb-16 pb-8">
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 xl:gap-x-7 gap-y-5  justify-center">
        <div className="xl:col-span-2">{children}</div>
        <div className="space-y-4">
          <OrderSummaryCard />
          <DonationCard />
        </div>
      </div>
    </Container>
  );
};

export default ShoppingPageTemplate;
