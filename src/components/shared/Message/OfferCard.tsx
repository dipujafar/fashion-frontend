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
import OfferView from "./OfferView";
import { useRouter } from "next/navigation";

const VISIBLE_COUNT = 3;

function OfferCard({ offer, isSent, isImSellerForThisOffer }: { offer: IOffer, isSent: boolean, isImSellerForThisOffer: boolean }) {

  const [open, setOpen] = useState(false);

  const [loadingAccept, setLoadingAccept] = useState(false);

  const router = useRouter();

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

  const haveStockOutItem = offer?.offerItems?.some(item => item?.product?.stock === 0);

  const isOfferExpired =  !offer?.expiredAt || moment().isAfter(moment(offer?.expiredAt));

  const handleBuyNow = (offerId: string) => {
    router.push(`/checkout/offer/${offerId}`);
  }

  return (
    <div className="rounded-xl min-w-48 bg-[#DFE1E3] border border-gray-200 p-4 space-y-1">
      <p className={cn(isSent ? "text-right" : "text-left", " text-sm font-medium text-gray-900")}>
        {offer?.offerItems?.length} items on offer
      </p>

      <div className={cn(
        "flex gap-2 cursor-pointer",
        isSent ? "justify-end" : "justify-start"
      )} onClick={() => setOpen(true)}>
        {visibleItems.map((item, i) => (
          <Image
            src={item?.product?.images[0]?.url || defaultImg?.product}
            alt={`item-${i}`}
            key={i}
            width={500}
            height={500}
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
          offer?.status === "PENDING" ? isImSellerForThisOffer ? <>
            {
              haveStockOutItem ? <p className="text-sm text-yellow-700 font-medium text-right">Some items are sold out</p> : <>

                <CounterOffer offer={offer} />
                <Button disabled={loadingAccept} onClick={() => acceptOfferhandler(offer?.id)} className="cursor-pointer bg-green-800 hover:bg-green-700 duration-150 transition-colors">
                  {loadingAccept ? <span className="loader" /> : "Accept Offer"}
                </Button>
              </>
            }
          </> : <p className="text-sm text-gray-700 font-medium text-right">Waiting for response</p> : <div>
            {offer?.status === "ACCEPTED" ?

              !isImSellerForThisOffer ? <>

                {
                  isOfferExpired ? <p className="text-sm text-yellow-700 font-medium text-right">Offer Expired</p> : haveStockOutItem ? <p className="text-sm text-yellow-700 font-medium text-right">Some items are sold out</p> : <div className="space-y-1">
                    <Button
                      onClick={() => handleBuyNow(offer?.id)}
                      className={cn(
                        "cursor-pointer bg-green-800 hover:bg-green-700 duration-150 transition-colors")}>
                      Buy Now
                    </Button>
                    <p className="text-red-700 text-xs">
                      Offer will expire {moment(offer?.expiredAt).calendar(null, {
                        sameDay: "[today]",
                        lastDay: "[yesterday]",
                        nextDay: "[tomorrow]",
                        sameElse: "MMM D, YYYY",
                      })} at {moment(offer?.expiredAt).format("h:mm a")}
                    </p>
                  </div>
                }

              </> : <p className="text-sm text-green-700 font-medium text-right">Offer Accepted</p>

              : offer?.status === "REJECTED" ? <p className="text-sm text-red-700 font-medium text-right">Offer Rejected</p> : <p className="text-sm text-gray-700 font-medium text-right">Waiting for response</p>}

          </div>
        }</div>

        :

        <div className="flex gap-2 justify-end">
          {offer?.status === "ACCEPTED" ?

            isImSellerForThisOffer ? <p className="text-sm gray-800 font-medium text-right">Offer Sent</p> : <>

              {
                isOfferExpired ? <p className="text-sm text-yellow-700 font-medium text-right">Offer Expired</p> : haveStockOutItem ? <p className="text-sm text-yellow-700 font-medium text-right">Some items are sold out</p> : <div className="space-y-1">
                  <Button
                    onClick={() => handleBuyNow(offer?.id)}
                    className={cn(
                      "cursor-pointer bg-green-800 hover:bg-green-700 duration-150 transition-colors")}>
                    Buy Now
                  </Button>
                  <p className="text-red-700 text-xs">
                    Offer will expire {moment(offer?.expiredAt).calendar(null, {
                      sameDay: "[today]",
                      lastDay: "[yesterday]",
                      nextDay: "[tomorrow]",
                      sameElse: "MMM D, YYYY",
                    })} at {moment(offer?.expiredAt).format("h:mm a")}
                  </p>
                </div>
              }

            </>

            : offer?.status === "REJECTED" ? <p className="text-sm text-red-700 font-medium text-right">Offer Rejected</p> : <p className="text-sm text-gray-700 font-medium text-right">Waiting for response</p>}
        </div>}

      <p className="text-[10px] text-right text-gray-700">{moment(offer?.createdAt).format("h:mm a")}</p>

      <OfferView offerItems={offer?.offerItems} open={open} setOpen={setOpen} />

    </div>
  );
}

export default OfferCard