import PageTopSection from "@/components/shared/PageTopSection"
import SubscriptionPlanContainer from "@/components/shared/UserProfile/Subscription/SubscriptionPlanContainer"


export const metadata = {
    title: 'Subscription Plan',
    description: 'Choose your subscription plan and experience the convenience of eco-friendly store.',
}

export default function SubscriptionPlanPage() {
  return (
    <div>
       <PageTopSection title="Choose Your Plan & Start Making an Impact"></PageTopSection>
       <SubscriptionPlanContainer />
    </div>
  )
}
