import { GetSimilarColorProds } from '@/lib/services/Products';
import { IProduct } from '@/types';
import React from 'react'
import Listingcarousel from '../_components/Listingcarousel';
import Link from 'next/link';

async function MoreByColorPage({ params }: { params: Promise<{ productId: string }> }) {

    const { productId } = await params;
    const res = await GetSimilarColorProds({ productId }) as {
        data: {
            isOwner: boolean,
            color: string,
            products: IProduct[]
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between mb-5'>
                <h2 className='text-lg md:text-xl font-semibold'>More in {res?.data?.color} Color</h2>
                <Link href={`/shop?color=${res?.data?.color}`}>
                    <p className='text-base font-semibold text-primary-light-blue hover:underline'>See More</p>
                </Link>
            </div>
            <Listingcarousel products={res?.data?.products} isOwner={res?.data?.isOwner} />
        </div>
    )
}

export default MoreByColorPage