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
        <div className="lg:space-y-3 space-y-2 max-w-lg grid grid-cols-2 md:gap-x-3 gap-x-2 ">
          {/* =============== quantity &  add to cart  button ================ */}
          <div className="flex items-center lg:gap-x-6 gap-x-4">
            {/* <div className="border border-primary-gray/40 rounded-2xl flex   gap-x-2">
              <button
                className="size-10 text-xl cursor-pointer flex-center"
                onClick={() => setQuality(quality + 1)}
              >
                <Plus size={20} color="#B0B0B0" />
              </button>
              <span className="size-10 text-xl  flex-center">{quality}</span>
              <button
                disabled={quality === 1}
                className="size-10  cursor-pointer flex-center"
                onClick={() => setQuality(quality - 1)}
              >
                <Minus size={20} color="#B0B0B0" />
              </button>
            </div> */}
            <CommonButton handlerFunction={handleCharitySelect} className="flex-1" disabled={isInCart}>ADD TO CART</CommonButton>
          </div>
          {/* =============== buy now  button ================ */}
          <CommonButton
            handlerFunction={handleCharitySelect}
            className="w-full bg-primary-gray/10 text-primary-black hover:bg-primary-black/20 "
          >
            Buy It Now
          </CommonButton>

          <Button onClick={addFavorite} className=" rounded  uppercase md:min-w-40 md:py-5 cursor-pointer w-full bg-primary-gray/10 text-primary-black hover:bg-primary-black/20  group">
            {product?.favourites?.length > 0 ? "Remove from Favourite" : "Add to Favourite"}
            {/* <HeartIcon className="ml-2 size-5"></HeartIcon> */}
            <Heart className={cn(" text-primary-red duration-500 md:size-[18px] size-4", product?.favourites?.length > 0 && "fill-primary-red")}></Heart>
          </Button>

          <Button
            onClick={() => setShowOpenOfferModal(true)}
            className=" rounded  uppercase md:min-w-40 md:py-5 cursor-pointer w-full bg-primary-gray/10 text-primary-black hover:bg-primary-black/20  group"
          >
            make an offer <OfferIcon className="ml-2 size-5"></OfferIcon>
          </Button>
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
