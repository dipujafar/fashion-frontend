"use client"
import { Rating } from '@/components/ui/rating';
import useLazyLoad from '@/hooks/useLazyLoad';
import { useReviewsGetBySellerMutation } from '@/redux/api/review.api';
import { IReview } from '@/types';
import { defaultImg } from '@/utils/defaultImg';
import moment from 'moment';
import Image from 'next/image';
import React from 'react'
import { useRef } from 'react';

function Reviews({ userName }: { userName: string }) {

    const [loadReviews, { isLoading }] = useReviewsGetBySellerMutation();
    const triggerRef = useRef(null);

    const loadNextPage = async (page: number) => {
        try {

            const res = await loadReviews({ userName, query: { page: page.toString() } }).unwrap();
            const data = res?.data?.data || [];
            const meta = res?.data?.meta;

            // No meta or no data back -> treat as end of list
            const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;

            return { data, hasMore };
        } catch (error) {
            return { data: [], hasMore: false };
        }
    }

    const { data, hasMore } = useLazyLoad<IReview>({
        triggerRef,
        onGrabData: loadNextPage,
        options: {}
    });


    return (
        <div>
            {
                data.map((review) => (
                    <div key={review?.id} className='border-b border-gray-200 py-4 lg:py-5'>
                        <div className='flex flex-row items-start gap-3 lg:gap-4'>

                            <Image src={review?.fromUser?.picture?.url || "https://i.pravatar.cc/150?img=68"} alt={review?.fromUser?.picture?.url || defaultImg?.empty_user} placeholder='blur' blurDataURL={defaultImg?.placeholderImg} className='w-10 h-10 rounded-full object-cover' height={400} width={400} />

                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-row items-center gap-2'>
                                    <p className='font-semibold text-gray-800'>{review?.fromUser?.userName}</p>
                                    <div className='flex flex-row items-center gap-1'>
                                        <Rating rating={review?.rating} size={12}></Rating>
                                    </div>
                                </div>
                                <p className='text-base text-gray-700'>{review?.comment}</p>
                                <p className='text-sm text-gray-500'>{moment(review?.createdAt).format('MMM DD, YYYY h:mm A')}</p>
                            </div>
                        </div>
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

export default Reviews