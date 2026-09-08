import React, { Suspense } from 'react'
import AssistedSellRequestsContainer from './_components/AssistedSellRequestsContainer';
import { GetAssistedSellReqs } from '@/lib/services/AssistedSellReqs';

async function AssistedSell({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const ssp = await searchParams;

  const { page, sortBy: sort, status } = ssp;

  let sortBy = "createdAt";
  let orderBy = "desc"

  if (sort == "newest") {
    orderBy = "desc"
  } else if (sort == "-price") {
    sortBy = "subtotal";
    orderBy = "asc"
  }
  else if (sort == "price") {
    sortBy = "subtotal";
    orderBy = "desc"
  }

  const query: any = { sortBy, sortOrder: orderBy }

  if (page) {
    query.page = page
  }

  const req_promise = GetAssistedSellReqs({ query });

  return (
    <div className="space-y-5">

      <div className='mt-5'>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Sell Requests</h2>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          Track every request you've made to sell products by FASHI-ON team.
        </p>
      </div>

      <Suspense fallback={<div className="flex-center h-28 lg:h-40">
        <span className="loaderDark !w-10"> </span>
      </div>}>
        <AssistedSellRequestsContainer prodPromise={req_promise} page={page} />
      </Suspense>

    </div>
  )
}
export default AssistedSell