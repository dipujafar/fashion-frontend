import { useGetDirectDonationRaisedQuery, useGetSellsDonationRaisedQuery } from '@/redux/api/earning.api';
import moment from 'moment';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Pagination } from 'react-pagination-bar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function SellDonationPanel() {

    const [page, setPage] = React.useState(1);

    const { isLoading, data } = useGetSellsDonationRaisedQuery({ page }, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return <div className="flex-center h-28 lg:h-40">
            <span className="loaderDark !w-10"> </span>
        </div>
    }

    return (
        <div>
            <div className="mb-1 flex items-center justify-between">
                <p className="text-sm font-medium text-black">Listing Sell Donations</p>
            </div>

            <div>
                {data?.data?.data?.map((don, i) => (
                    <div key={don?.id} className="flex items-center justify-between border-b border-black/10 py-3.5 last:border-0">
                        <div>
                            <p className="text-sm font-medium text-black">{don?.orderItem?.product?.title}</p>
                            <p className="text-xs text-black/50">Sold {moment(don?.createdAt).format('MMM DD, YYYY')} · ${don?.amount} + ${don?.extra_money} extra</p>
                        </div>
                        <p className='text-green-700 font-semibold'>
                            ${don?.total_amount}
                        </p>
                    </div>
                ))}

                {
                    data?.data?.data?.length === 0 && <div className="flex-center h-28 lg:h-40">
                        <p className="text-sm text-black/70">No donations found.</p>
                    </div>
                }

            </div>

            <center>
                < Pagination
                    currentPage={page}
                    itemsPerPage={10}
                    onPageChange={(pageNumber) => setPage(pageNumber)}
                    totalItems={data?.data?.meta?.total || 0}
                    pageNeighbours={1}
                    startLabel={null}
                    prevLabel={<ChevronLeft className="size-3" />}
                    nextLabel={<ChevronRight className="size-3" />}
                    onlyPageNumbers={true}
                    endLabel={null}
                    customClassNames={
                        {
                            rpbItemClassName: "rounded px-2 h-6 cursor-pointer border border-gray-200 ml-1.5 text-sm",
                            rpbItemClassNameActive: "border-none bg-primary-black text-white",
                        }
                    }
                />
            </center>

        </div>
    )
}

export default SellDonationPanel;

export function DirectDonationPanel() {
    const [page, setPage] = React.useState(1);

    const { isLoading, data } = useGetDirectDonationRaisedQuery({ page }, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return <div className="flex-center h-28 lg:h-40">
            <span className="loaderDark !w-10"> </span>
        </div>
    }


    return (
        <div>
            <div className="mb-1 flex items-center justify-between">
                <p className="text-sm font-medium text-black">Direct Donations</p>
            </div>

            <div>
                {data?.data?.data?.map((campaign, i) => (
                    <div
                        key={campaign?.id}
                        className="flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">

                            {campaign?.isAnonymous ? <Avatar className="h-10 w-10 flex-shrink-0">
                                <AvatarFallback>?</AvatarFallback>
                            </Avatar> : <Link href={`/member/${campaign?.charity?.userName}`} className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 flex-shrink-0">
                                    <AvatarImage
                                        src={campaign?.charity?.picture?.url}
                                        alt={campaign?.charity?.fname}
                                    />
                                    <AvatarFallback>
                                        {campaign?.charity?.fname.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                            </Link>}

                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                    {campaign?.isAnonymous ? "Anonymous" : <Link href={`/member/${campaign?.charity?.userName}`} className="text-gray-900 hover:underline underline-offset-1">
                                        {campaign?.charity?.fname} {campaign?.charity?.lname}
                                    </Link>}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    <span className='text-gray-900'></span>{moment(campaign?.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                        <p className='text-green-700 font-semibold'>${campaign?.amount.toFixed(0)}</p>
                    </div>
                ))}

                {
                    data?.data?.data?.length === 0 && <div className="flex-center h-28 lg:h-40">
                        <p className="text-sm text-black/70">No donations found.</p>
                    </div>
                }

            </div>

            <center>
                < Pagination
                    currentPage={page}
                    itemsPerPage={10}
                    onPageChange={(pageNumber) => setPage(pageNumber)}
                    totalItems={data?.data?.meta?.total || 0}
                    pageNeighbours={1}
                    startLabel={null}
                    prevLabel={<ChevronLeft className="size-3" />}
                    nextLabel={<ChevronRight className="size-3" />}
                    onlyPageNumbers={true}
                    endLabel={null}
                    customClassNames={
                        {
                            rpbItemClassName: "rounded px-2 h-6 cursor-pointer border border-gray-200 ml-1.5 text-sm",
                            rpbItemClassNameActive: "border-none bg-primary-black text-white",
                        }
                    }
                />
            </center>

        </div>
    );
}