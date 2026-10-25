import React from 'react'
import SupportStats from './_components/SupportStats';
import ProductsContainer from './_components/ProductsContainer';

async function CharitySupportPage({ params }: { params: Promise<{ username: string }> }) {

  const { username } = await params;
  return (
    <>
      <SupportStats userName={username} />
      <ProductsContainer userName={username} />
    </>
  )
}

export default CharitySupportPage