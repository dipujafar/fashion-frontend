import React from 'react'
import BuildBundleContainer from './_components/BuildBundleContainer'

async function BuildBundlePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    return (
        <BuildBundleContainer userName={username} />
    )
}

export default BuildBundlePage