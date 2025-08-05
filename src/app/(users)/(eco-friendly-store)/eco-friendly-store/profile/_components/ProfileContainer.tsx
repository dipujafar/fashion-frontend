import Container from '@/components/shared/Container'
import EnableBundleCreation from '@/components/shared/UserProfile/CreateBundle/EnableBundleCreation'
import ProfileFeatures from '@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures'
import StatsInfo from '@/components/shared/UserProfile/StatsInfo'
import UserInfo from '@/components/shared/UserProfile/UserInfo'
import UserProfileInfo from '@/components/shared/UserProfile/UserProfileInfo'
import CommonButton from '@/components/ui/common-button'
import Link from 'next/link'
import React from 'react'

export default function ProfileContainer() {
  return (
   <div>
        <UserProfileInfo
          name="Save the Tree"
          profileImage="/dummyImages/eco-friendly-store-profile-image.jpg"
          bio="By shopping with us, you're not just getting great items at affordable prices, you're also contributing to the fight against ocean pollution and supporting initiatives."
          coverImage="/dummyImages/eco-friendly-store-cover-image.jpg"
        />
  
        <Container className="lg:space-y-8 space-y-4">
          <Link href="/#" className="flex justify-center ">
            <CommonButton className=" bg-[#F8FFFB] hover:bg-black/5  text-black border-b-3 border-r-3 border-[#0F3732]">
              Register as a Charity
            </CommonButton>
          </Link>
          <div className="flex lg:flex-row flex-col gap-5">
            <UserInfo
              link="/eco-friendly-store/dashboard/profile"
              userRole="eco-friendly-store"
            />
            <StatsInfo userRole="eco-friendly-store" />
          </div>
          {/* <EnableBundleCreation /> */}
          <ProfileFeatures userRole="eco-friendly-store" />
        </Container>
      </div>
  )
}
