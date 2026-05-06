import React from 'react'
import DonationStats from '../_components/DonationStats'
import GetMemberDonationStats from '@/lib/services/Donation';

export type DonationSummary = {
  totalSellDonationAmount: number;
  totalTreeDonationAmount: number;
  totalExtraDonated: number;
  totalPurchaseDonationContribute: number;
  clothDonation: number;
  directDonation: number;
  total: number;
};

async function Statspage({ params }: { params: Promise<{ username: string }> }) {

  const { username } = await params;

  const result = await GetMemberDonationStats({ username }) as {data : DonationSummary}

  return (
    <DonationStats stats={result?.data}/>
  )
}

export default Statspage