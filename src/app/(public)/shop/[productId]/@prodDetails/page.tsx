import GetProductDetails from '@/lib/services/ProductDetails';
import React, { Suspense } from 'react'
import SingleProductDetails from '../_components/SingleProductDetails';
import { IProduct } from '@/types';
import { EnvConfig } from '@/config';
import { IProductWithUser } from '../_components/ProductDetails/ProductDetails';
import { notFound } from 'next/navigation';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ productId: string }>;
}) {

    const fallback = {
        title: "Not Found",
        description: "Listing you are looking for is not available.",
        // metadataBase: new URL('https://google.com'),
    };

    try {
        const { productId } = await params;

        const { data } = (await GetProductDetails({ id: productId })) as { data: IProduct };

        if (!data) {
            return fallback;
        }

        const productUrl = `/shop/${data?.id}`;
        const image = data?.images?.[0];

        return {
            metadataBase: new URL(EnvConfig.serverRootUrl!),

            title: `${data?.title} | Buy Online at Fashion`,
            description:
                data?.description?.slice(0, 160) ||
                `Buy ${data?.title} at the best price. Fast delivery and secure payment.`,

            keywords: [
                data?.title,
                data?.category?.name,
                "buy online",
                "fashion store",
                "ecommerce",
            ],

            alternates: {
                canonical: productUrl,
            },

            openGraph: {
                title: data?.title,
                description: data?.description,
                url: productUrl,
                siteName: "FASHION",
                type: "website",
                images: [image],
            },

            twitter: {
                card: "summary_large_image",
                title: data?.title,
                description: data?.description,
                images: [image],
            },
        };
    } catch {
        return fallback
    }
}

async function ProdDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const detail = await GetProductDetails({ id: productId }) as { data: IProductWithUser };

    if(!detail?.data) {
        return notFound();
    }

    return (
        <div>
            <SingleProductDetails product={detail} />
        </div>
    )
}

export default ProdDetailsPage