"use client";
import useLazyLoad from '@/hooks/useLazyLoad';
import { useLazyGetFolowersQuery } from '@/redux/api/userApi';
import { IFolow } from '@/types';
import React, { useRef } from 'react'
import { UserRow } from './Folowings';

function Folowers({ userName }: { userName: string }) {

    const [loadData, { isLoading }] = useLazyGetFolowersQuery();

    const triggerRef = useRef(null);

    const loadNextPage = async (page: number) => {
        try {

            const res = await loadData({ userName, query: { page: page.toString() } }).unwrap();
            const data = res?.data?.data || [];
            const meta = res?.data?.meta;

            // No meta or no data back -> treat as end of list
            const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;

            return { data, hasMore };
        } catch (error) {
            return { data: [], hasMore: false };
        }
    }

    const { data, hasMore } = useLazyLoad<IFolow>({
        triggerRef,
        onGrabData: loadNextPage,
        options: {}
    });

    return (
        <div className='h-96 overflow-y-auto'>
            {
                data.map((folowing) => (
                    <div key={folowing?.id} className='space-y-3'>
                        {
                            folowing?.follower && <UserRow user={folowing?.follower} />
                        }
                    </div>
                ))
            }
            {hasMore && <div ref={triggerRef} style={{ height: 1 }} />}

            {
                isLoading && hasMore && <div className="flex-center h-28 lg:h-40">
                    <span className="loaderDark !w-10"> </span>
                </div>
            }
        </div>
    )
}
export default Folowers