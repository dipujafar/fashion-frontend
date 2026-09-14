import React, { Suspense } from 'react'
import { GetUserbadgeStats } from '@/lib/services/UserDetails';
import BadgeContainer from './_components/BadgeContainer';

async function BadgePage() {

  const req_promise = GetUserbadgeStats();

  return (
    <div className="space-y-5">

      <div className='mt-5'>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Badges Progress</h2>
        </div>
        <p className="mt-1 text-sm text-gray-700 max-w-2xl">
          Track your progress and achievements by viewing the badges you've earned and the ones you're working towards. Each badge represents a milestone in your journey with FASHI-ON, showcasing your dedication and accomplishments.
        </p>
      </div>

      <Suspense fallback={<div className="flex-center h-28 lg:h-40">
        <span className="loaderDark !w-10"> </span>
      </div>}>
        <BadgeContainer req_promise={req_promise} />
      </Suspense>

    </div>
  )
}


export default BadgePage