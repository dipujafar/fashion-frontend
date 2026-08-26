import { GetSimilarCategoryProds, GetSimilarFromSeller } from '@/lib/services/Products';
import { IProduct } from '@/types';
import React from 'react'
import Listingcarousel from '../_components/Listingcarousel';
import Link from 'next/link';

async function MoreBycategoryPage({ params }: { params: Promise<{ productId: string }> }) {

    const { productId } = await params;
    const res = await GetSimilarCategoryProds({ productId }) as {
        data: {
            isOwner: boolean,
            categoryId: string,
            categoryName: string,
            products: IProduct[]
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between mb-5'>
                <h2 className='text-lg md:text-xl font-semibold'>More in {res?.data?.categoryName}</h2>
                <Link href={`/shop?category=${res?.data?.categoryId}`}>
                    <p className='text-base font-semibold text-primary-light-blue hover:underline'>See More</p>
                </Link>
            </div>
            <Listingcarousel products={res?.data?.products} isOwner={res?.data?.isOwner} />
        </div>
    )
}

export default MoreBycategoryPage