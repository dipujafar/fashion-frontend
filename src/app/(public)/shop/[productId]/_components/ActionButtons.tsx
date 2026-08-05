"use client";
import { HeartIcon, OfferIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/ui/common-button";
import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import SendOfferModal from "@/components/shared/Modal/SendOfferModal";
import { CharityDonationSelectDialog } from "@/components/shared/Modal/Charity/CharityDonationSelectDialog";
import { cn } from "@/lib/utils";
import { ILoggedInUser, IProduct } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { AddToFavourite, DeleteToFavourite } from "@/lib/Actions/Favourite.action";
import { toast } from "sonner";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { selectIsInCart } from "@/redux/features/cart.slice";

const ActionButtons = ({ product }: { product: IProduct }) => {
  const [showOpenOfferModal, setShowOpenOfferModal] = useState<boolean>(false);
  const [showOpenOpenCharityModal, setShowOpenOpenCharityModal] = useState<boolean>(false);

  const isInCart = useAppSelector(selectIsInCart(product.id));

  const pathName = usePathname();
  const router = useRouter();
  const user: ILoggedInUser | null = useAppSelector((state) => state.auth.user);

  const handleCharitySelect = () => {
    if (isInCart) {
      toast.error("Product already in cart");
      return;
    }
    setShowOpenOpenCharityModal(true);
  };

  const addFavorite = async () => {
    if (!user) {
      router.push(`/sign-in?callbackUrl=${pathName}`);
    }
    else if (product?.favourites?.length > 0) {
      try {
        const res = await DeleteToFavourite({ payload: { productId: product?.id } });
        if (res?.error) {
          toast.error(res?.error);
        }
      }
      catch (error: any) {
        if (isRedirectError(error)) {
          throw error; // Let Next.js handle the redirect
        }
        toast.error(error?.data?.message);
      }
    }
    else {
      try {
        const res = await AddToFavourite({ payload: { productId: product?.id } });
        if (res?.error) {
          toast.error(res?.error);
        }
      }
      catch (error: any) {
        if (isRedirectError(error)) {
          throw error; // Let Next.js handle the redirect
        }
        toast.error(error?.data?.message);
      }
    }

  }

  return (
    <>
      <div className="lg:space-y-8 space-y-4">
        {/* <h6 className="uppercase text-primary-gray underline">Quantity</h6> */}
        {/* =============== action buttons ================ */}
        <div className="lg:space-y-3 space-y-2 max-w-lg grid grid-cols-2 md:gap-x-3 gap-x-2 lg:w-2/3">

          {/* =============== buy now  button ================ */}
          <Button
            onClick={handleCharitySelect}
            className="w-full rounded-none py-6 font-medium col-span-2 cursor-pointer"
            variant={"default"}
          >
            Buy It Now
          </Button>

          <Button onClick={handleCharitySelect} className="py-5 border-2 border-primary-black rounded-none font-semibold cursor-pointer" variant={"outline"} disabled={isInCart}>ADD TO CART</Button>

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
      />
    </>
  );
};

export default ActionButtons;
