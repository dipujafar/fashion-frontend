import PageTopSection from '@/components/shared/PageTopSection'
import React from 'react'
import AmbassadorSignUpForm from './_components/AmbassadorSignUpForm'

export default function AmbassadorSignUpPage() {
  return (
     <div className='space-y-5'>
      <PageTopSection title="Join us as a Ambassador Account"></PageTopSection>
      <AmbassadorSignUpForm />
    </div>
  )
}
