import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCartSummary } from "@/lib/services/Cartprods";
import { Suspense } from "react";
import DonationCard from "./DonationCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AuthenticationCard from "./AuthenticationCard";
import { Button } from "@/components/ui/button";

const OrderSummaryCard = ({ cartGroupId }: { cartGroupId: string }) => {
  const summeryPromise = getCartSummary({ cartGroupId });
  // const [uploadOrder, { isLoading }] = useAddNewOrderMutation();


  // const handleOrder = async () => {
  //   try {
  //     const products = cart?.items?.map(product => {
  //       return {
  //         "productId": product?.id,
  //         "quantity": product?.quantity,
  //         "extra_donation": product?.extra_donation,
  //         "charities": product?.charities?.map(i => i?.id)
  //       }
  //     })
  //     const body = {
  //       products,
  //       treeCredit: cart?.tree_gift?.gift_amount
  //     }
  //     const res = await uploadOrder(body).unwrap();
  //     dispatch(clearCart());
  //     router.replace(res?.data);
  //   } catch (err: any) {
  //     toast.error(err?.data?.message || "Something went wrong, try again")
  //   }
  // }

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

type SummeryType = { itemTotal: number, otherTotal: number, total: number, serviceFeeCost: number, treeGiftCost: number, authenticationCost: number, bundleDiscountPercent: number, bundleDiscountAmount: number, totalExtraDonation: number }

const SummaryOverview = async ({ summeryPromise, cartGroupId }: { summeryPromise: Promise<{ data: SummeryType }>, cartGroupId: string }) => {

  const data = await summeryPromise;

  const summery = data?.data;

  const isLoading = true;

  return (
    <>
      <Card className=" hover:border hover:border-primary-color/50 duration-300 text-black h-fit rounded-none">
        <CardHeader className="mb-0">
          <CardTitle className="font-semibold text-center">
            Total Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <hr />
          <div className="space-y-3 mt-4">
            <div className="flex justify-between ">
              <p className="text-gray-700">Items Total:</p>
              <p className="font-medium">${summery?.itemTotal}</p>
            </div>

            {summery?.bundleDiscountAmount > 0 && (
              <div className="flex justify-between ">
                <p className="text-gray-700">Bundle Discount
                  <span className="bg-green-600/20 text-green-600 rounded px-1 py-0.5 ml-1 text-sm">
                    {summery?.bundleDiscountPercent}%
                  </span> :</p>
                <p className="font-medium text-green-600">-${summery?.bundleDiscountAmount?.toFixed(2)}</p>
              </div>
            )}

            {/* <div className="flex justify-between ">
          <p className="text-[#8A8A8A]">Total Shipping:</p>
          <p className="font-medium">${cart?.total_shippingFee?.toFixed(2)}</p>
        </div> */}

            <div className="flex justify-between ">
              <p className="text-gray-700">Extra Donation:</p>
              <p className="font-medium">${summery?.totalExtraDonation?.toFixed(2)}</p>
            </div>

            {/* <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Extra Donation:</p>
            <p className="font-medium">$25.00</p>
          </div> */}

            <div className="flex justify-between ">
              <p className="text-gray-700 flex flex-row gap-x-1 items-center">Service Fee
                <Tooltip>
                  <TooltipTrigger>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark text-black cursor-pointer"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                  </TooltipTrigger>

                  <TooltipContent className="rounded-none" side="top">
                    <p className="text-sm">Covers secure payment processing, buyer <br /> protection, customer support, and helps <br /> keep our marketplace safe and reliable.</p>
                  </TooltipContent>
                </Tooltip> :
              </p>
              <p className="font-medium">${summery?.serviceFeeCost?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between ">
              <p className="text-gray-700">Verify & Authentication of Goods:</p>
              <p className="font-medium">${summery?.authenticationCost?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between ">
              <p className="text-gray-700">Gift Trees:</p>
              <p className="font-medium">${summery?.treeGiftCost?.toFixed(2)}</p>
            </div>

            {/* <hr />
          <div className="flex justify-between items-center">
            <div className="text-gray-700">
              <p>Promo code:</p>
              <span>(If you have a discount code)</span>
            </div>
            <Input className="w-1/2 bg-gray-100" placeholder="Enter code" />
          </div> */}
            <hr />
            <div className="flex justify-between ">
              <p className="text-gray-800 font-semibold text-lg">Total:</p>

              <p className="font-semibold text-lg">${summery?.total?.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AuthenticationCard checked={!!summery?.authenticationCost} cartGroupId={cartGroupId} />

      <DonationCard cartGroupId={cartGroupId} defaultCostAmount={summery?.treeGiftCost || 0} />

      <Button
        size="sm"
        // onClick={handleGiftTrees}
        // disabled={treeCount < 0}
        className="flex-1 py-6 cursor-pointer rounded-none w-full font-semibold text-lg bg-green-600 hover:bg-green-500 duration-200 transition-colors">

        {!isLoading ? <span className="loader" /> : "Proceed to Payment"}

      </Button>

    </>
  )
}
