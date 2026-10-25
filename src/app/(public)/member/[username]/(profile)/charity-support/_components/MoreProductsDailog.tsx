import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IMeta, IProduct } from '@/types'
import React from 'react'
import ProductsDonation from './ProductsDonation'

type Props = {
    query: { [key: string]: string | undefined },
    userName: string,
    initialData: IProduct[],
    initialMeta: IMeta,
}

function MoreProductsDailog({ query, userName, initialData, initialMeta }: Props) {
    query.limit = "20"
    return (
        <div>
            <Dialog>
                <DialogTrigger className="w-auto text-gray-800 underline underline-offset-2 cursor-pointer text-sm">
                    View All Listings
                </DialogTrigger>

                <DialogContent className="w-full sm:max-w-2xl p-0 gap-0 rounded-none overflow-y-auto max-h-[calc(100vh-8rem)]">
                    <DialogHeader className="p-6 pb-4">
                        <div className="space-y-1">
                            <DialogTitle className="text-lg font-semibold text-foreground">
                                Active Listing Supporting Charity
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className='px-5 pb-5'>
                        <ProductsDonation initialData={initialData} initialMeta={initialMeta} query={query} userName={userName} />
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MoreProductsDailog
