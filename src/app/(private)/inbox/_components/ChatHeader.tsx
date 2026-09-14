"use client"
import { ReportDialog } from '@/components/shared/Message/ReportDialog'
import Image from 'next/image'
import React from 'react'
import { useGetUserByUsernameQuery } from '@/redux/api/userApi';
import { Skeleton } from '@/components/ui/skeleton';
import { defaultImg } from '@/utils/defaultImg';
import moment from 'moment';
import Link from 'next/link';

function formatLastActive(date: Date | string) {
    const activeDate = moment(date);
    const now = moment();

    let dateText: string;

    if (activeDate.isSame(now, "day")) {
        dateText = "today";
    } else if (activeDate.isSame(now.clone().subtract(1, "day"), "day")) {
        dateText = "yesterday";
    } else if (activeDate.isSame(now, "week")) {
        dateText = activeDate.format("dddd");
    } else {
        dateText = activeDate.format("D MMMM");
    }

    return `last active ${dateText} at ${activeDate.format("h:mm A")}`;
}

function ChatHeader({ userName }: { userName: string }) {

    const { data: userData, isLoading, isSuccess } = useGetUserByUsernameQuery({ username: userName });

    if (isLoading) {
        return <Skeleton className="w-full h-16 rounded-none" />
    }

    return (
        isSuccess ? <div>

            <div className="border-b border-gray-200 flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-x-3">

                    <Link href={`/member/${userData?.data?.user?.userName}`}>
                        <Image
                            src={userData?.data?.user?.picture?.url || defaultImg?.empty_user}
                            alt="user image"
                            height={500}
                            placeholder='blur'
                            blurDataURL={defaultImg?.placeholderImg}
                            width={500}
                            className="h-12 w-12 object-cover rounded-full"
                        />
                    </Link>

                    <Link href={`/member/${userData?.data?.user?.userName}`}>
                        <div className="lg:flex-grow">
                            <h3 className="text-base font-semibold">{userData?.data?.user?.userName || 'Unknown'}</h3>
                            {userData?.data?.user?.lastOnlineAt && <p className="text-sm">{formatLastActive(userData?.data?.user?.lastOnlineAt)}</p>}
                        </div>
                    </Link>
                </div>
                <div>
                    <ReportDialog />
                </div>
            </div>
        </div> : <></>
    )
}

export default ChatHeader