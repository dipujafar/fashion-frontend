import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCartSummary } from "@/lib/services/Cartprods";
import { Suspense } from "react";
import DonationCard from "./DonationCard";
import AuthenticationCard from "./AuthenticationCard";
import { OrderSummeryType } from "@/types";
import OrderSummeryTotal from "./OrderSummeryTotal";
import ProcessOrder from "./ProcessOrder";

const OrderSummaryCard = ({ cartGroupId }: { cartGroupId: string }) => {
  const summeryPromise = getCartSummary({ cartGroupId });

  return (
    <>

      <Suspense key={Date.now()} fallback={<div className="flex-center h-40 bg-white">
        <span className="loaderDark !w-12"> </span>
      </div>}>

        <div className="space-y-5">
          <SummaryOverview summeryPromise={summeryPromise} cartGroupId={cartGroupId} />

        </div>
        
      </Suspense>

    </>
  );
};

export default OrderSummaryCard;

const SummaryOverview = async ({ summeryPromise, cartGroupId }: { summeryPromise: Promise<{ data: OrderSummeryType }>, cartGroupId: string }) => {

  const data = await summeryPromise;

  const summery = data?.data;

  return (
    <>
      <Card className=" hover:border hover:border-primary-color/50 duration-300 text-black h-fit rounded-none">
        <CardHeader className="mb-0">
          <CardTitle className="font-semibold text-center">
            Total Order Summary
          </CardTitle>
        </CardHeader>
        <OrderSummeryTotal summery={summery} cartGroupId={cartGroupId} />
      </Card>

      <AuthenticationCard cartGroupId={cartGroupId} />

      <DonationCard cartGroupId={cartGroupId} />

      <ProcessOrder cartGroupId={cartGroupId} />

    </>
  )
}
