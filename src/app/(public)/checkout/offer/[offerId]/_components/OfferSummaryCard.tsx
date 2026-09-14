import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOfferCheckoutSummary } from "@/lib/services/Cartprods";
import { Suspense } from "react";
import { OrderSummeryType } from "@/types";
import OfferSummeryTotal from "./OfferSummeryTotal";
import AuthenticationCard from "../../../cart/[cartGroupId]/_components/AuthenticationCard";
import DonationCard from "../../../cart/[cartGroupId]/_components/DonationCard";
import ProcessOrder from "../../../cart/[cartGroupId]/_components/ProcessOrder";

const OfferSummaryCard = ({ offerId }: { offerId: string }) => {
  const summeryPromise = getOfferCheckoutSummary({ offerId });

  return (
    <>

      <Suspense key={Date.now()} fallback={<div className="flex-center h-40 bg-white">
        <span className="loaderDark !w-12"> </span>
      </div>}>

        <div className="space-y-5">
          <SummaryOverview summeryPromise={summeryPromise} offerId={offerId} />

        </div>

      </Suspense>

    </>
  );
};

export default OfferSummaryCard;

const SummaryOverview = async ({ summeryPromise, offerId }: { summeryPromise: Promise<{ data: OrderSummeryType }>, offerId: string }) => {

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
        <OfferSummeryTotal summery={summery} cartGroupId={offerId} />
      </Card>

      <AuthenticationCard cartGroupId={offerId} />

      <DonationCard cartGroupId={offerId} />

      <ProcessOrder cartGroupId={offerId} mode="offer" haveAnyUnavailableItems={summery?.haveAnyUnavailableItems} />

    </>
  )
}
