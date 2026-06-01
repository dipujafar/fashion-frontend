import Link from 'next/link';
import React from 'react'

async function CharityStats({ statPromise, memberId }: {
    memberId: string,
    statPromise: Promise<{
        data: {
            totalDonation: number,
            totalFollowings: number,
            totalFollowers: number
        }
    }>
}) {

    const { data } = await statPromise;

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold mb-1">{data?.totalFollowings}+</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Total Followings</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold mb-1">{data?.totalFollowers}+</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Total Followers</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-amber-500 mb-1">${data?.totalDonation.toFixed(2)}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Donations Raised.
                    {/* <Link href={`/member/${memberId}/donations-raised`} className='font-semibold text-black underline underline-offset-1 cursor-pointer'>View</Link> */}
                </p>
            </div>

        </div>
    )
}

export default CharityStats