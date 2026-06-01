import Link from 'next/link';
import React from 'react'

async function MemberStats({ statPromise, memberId }: {
    memberId: string,
    statPromise: Promise<{
        data: {
            totalProducts: number,
            totalSold: number,
            totalFollowers: number,
            totalDonation: number,
        }
    }>
}) {

    const { data } = await statPromise;

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold mb-1">{data?.totalProducts}+</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Total Products</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold mb-1">{data?.totalSold}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Items Sold</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold mb-1">{data?.totalFollowers}+</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Followers</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-amber-500 mb-1">${data?.totalDonation.toFixed(2)}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Donations Made. <Link href={`/member/${memberId}/donations`} className='font-semibold text-black underline underline-offset-1 cursor-pointer'>View</Link></p>
            </div>

        </div>
    )
}

export default MemberStats