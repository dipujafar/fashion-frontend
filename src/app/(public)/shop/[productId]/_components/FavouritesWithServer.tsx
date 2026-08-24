"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AddToFavourite, DeleteToFavourite } from "@/lib/Actions/Favourite.action";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useState } from "react";
import { toast } from "sonner";

type IIncludedProduct = {
    id: string
}

function FavouritesWithServer({ id, count, includedProduct, className, extraRevalidatePaths = [] }: { id: string, count: number, includedProduct: IIncludedProduct[], className?: string, extraRevalidatePaths?: string[] }) {

    const [isFavourited, setIsFavourited] = useState<boolean>(includedProduct?.length > 0);
    const [favouriteCount, setFavouriteCount] = useState<number>(count || 0);

    const addFavorite = async () => {
        setIsFavourited(prev => !prev);
        if (includedProduct?.length > 0) {
            try {
                const res = await DeleteToFavourite({ payload: { productId: id }, extraRevalidatePaths });
                if (res?.error) {
                    toast.error(res?.error);
                }
                setFavouriteCount(prev => prev - 1);
            }
            catch (error: any) {
                if (isRedirectError(error)) {
                    throw error; // Let Next.js handle the redirect
                }
                toast.error(error?.message);
            }
        }
        else {
            try {
                const res = await AddToFavourite({ payload: { productId: id }, extraRevalidatePaths });
                if (res?.error) {
                    toast.error(res?.error);
                }
                setFavouriteCount(prev => prev + 1);
            }
            catch (error: any) {
                if (isRedirectError(error)) {
                    throw error; // Let Next.js handle the redirect
                }
                toast.error(error?.message);
            }
        }
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild><button onClick={addFavorite} className={cn("bg-primary-white py-1.5 px-1.5 flex justify-center items-center gap-x-1 rounded-full cursor-pointer group duration-500 md:text-base text-sm", className)}>
                <Heart className={cn(" text-primary-red duration-500 md:size-[18px] size-4", isFavourited && "fill-primary-red")}></Heart>
                {favouriteCount > 0 && <p className="text-sm">{favouriteCount}</p>}
            </button>
            </TooltipTrigger>

            <TooltipContent className="rounded-none" side="bottom">
                <p className="text-xs">Get Notified if this item drops in price <br /> by adding it to the "Favourites"</p>
            </TooltipContent>

        </Tooltip>
    )
}

export default FavouritesWithServer