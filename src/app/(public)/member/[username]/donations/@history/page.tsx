import React from 'react'
import DonationHistoryTabs from '../_components/DonationHistoryTabs'

async function Historypage({ searchParams, params }: { searchParams: Promise<{ [key: string]: string | undefined }>, params: Promise<{ username: string }> }) {
  const { tab } = await searchParams;

  const { username } = await params;

  const tabs = ["Sold", "Bought", "Direct", "Clothing", "Trees"];
  const activeTab = tab ? tabs.includes(tab) ? tab : "Sold" : "Sold";

  return (
    <div>
      <DonationHistoryTabs defaultTab={activeTab} username={username}/>
    </div>
  )
}

export default Historypage