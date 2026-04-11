"use client";
import { AddToFavourite, DeleteToFavourite } from "@/lib/Actions/Favourite.action";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { ILoggedInUser } from "@/types";
import { Heart } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type IIncludedProduct = {
    id: string
}

function FavouritesWithServer({ id, count, includedProduct, className }: { id: string, count: number, includedProduct: IIncludedProduct[], className?: string }) {

    const pathName = usePathname();
    const router = useRouter();
    const user: ILoggedInUser | null = useAppSelector((state) => state.auth.user);

    const addFavorite = async () => {
        if (!user) {
            router.push(`/sign-in?callbackUrl=${pathName}`);
        }
        else if (includedProduct?.length > 0) {
            try {
                const res = await DeleteToFavourite({ payload: { productId: id } });
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
                const res = await AddToFavourite({ payload: { productId: id } });
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
        <div onClick={addFavorite} className={cn("bg-primary-white absolute bottom-2 right-2 py-1.5 px-2.5 flex justify-center items-center gap-x-1 rounded-full cursor-pointer group duration-500 md:text-base text-sm", className)}>
            <Heart className={cn(" text-primary-red duration-500 md:size-[18px] size-4", includedProduct?.length > 0 && "fill-primary-red")}></Heart>
            {count > 0 && <p className="text-sm">{count}</p>}
        </div>
    )
}

export default FavouritesWithServer