import React, { Suspense } from 'react'
import UserNavigate from './_components/UserNavigate'
import GetUserDetails from '@/lib/services/UserDetails';
import { Skeleton } from '@/components/ui/skeleton';

async function DonationsPage({ params }: { params: Promise<{ username: string }> }) {

  const { username } = await params;
  const userpromise = GetUserDetails({ userName: username });

  return (

    <div className='col-span-1'>
      <Suspense fallback={<Skeleton className="h-20" />}>
        <UserNavigate userPromise={userpromise} />
      </Suspense>
    </div>


  )
}

export default DonationsPage