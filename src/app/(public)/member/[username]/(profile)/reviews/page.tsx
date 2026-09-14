import React from 'react'
import { Rating } from "@/components/ui/rating";
import ReviewStats from './_components/ReviewStats';
import Reviews from './_components/Reviews';

async function Reviewspage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    return (
        <div className='space-y-3'>
            <ReviewStats userName={username} />
            <Reviews userName={username}/>
        </div>
    )
}

export default Reviewspage