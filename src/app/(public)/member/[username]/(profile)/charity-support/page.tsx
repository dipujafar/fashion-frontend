import React from 'react'
import SupportStats from './_components/SupportStats';

async function CharitySupportPage({ params }: { params: Promise<{ username: string }> }) {

  const { username } = await params;
  return (
    <SupportStats userName={username} />
  )
}

export default CharitySupportPage