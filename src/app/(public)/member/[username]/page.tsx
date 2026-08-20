import ProfileFeatures from '@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures'
import { ProductGridSkeleton } from '@/components/skeletons/ProductsCardSkeleton';
import React from 'react'
import { Suspense } from 'react';

async function SellerProducts({ params, searchParams }: { params: Promise<{ username: string }>, searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const { username } = await params;

  const ssp = await searchParams;

  return (
    <Suspense key={Date.now()} fallback={<ProductGridSkeleton />}>
      <ProfileFeatures userName={username} searchParams={ssp} />
    </Suspense>
  )
}

export default SellerProducts