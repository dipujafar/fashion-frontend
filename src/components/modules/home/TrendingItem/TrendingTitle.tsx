import AnimatedArrow from '@/components/animatedArrows/AnimatedArrow'
import Link from 'next/link'
import React from 'react'

function TrendingTitle() {
    return (
        <div>
            <div className="flex justify-between items-center gap-x-4 mb-4">
                <h4 className="text-2xl font-semibold">Trending item</h4>
                {/* <Link
                    href={"/shop"}
                    className="flex gap-x-2 items-center font-bold group "
                >
                    <p>VIEW ALL</p>
                    <AnimatedArrow size={20}></AnimatedArrow>
                </Link> */}
            </div>
            {/* <hr className=" border-primary-gray" /> */}
        </div>
    )
}

export default TrendingTitle