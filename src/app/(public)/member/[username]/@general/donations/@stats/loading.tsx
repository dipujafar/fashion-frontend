import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function StatLoading() {
  return (
    <div className='space-y-4'>
        <Skeleton className='h-32 w-full'/>
        <Skeleton className='h-24 w-full'/>
    </div>
  )
}

export default StatLoading