"use client";
import useLazyLoad from '@/hooks/useLazyLoad';
import { IFolow, IUser } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useRef } from 'react'
import Link from 'next/link';
import { userRoleMapper } from '@/utils/userRoleMapper';
import { useLazyGetFolowingsQuery } from '@/redux/api/userApi';

export const UserRow = ({ user }: { user: IUser }) => (
    <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg gap-1">
        <Link href={`/member/${user?.userName}`} className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
                <AvatarImage src={user?.picture?.url} alt={user?.userName} />
                <AvatarFallback>
                    {user?.userName[0]}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-medium text-sm">{user?.userName}</span>
                <span className="text-xs text-muted-foreground">{userRoleMapper(user?.auth?.role)?.label}</span>
            </div>
        </Link>

        {/* Mobile */}
        {/* <div className="flex items-center gap-x-2 md:hidden">
        <Tooltip>
          <TooltipTrigger>
            <Link href="#">
              <UserPlus />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Follow</p>
          </TooltipContent>
        </Tooltip>
      </div> */}

        {/* Desktop */}
        {/* <div className="md:flex items-center gap-2 hidden">
        <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-transparent">
          <UserPlus className="h-3 w-3 mr-1" />
          FOLLOW
        </Button>
      </div> */}

    </div>
)

function Folowings({ userName }: { userName: string }) {

    const [loadData, { isLoading }] = useLazyGetFolowingsQuery();


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
                            folowing?.following && <UserRow user={folowing?.following} />
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

export default Folowings