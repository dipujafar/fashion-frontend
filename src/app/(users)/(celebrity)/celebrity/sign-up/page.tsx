import PageTopSection from '@/components/shared/PageTopSection'
import CelebritySignUpForm from './_components/CelebritySignUpForm'

export default function SignUpPage() {
  return (
    <div className='space-y-5'>
      <PageTopSection title="Join us as a Celebrity Account"></PageTopSection>
      <CelebritySignUpForm />
    </div>
  )
}
