import ProfileFeatures from '@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures'
import { ProductGridSkeleton } from '@/components/skeletons/ProductsCardSkeleton';
import React from 'react'
import { Suspense } from 'react';
import SellerBundleTiers from '../_components/SellerBundleTiers';

async function SellerProducts({ params, searchParams }: { params: Promise<{ username: string }>, searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const { username } = await params;

  const ssp = await searchParams;

  return (
    <div className='space-y-5 lg:space-y-8'>

      <SellerBundleTiers userName={username} />

      <Suspense key={Date.now()} fallback={<ProductGridSkeleton />}>
        <ProfileFeatures userName={username} searchParams={ssp} />
      </Suspense>
    </div>
  )
}

export default SellerProducts