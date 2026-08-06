"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AddToFavourite, DeleteToFavourite } from "@/lib/Actions/Favourite.action";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { toast } from "sonner";

type IIncludedProduct = {
    id: string
}

function FavouritesWithServer({ id, count, includedProduct, className, extraRevalidatePaths = [] }: { id: string, count: number, includedProduct: IIncludedProduct[], className?: string, extraRevalidatePaths?: string[] }) {

    const addFavorite = async () => {
        if (includedProduct?.length > 0) {
            try {
                const res = await DeleteToFavourite({ payload: { productId: id }, extraRevalidatePaths });
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
                const res = await AddToFavourite({ payload: { productId: id }, extraRevalidatePaths });
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
        <Tooltip>
            <TooltipTrigger><button onClick={addFavorite} className={cn("bg-primary-white py-1.5 px-2.5 flex justify-center items-center gap-x-1 rounded-full cursor-pointer group duration-500 md:text-base text-sm", className)}>
                <Heart className={cn(" text-primary-red duration-500 md:size-[18px] size-4", includedProduct?.length > 0 && "fill-primary-red")}></Heart>
                {count > 0 && <p className="text-sm">{count}</p>}
            </button>
            </TooltipTrigger>

            <TooltipContent className="rounded-none" side="bottom">
                <p className="text-xs">Get Notified if this item drops in price <br /> by adding it to the "Favourites"</p>
            </TooltipContent>

        </Tooltip>
    )
}

export default FavouritesWithServer