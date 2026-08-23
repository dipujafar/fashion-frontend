import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rating } from '@/components/ui/rating';
import { IUser } from '@/types'
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

async function UserNavigate({ userPromise }: { userPromise: Promise<{ data: { user: IUser, review: { _avg: { rating: number }, _count: { id: number } }, isfolowing: boolean } }> }) {
    const result = await userPromise;
    const userdata = result?.data?.user;

    if (!userdata) {
        return notFound();
    }

    return (
        <Link href={`/member/${userdata?.userName}`}>
            <div className='flex flex-row justify-between items-center gap-x-5 py-2.5 lg:p-3 rounded-xs hover:bg-gray-50 duration-200 border-b border-b-gray-200'>
                <div className='flex flex-row justify-between items-center gap-x-2'>
                    <Avatar className="size-12 xl:size-14">
                        <AvatarImage src={userdata?.picture?.url} />
                        <AvatarFallback className='text-lg'>{userdata?.userName.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='font-semibold text-base'>{userdata?.userName}</p>
                        {result?.data?.review?._count?.id > 0 ? <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                <Rating rating={result?.data?.review?._avg?.rating} size={12}></Rating>
                            </div>
                            <span className="text-sm text-muted-foreground font-medium">{result?.data?.review?._count?.id} reviews</span>
                        </div> : <p className='text-gray-700 text-sm'>No Reviews Yet</p>}
                    </div>

                </div>
                <ChevronRight />
            </div></Link>
    )
}

export default UserNavigate