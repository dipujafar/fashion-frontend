import Container from '@/components/shared/Container'
import ProfileFeatures from '@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures'
import SellerProfile from '@/components/shared/UserProfile/SellerProfile'
import GetUserDetails from '@/lib/services/UserDetails'
import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'

async function UserdetailsPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const userpromise = GetUserDetails({ userName: username });

  return (
    <div className="space-y-5">

      <Suspense fallback={<div className='min-h-40 flex items-center justify-center'>
        <LoaderCircle size={50} className="text-4xl text-main-color animate-spin" />
      </div>}>
        <SellerProfile userPromise={userpromise} />
      </Suspense>

      <Container className="lg:space-y-8 space-y-4 mt-16">

        <ProfileFeatures userRole="professional-seller" />

      </Container>

    </div>
  )
}

export default UserdetailsPage