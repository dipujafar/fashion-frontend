"use client";
import { cn } from "@/lib/utils";
import { useAddFavoriteProductMutation, useDeleteFavoriteProductMutation } from "@/redux/api/favoriteProductApi";
import { useAppSelector } from "@/redux/hooks";
import { ILoggedInUser } from "@/types";
import { Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type IIncludedProduct = {
    id: string
}

export default function FavoriteIcon({ id, count, includedProduct, className }: { id: string, count: number, includedProduct: IIncludedProduct[], className?: string }) {
    const [addFavoriteList, { isLoading }] = useAddFavoriteProductMutation();
    const [deleteFavoriteList, { isLoading: isDeleting }] = useDeleteFavoriteProductMutation();
    const pathName = usePathname();
    const router = useRouter();
    
    const user = useAppSelector((state) => state.auth.user);


    const addFavorite = async () => {
        if (!user) {
            router.push(`/sign-in?callbackUrl=${pathName}`);

        }
        else if (isLoading || isDeleting) {
            toast.error("Please try again.");
        }
        else if (includedProduct?.length > 0) {
            try {
                await deleteFavoriteList(id).unwrap();
            }
            catch (error: any) {
                toast.error(error?.data?.message);
            }
        }
        else {
            try {
                await addFavoriteList({ productId: id }).unwrap();
            }
            catch (error: any) {
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
