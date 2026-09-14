"use client"
import Container from '@/components/shared/Container'
import { CircleAlert } from 'lucide-react'
import React, {useEffect} from 'react'

function CheckoutErr({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    return (
        <Container className=' pt-5 min-h-96 flex-center'>
            <div className="flex items-start gap-3 bg-white p-8 rounded shadow-lg max-w-3xl mx-auto ">

                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                    <CircleAlert size={60} className=' text-red-500' />
                </div>

                {/* <!-- Content --> */}
                <div className="flex-1">
                    <h2 className="text-xl font-medium text-gray-900">Something's gone wrong</h2>
                    <p className="mt-3 text-gray-700 leading-relaxed">
                        Unable to proceed because the required element is unexpectedly detached from the page.
                    </p>
                     <p className='text-base text-gray-600 text-sm mt-3'>{error?.message}</p>
                     <button
                    className='bg-primary px-4 py-2 text-secondary font-popin hover:bg-opacity-90 duration-200 mx-auto cursor-pointer mt-3'
                    onClick={
                        () => reset()
                    }
                >
                    Refresh
                </button>
                </div>
            </div>
        </Container>
    )
}

export default CheckoutErr