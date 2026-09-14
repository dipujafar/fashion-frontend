import Empty from '@/components/ui/empty';
import { GetTreeDonations } from '@/lib/services/Donation'
import { ITreeDonation } from '@/types';
import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'

async function TreeDonations({ username }: { username: string }) {

  const directDonationPromise = GetTreeDonations({ username })

  return (
    <div>
      <Suspense fallback={<div className='min-h-40 flex items-center justify-center'>
        <LoaderCircle size={40} className="text-4xl text-main-color animate-spin" />
      </div>}>
        <TreeDonationlist directPromise={directDonationPromise} />
      </Suspense>
    </div>
  )
}

export default TreeDonations;

const TreeDonationlist = async ({ directPromise }: { directPromise: Promise<{ data: ITreeDonation[] }> }) => {
  const result = await directPromise;

  return <div className="space-y-4 pr-2">
    {result?.data?.length > 0 ? <div className=" space-y-4 pr-2">
      <ul className="flex justify-between items-center  font-medium">
        <li className="flex-1">SL</li>
        <li className="flex-1 text-center">Quantity</li>
        <li className="flex-1 text-center">Amount</li>
      </ul>
      {result?.data?.map((donation) => (
        <div
          key={donation.id}
          className="flex items-center justify-between  gap-4"
        >
          <span className="flex-1">{donation.id}</span>
          <span className="flex-1 text-center">{Math.ceil(donation?.treeCredit / 4)}</span>
          <span className="flex-1 text-center">{donation?.treeCredit}</span>
        </div>
      ))}
    </div> : <Empty message='No donations yet.' />}
  </div>
}