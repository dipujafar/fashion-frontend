import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AddNewOffer } from "@/lib/Actions/Product.api";
import { cn } from "@/lib/utils";
import { IProduct } from "@/types";
import { defaultImg } from "@/utils/defaultImg";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function SendOfferModal({
  open,
  setOpen,
  product
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProduct;
}) {

  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [isCustomOffer, setIsCustomOffer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOffer = async () => {
    setIsLoading(true);
    try {
      const payload = {
        sellerId: product?.userId,
        offerPrice: offerPrice,
        productIds: [product?.id]
      };

      const res = await AddNewOffer({ payload });

      toast.success("Offer sent successfully!");

      setError(null);
      setOpen(false);

    } catch (err: any) {
      setError(err?.message || "Offer sending failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const offerData = [
    {
      id: 1,
      discount: 5,
      price: product?.finalPrice - (product?.finalPrice * 5) / 100,
    },
    {
      id: 2,
      discount: 10,
      price: product?.finalPrice - (product?.finalPrice * 10) / 100,
    },
    {
      id: 3,
      discount: 15,
      price: product?.finalPrice - (product?.finalPrice * 15) / 100,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="w-[700px] rounded-none overflow-y-auto max-h-screen">

        <DialogHeader className="border-b border-gray-200 pb-3.5">
          <h2 className="text-base font-medium text-center">Send Offer</h2>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex md:flex-row flex-col  gap-x-4">
            <div className="relative">
              <Image
                src={product?.images[0]?.url || defaultImg?.product}
                alt="hero image"
                width={500}
                height={500}
                placeholder="blur"
                blurDataURL={defaultImg?.placeholderImg}
                className="h-28 w-28 rounded object-cover "
              />

            </div>

            <div className="text-base">
              <p className="text-base">
                {product?.title}
              </p>
              <p className="text-gray-700">{product?.size?.title}</p>
              <p className="text-gray-700">Price: <span className="font-semibold text-primary-black">${product?.finalPrice?.toFixed(2)}</span></p>

              {/* <p className="text-[#E12728]">Offer Expire in 24 hrs</p> */}
            </div>
          </div>
          <div className="">

            <div className={cn("grid grid-cols-4 items-center gap-3 flex-wrap")}>
              {offerData?.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => {
                    setIsCustomOffer(false);
                    setOfferPrice(item?.price);
                  }}
                  className={cn("text-center py-2 px-5 rounded border border-gray-200 cursor-pointer shadow-sm text-sm h-full font-medium text-gray-700", offerPrice === item?.price && " border-black bg-zinc-50")}
                >
                  <span className="font-semibold ">${item?.price.toFixed(2)}</span> for <br /> {item?.discount}% off
                </button>
              ))}
              <button
                onClick={() => {
                  setIsCustomOffer(true);
                  setOfferPrice(0);
                }}
                className={cn("text-center py-2 px-5 rounded border border-gray-200 cursor-pointer h-full shadow flex flex-col items-center justify-center tex-sm", isCustomOffer && " border-black bg-zinc-50")}
              >
                <Plus />
                Custom
              </button>
            </div>

            {isCustomOffer && <div className="py-5">
              <p className="text-sm font-medium text-black mb-2">Custom Offer</p>
              <Input
                placeholder="Enter your offer price"
                value={offerPrice}
                onChange={(e) => setOfferPrice(parseFloat(e.target.value) || 0)}
                className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
              />
              {/* <div className="flex mt-2 items-center gap-x-0.5">
                <InfoIcon3 />
                <p className="text-[#E12728] line-clamp-1 text-base">
                  The lowest amount you can offer is £210.00 for (20% off).
                </p>
              </div> */}
            </div>}

          </div>

          {error && (
            <div className="rounded border border-red-300 bg-red-50 px-3 py-2">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* ------------------------------- action buttons ------------------------------- */}
          <div className="mt-5 flex gap-2">
            <Button disabled={offerPrice === 0 || isLoading} onClick={handleSendOffer} className="w-full h-11 rounded-none cursor-pointer">
              {isLoading ? <span className="loader" /> : "Send Offer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
