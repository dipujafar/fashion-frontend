import Container from '@/components/shared/Container'
import ProfileFeatures from '@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures'
import StatsInfo from '@/components/shared/UserProfile/StatsInfo'
import UserInfo from '@/components/shared/UserProfile/UserInfo'
import UserInfoForSmallScreen from '@/components/shared/UserProfile/UserInfoForSmallScreen'
import UserProfileInfo from '@/components/shared/UserProfile/UserProfileInfo'
import Link from 'next/link'
import React from 'react'

export default function ProfilePreviewContainer() {
  return (
    <div>
      <UserProfileInfo
        name="Save the Tree"
        profileImage="/dummyImages/eco-friendly-store-profile-image.jpg"
        bio="By shopping with us, you're not just getting great items at affordable prices, you're also contributing to the fight against ocean pollution and supporting initiatives."
        coverImage="/dummyImages/eco-friendly-store-cover-image.jpg"
        user='eco-friendly-store'
      />

      <Container className="lg:space-y-8 space-y-4 mt-8">
        <div className="lg:hidden" >
          <UserInfoForSmallScreen userRole="eco-friendly-store" />
        </div>
        <div className="lg:flex lg:flex-row flex-col gap-5 hidden">
          <UserInfo
            link="/eco-friendly-store/dashboard/profile"
            userRole="eco-friendly-store"
            preview='preview'
          />
          <StatsInfo userRole="eco-friendly-store" />
        </div>
        {/* <EnableBundleCreation /> */}
        <ProfileFeatures userRole="eco-friendly-store" preview="preview" />
      </Container>
    </div>
  )
}
