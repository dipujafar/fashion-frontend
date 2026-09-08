import React from 'react'
import { IAssitedSellRequest, IMeta } from '@/types'
import SellreqCard from './SellreqCard';
import Empty from '@/components/ui/empty';
import PaginationSection from '@/components/shared/Pagination/PaginationSection';


async function AssistedSellRequestsContainer({
    prodPromise,
    page
}:
    {
        prodPromise: Promise<{ data: { data: IAssitedSellRequest[], meta: IMeta } }>,
        page: string | undefined
    }) {

    const prods = await prodPromise;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 xl:gap-6">
                {prods?.data?.data?.map((prod) => (
                    <SellreqCard data={prod} key={prod?.id}></SellreqCard>
                ))}
            </div>
            {
                prods?.data?.data?.length === 0 && <Empty message="No requests available" className="my-10" />
            }
            {
                prods?.data?.meta && <PaginationSection className="mt-5" current={Number(page) || 1} total={prods?.data?.meta?.total || 1} />
            }
        </div>
    )
}

export default AssistedSellRequestsContainer