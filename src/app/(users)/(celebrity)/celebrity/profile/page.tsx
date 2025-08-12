import Container from '@/components/shared/Container'
import EnableBundleCreation from '@/components/shared/UserProfile/CreateBundle/EnableBundleCreation'
import StatsInfo from '@/components/shared/UserProfile/StatsInfo'
import UserInfo from '@/components/shared/UserProfile/UserInfo'
import UserProfileInfo from '@/components/shared/UserProfile/UserProfileInfo'
import CommonButton from '@/components/ui/common-button'
import Link from 'next/link'
import React from 'react'

export default function ProfilePage() {
  return (
    <div className="lg:space-y-8 space-y-4">
    <UserProfileInfo />
      <Container className="lg:space-y-8 space-y-4">
        <Link href="/sign-up" className="flex justify-center ">
          <CommonButton className=" bg-[#F8FFFB] hover:bg-black/5  text-black border-b-3 border-r-3 border-[#0F3732]">
            Register to another user
          </CommonButton>
        </Link>
        <div className="flex lg:flex-row flex-col gap-5">
          <UserInfo userRole="celebrity"  link='/celebrity/dashboard/profile' />
          <StatsInfo userRole="user" />
        </div>
        <EnableBundleCreation />
        {/* <ProfileFeatures userRole="user" /> */}
      </Container>
      </div>
  )
}
