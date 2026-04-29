"use client"
import { DeleteToFavourite } from '@/lib/Actions/Favourite.action';
import { Trash2 } from 'lucide-react';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import React from 'react'
import { toast } from 'sonner';

function DltToFavourite({ prodId }: { prodId: string }) {

    const deleteFavorite = async (prodId: string) => {

        try {
            const res = await DeleteToFavourite({ payload: { productId: prodId } });
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

    return (
        <button onClick={() => deleteFavorite(prodId)} className='cursor-pointer'>
            <Trash2 className="size-5 text-red-600 " />
        </button>
    )
}

export default DltToFavourite