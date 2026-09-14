"use client"
import { Rating } from '@/components/ui/rating';
import { useReviewStatBySellerQuery } from '@/redux/api/review.api'
import React from 'react'

function ReviewStats({ userName }: { userName: string }) {

    const { isLoading, data } = useReviewStatBySellerQuery({ userName }, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return <div className="flex-center h-40 lg:h-60">
            <span className="loaderDark !w-10"> </span>
        </div>
    }

    return (
        <div className='pb-5 lg:pb-8 border-b border-gray-200 flex flex-col items-center justify-center md:justify-start md:items-start'>
            <p className='text-base lg:font-bold text-gray-800'>Seller Score</p>
            <p className='text-3xl md:text-4xl font-semibold text-gray-800 my-1 md:my-1.5 lg:my-2'>{data?.data?.averageRating || 0}<span className='text-lg md:text-xl text-gray-600'>/5</span></p>
            <Rating rating={data?.data?.averageRating || 0} size={22}></Rating>
            <p className='text-sm text-gray-600 mt-2'>{data?.data?.totalReviews || 0} Reviews</p>
        </div>
    )
}

export default ReviewStats