// PreMessage.tsx
"use client"
import OwnerMsgCard from '@/components/shared/Message/OwnerMsgCard';
import ReceiverMsgCard from '@/components/shared/Message/ReceiverMsgCard';
import useLazyLoad from '@/hooks/useLazyLoad';
import { useGetMyMessagesMutation } from '@/redux/api/message.api';
import { RootState } from '@/redux/store';
import { IMessage } from '@/types';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

function PreMessage({
    friendUserName,
    scrollToBottom,
    containerRef,
}: {
    friendUserName: string;
    scrollToBottom: (behavior?: ScrollBehavior) => void;
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [loadProds, { isLoading }] = useGetMyMessagesMutation();
    const triggerRef = useRef(null);

    const isFirstLoad = useRef(true);
    // snapshot taken BEFORE new (older) messages get prepended
    const prevScrollHeight = useRef(0);
    const prevScrollTop = useRef(0);

    const user = useSelector((state: RootState) => state?.auth?.user);

    const loadNextPage = async (page: number) => {
        // capture scroll position right before this page's data lands
        const el = containerRef.current;
        if (el) {
            prevScrollHeight.current = el.scrollHeight;
            prevScrollTop.current = el.scrollTop;
        }

        try {
            const res = await loadProds({ friendUserName, params: { page, limit: 30 } }).unwrap();
            const raw = res?.data?.data || [];

            // raw is frozen (Immer/RTK Query) -> copy before mutating
            const data = [...raw].reverse();

            const meta = res?.data?.meta;
            const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;
            return { data, hasMore };
        } catch (error) {
            return { data: [], hasMore: false };
        }
    }

    const { data, hasMore } = useLazyLoad<IMessage>({
        triggerRef,
        onGrabData: loadNextPage,
        options: {},
        newDataAppendToEnd: false,
    });

    useEffect(() => {
        if (!data || data.length === 0) return;

        const el = containerRef.current;

        if (isFirstLoad.current) {
            // chat just opened -> jump straight to bottom
            if (el) {
                el.scrollTop = el.scrollHeight;
            } else {
                scrollToBottom("auto");
            }
            isFirstLoad.current = false;
            return;
        }

        // subsequent loads (user scrolled up to fetch older messages) ->
        // keep them looking at the SAME message, don't jump to bottom.
        // new content was prepended above, so restore scroll by adding
        // back exactly how much taller the container got.
        if (el) {
            const heightDiff = el.scrollHeight - prevScrollHeight.current;
            el.scrollTop = prevScrollTop.current + heightDiff;
        }
    }, [data, scrollToBottom, containerRef]);

    return (
        <>

            {
                isLoading && <div className='min-h-40 flex items-center justify-center'>
                    <div className="w-8 aspect-square rounded-full border-[3px] border-white border-r-primary-black animate-spin"></div>
                </div>
            }

            {hasMore && <div ref={triggerRef} style={{ height: 1 }} />}

            {/* Chat Start */}
            {
                !hasMore &&
                < div className="flex justify-center mb-6" >
                    <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-500 flex items-center border border-gray-200">
                        <span>Your chat begins here!</span>
                        <svg
                            className="ml-1 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                </div >
            }

            {
                data?.map((message) => {
                    const isMyMessage = message?.senderId?.toString() === user?.id?.toString();

                    return <div key={message?.id}>
                        {isMyMessage ?
                            <div className="flex items-start gap-x-4">
                                <Image
                                    src={message?.sender?.picture?.url || "/empty-user.png"}
                                    alt="user image"
                                    className="h-10 w-10 object-cover rounded-full"
                                    height={500}
                                    width={500}
                                />
                                <div className="max-w-[50%] space-y-3 overflow-hidden">
                                    <OwnerMsgCard message={message?.text || ""} createdAt={message?.createdAt} />
                                </div>
                            </div>
                            :
                            <div className="flex flex-row-reverse items-start gap-x-4">
                                <Image
                                    src={message?.sender?.picture?.url || "/empty-user.png"}
                                    alt="user image"
                                    className="h-10 w-10 object-cover rounded-full"
                                    height={500}
                                    width={500}
                                />
                                <div className="flex max-w-[50%] flex-col items-end space-y-3">
                                    <ReceiverMsgCard message={message?.text || ""} createdAt={message?.createdAt} />
                                </div>
                            </div>}
                    </div>
                })
            }
        </>
    )
}

export default PreMessage