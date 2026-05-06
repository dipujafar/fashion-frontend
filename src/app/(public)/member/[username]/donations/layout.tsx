import Container from '@/components/shared/Container';
import React, { Suspense } from 'react'

function DonationLayout({
    children,
    stats,
    history,
}: {
    children: React.ReactNode;
    stats: React.ReactNode;
    history: React.ReactNode;
}) {
    return (
        <Container className="py-5">
            <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 lg:gap-12'>

                <div className='col-span-1'>
                    {children}
                </div>

                <div className='col-span-1 lg:col-span-2 xl:col-span-3'>
                    <div className='max-w-4xl mx-auto px-4 py-6'>
                        {stats}
                        {history}
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default DonationLayout