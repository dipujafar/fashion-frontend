import CommonButton from "@/components/ui/common-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TProduct } from "@/types";
import { discountAmount } from "@/utils/discont-amount";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SendOfferModal from "./SendOfferModal";
import { useState } from "react";

export default function ReviewBundleModal({
  open,
  setOpen,
  selectedProducts,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProducts: TProduct[];
}) {
  const discount = useSearchParams().get("discount");
  const router = useRouter();
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const totalPrice = selectedProducts?.reduce(
    (acc, curr) => acc + curr?.price,
    0
  );

  const handleBuyNow = () => {
    router.push("/shopping-cart/shopping");
  };

  const handleSendOffer = () => {
    setOpenOfferModal(true);
    setOpen(false);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className=" text-2xl text-[#1F2937]">
              Review Bundle
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div>
              <h3 className=" text-primary-gray mb-1">
                {selectedProducts?.length} Items
              </h3>
              <div className="flex items-center gap-x-2">
                <div className="flex flex-wrap gap-2">
                  {selectedProducts?.map((user, index) => (
                    <Image
                      key={index}
                      src={user?.image}
                      alt="user_image"
                      width={1200}
                      height={1200}
                      className="rounded-xl h-[80px] w-[80px] "
                    />
                  ))}
                </div>
              </div>
            </div>
            <hr />

            {/* ----------------------------- all features ---------------------- */}
            <div className="text-primary-gray space-y-2">
              <div className="flex gap-2 flex-wrap justify-between">
                <h4>Subtotal</h4>
                <h4>${totalPrice}</h4>
              </div>
              <div className="flex gap-2 flex-wrap justify-between">
                <h4>Shipping Fees</h4>
                <h4>$20.00</h4>
              </div>
              <div className="flex gap-2 flex-wrap justify-between">
                <h4>Buyer Protection Fee</h4>
                <h4>$2.00</h4>
              </div>
              <div className="flex gap-2 flex-wrap justify-between">
                <h4>Authentication Good fee</h4>
                <h4>$15.00</h4>
              </div>
              <div className="flex gap-2 flex-wrap justify-between text-[#059669]">
                <h4>Bundle discount ({discount}%)</h4>
                <h4>-${discountAmount(totalPrice, Number(discount))}</h4>
              </div>
            </div>
            <hr />
            <div className="flex gap-2 flex-wrap justify-between text-lg font-bold">
              <h4>Total to pay</h4>
              <h4>
                $
                {(
                  totalPrice -
                  discountAmount(totalPrice, Number(discount)) -
                  20 -
                  2 -
                  15
                ).toFixed(2)}
              </h4>
            </div>
            <div className="mt-5 flex gap-2">
              <CommonButton
                handlerFunction={handleBuyNow}
                className="flex-1 bg-transparent text-black border-b-3 border-r-3 border-black hover:bg-gray-100"
              >
                BUY NOW
              </CommonButton>
              <CommonButton handlerFunction={handleSendOffer} className="flex-1">Make an Offer</CommonButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <SendOfferModal open={openOfferModal} setOpen={setOpenOfferModal} selectedProducts={selectedProducts} />
    </>
  );
}
