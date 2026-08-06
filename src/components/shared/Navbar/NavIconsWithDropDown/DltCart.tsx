"use client"
import { DeleteFromCart } from '@/lib/Actions/Cart.action';
import { tags } from '@/utils/serverTags';
import { LoaderCircle, Trash2 } from 'lucide-react'
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import React from 'react'
import { toast } from 'sonner';

function DltCart({ cartItemId, productId }: { cartItemId: string, productId: string }) {
    const [isLoading, setLoading] = React.useState(false);

    const handleDltTocart = async (productId: string) => {
        setLoading(true);
        try {
            const res = await DeleteFromCart({ payload: { productId, itemId: cartItemId }, extraRevalidatePaths: [tags.carts] });
            if (res?.error) {
                toast.error(res?.error);
            }
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error;
            }
            toast.error(error?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='mt-1'>
            {
                isLoading ? <LoaderCircle color="red" className='animate-spin size-5' /> : <button className="mt-1 cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    handleDltTocart(productId);
                }}>
                    <Trash2 className="text-red-500 hover:text-red-700 size-5" />
                </button>
            }
        </div>
    )
}

export default DltCart