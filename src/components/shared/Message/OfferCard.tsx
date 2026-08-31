import { useState } from "react";
import { IOffer } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { defaultImg } from "@/utils/defaultImg";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { AcceptOffer } from "@/lib/Actions/Product.api";
import { toast } from "sonner";
import CounterOffer from "./CounterOffer";

const VISIBLE_COUNT = 3;

function OfferCard({ offer, isSent, isImSellerForThisOffer }: { offer: IOffer, isSent: boolean, isImSellerForThisOffer: boolean }) {
  const [open, setOpen] = useState(false);

  const [loadingAccept, setLoadingAccept] = useState(false);

  const visibleItems = offer?.offerItems.slice(0, VISIBLE_COUNT);
  const remainingCount = offer?.offerItems.length - VISIBLE_COUNT;

  const acceptOfferhandler = async (offerId: string) => {
    setLoadingAccept(true);
    try {
      await AcceptOffer({ payload: { offerId } });
    } catch (err: any) {
      toast.error(err?.message || "Failed to accept offer");
    } finally {
      setLoadingAccept(false);
    }
  }


  return (
    <div className="rounded-xl min-w-48 bg-[#DFE1E3] border border-gray-200 p-4 space-y-1">
      <p className={cn(isSent ? "text-right" : "text-left", " text-sm font-medium text-gray-900")}>
        {offer?.offerItems?.length} items on offer
      </p>

      <div className={cn(
        "flex gap-2",
        isSent ? "justify-end" : "justify-start"
      )}>
        {visibleItems.map((item, i) => (
          <Image
            src={item?.product?.images[0]?.url || defaultImg?.product}
            alt={`item-${i}`}
            key={i}
            width={50}
            height={50}
            placeholder="blur"
            blurDataURL={defaultImg?.placeholderImg}
            className="h-14 w-14 rounded object-cover"
          />
        ))}

        {remainingCount > 0 && (
          <button
            // onClick={() => setOpen(true)}
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100"
          >
            <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-medium text-white">
              +{remainingCount}
            </span>
          </button>
        )}
      </div>

      <div className={cn(
        "flex items-center gap-x-2",
        isSent ? "justify-end" : "justify-start"
      )}>
        <span className="text-sm text-gray-700 line-through">
          ${offer?.actualPrice?.toFixed(2)}
        </span>
        <span className="text-base font-semibold text-gray-900">
          ${offer?.offeredPrice?.toFixed(2)}
        </span>
      </div>

      {!isSent ? <div className={cn("flex gap-2 justify-start")}>
        {
          offer?.status === "PENDING" ? (isImSellerForThisOffer ? <>
            <CounterOffer offer={offer} />
            <Button disabled={loadingAccept} onClick={() => acceptOfferhandler(offer?.id)} className="cursor-pointer bg-green-800 hover:bg-green-700 duration-150 transition-colors">
              {loadingAccept ? <span className="loader" /> : "Accept Offer"}
            </Button>
          </> : <p className="text-sm text-gray-700 font-medium text-right">Waiting for response</p>) : <div>
            {offer?.status === "ACCEPTED" ?

              <p className="text-sm text-green-700 font-medium text-right">Offer Accepted</p>

              : offer?.status === "REJECTED" ? <p className="text-sm text-red-700 font-medium text-right">Offer Rejected</p> : <p className="text-sm text-gray-700 font-medium text-right">Waiting for response</p>}

          </div>
        }</div>

        :

        <div className="flex gap-2 justify-end">
          {offer?.status === "ACCEPTED" ?

            isImSellerForThisOffer ? <p className="text-sm text-green-700 font-medium text-right">Offer Accepted</p> : <Button
              // onClick={() => acceptOfferhandler(offer?.id)}
              className={cn(
                "cursor-pointer bg-green-800 hover:bg-green-700 duration-150 transition-colors",
                loadingAccept ? "cursor-not-allowed opacity-50" : "")}>
              {loadingAccept ? <span className="loader" /> : "Buy Now"}
            </Button>

            : offer?.status === "REJECTED" ? <p className="text-sm text-red-700 font-medium text-right">Offer Rejected</p> : <p className="text-sm text-gray-700 font-medium text-right">Waiting for response</p>}
        </div>}

      <p className="text-[10px] text-right text-gray-700">{moment(offer?.createdAt).format("h:mm a")}</p>

      {/* {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-72 rounded-xl border border-gray-200 bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[15px] font-medium text-gray-900">
                All items
              </p>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded p-1 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {items.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="aspect-square w-full rounded-lg bg-gray-100" />
                  <p className="mt-1.5 text-xs text-gray-700">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default OfferCard