import { MySellProducts } from '@/lib/services/Products';
import React, { Suspense } from 'react'
import SellProducts from './_components/SellProducts';
import SellProductsContainer from './_components/SellProductsContainer';

async function SellProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const ssp = await searchParams;

    const { category, sortBy: sort, brand, priceMin, priceMax, size, color, condition } = ssp;

    let sortBy = "createdAt";
    let orderBy = "desc"

    if (sort == "newest") {
        orderBy = "desc"
    } else if (sort == "-price") {
        sortBy = "finalPrice";
        orderBy = "asc"
    }
    else if (sort == "price") {
        sortBy = "finalPrice";
        orderBy = "desc"
    }

    const query: any = { sortBy, sortOrder: orderBy, limit: 24 }

    if (category) {
        query.category = category
    }

    if (brand) {
        query.brands = brand
    }
    if (priceMin) {
        query.minPrice = priceMin
    }
    if (priceMax) {
        query.maxPrice = priceMax
    }
    if (size) {
        query.sizes = size
    }
    if (color) {
        query.colors = color
    }
    if (condition) {
        query.conditions = condition
    }

    const prodPromise = MySellProducts({ query });

    return (
        <div className="space-y-5 lg:space-y-8">

            <div className='md:pt-3 lg:pt-5'>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Sell Listings</h2>
                </div>
                <p className="mt-1 text-sm text-gray-600 max-w-md">
                    Track every listing you've placed for products you want to sell & take action on them as needed.
                </p>
            </div>

            <Suspense fallback={<div className="flex-center h-28 lg:h-40">
                <span className="loaderDark !w-10"> </span>
            </div>}>
                <SellProductsContainer prodPromise={prodPromise} query={query} />
            </Suspense>

        </div>
    )
}

export default SellProductsPage