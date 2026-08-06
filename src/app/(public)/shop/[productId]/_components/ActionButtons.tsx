"use client";
import { OfferIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SendOfferModal from "@/components/shared/Modal/SendOfferModal";
import { CharityDonationSelectDialog } from "@/components/shared/Modal/Charity/CharityDonationSelectDialog";
import { toast } from "sonner";
import { IProductWithUser } from "./ProductDetails/ProductDetails";
import { Check } from "lucide-react";

const ActionButtons = ({ product }: { product: IProductWithUser }) => {
  const [showOpenOfferModal, setShowOpenOfferModal] = useState<boolean>(false);
  const [showOpenOpenCharityModal, setShowOpenOpenCharityModal] = useState<boolean>(false);

  const [buyMode, setBuyMode] = useState<"cart" | "buy">("cart");

  const isInCart = product?._count?.cartItems > 0 || false;

  const handleCharitySelectByCart = () => {
    setBuyMode("cart");
    setShowOpenOpenCharityModal(true);
  };

  const handleBuy = () => {
    setBuyMode("buy");
    setShowOpenOpenCharityModal(true);
  }

  return (
    <>
      <div className="lg:space-y-8 space-y-4">
        {/* <h6 className="uppercase text-primary-gray underline">Quantity</h6> */}
        {/* =============== action buttons ================ */}
        <div className="lg:space-y-3 space-y-2 max-w-lg grid grid-cols-2 md:gap-x-3 gap-x-2 2xl:w-2/3">

          {/* =============== buy now  button ================ */}
          <Button
            onClick={handleBuy}
            className="w-full rounded-none py-6 font-medium col-span-2 cursor-pointer"
            variant={"default"}
          >
            Buy It Now
          </Button>

          {isInCart ? <div className="flex flex-row gap-x-2 items-center justify-center py-1.5">
            <Check />
            <p className="text-lg font-medium">Added</p>
          </div> : <Button onClick={handleCharitySelectByCart} className="py-5 border-2 border-primary-black rounded-none font-semibold cursor-pointer" variant={"outline"} disabled={isInCart}>ADD TO CART</Button>}

          <Button onClick={() => setShowOpenOfferModal(true)} className="py-5 border-2 border-primary-black rounded-none font-semibold cursor-pointer" variant={"outline"}>Make an offer <OfferIcon className="size-5"></OfferIcon></Button>

        </div>
      </div>
      <SendOfferModal
        open={showOpenOfferModal}
        setOpen={setShowOpenOfferModal}
      />
      <CharityDonationSelectDialog
        product={product}
        open={showOpenOpenCharityModal}
        onOpenChange={setShowOpenOpenCharityModal}
        purchasePrice={product?.finalPrice}
        donationPercentage={product?.donation_percent}
        charities={product?.charities}
        buyMode={buyMode}
      />
    </>
  );
};

export default ActionButtons;
