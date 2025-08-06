import AmbassadorSignUpForm from '@/app/(users)/(ambassador)/ambassador/sign-up/_components/AmbassadorSignUpForm'
import PageTopSection from '@/components/shared/PageTopSection'
import React from 'react'

export default function AssistedSellerSignPage() {
  return (
    <div className='space-y-5'>
      <PageTopSection title="Join us as a Assisted Seller Account"></PageTopSection>
      <AmbassadorSignUpForm />
    </div>
  )
}
