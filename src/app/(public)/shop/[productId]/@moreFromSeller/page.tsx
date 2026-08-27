import { GetSimilarFromSeller } from '@/lib/services/Products';
import { IProduct } from '@/types';
import React from 'react'
import Listingcarousel from '../_components/Listingcarousel';
import Link from 'next/link';

async function MoreFromSellerPage({ params }: { params: Promise<{ productId: string }> }) {

    const { productId } = await params;
    const res = await GetSimilarFromSeller({ productId }) as {
        data: {
            isOwner: boolean,
            sellerUserName: string,
            products: IProduct[]
        }
    };

    return (
        res?.data?.products.length > 0 && <div>
            <div className='flex items-center justify-between mb-5'>
                <h2 className='text-lg md:text-xl font-semibold'>More from this seller</h2>
                <Link href={`/member/${res?.data?.sellerUserName}`}>
                    <p className='text-base font-semibold text-primary-light-blue hover:underline'>See More</p>
                </Link>
            </div>
            <Listingcarousel products={res?.data?.products} isOwner={res?.data?.isOwner} />
        </div>
    )
}

export default MoreFromSellerPage