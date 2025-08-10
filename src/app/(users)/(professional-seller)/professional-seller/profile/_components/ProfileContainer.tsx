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
          name="@Sarah_Style"
          profileImage="/dummyImages/professional-seller-profile-image.png"
          bio="Fashion lover 💫 | Curating the best of chic and street style ✨ | 10% of my sales go to supporting youth education 📚 | Join me on this stylish journey!"
          coverImage="/dummyImages/professional-seller-cover-image.png"
        />
  
        <Container className="lg:space-y-8 space-y-4">
          <Link href="/#" className="flex justify-center mt-5 ">
            <CommonButton className=" bg-[#F8FFFB] hover:bg-black/5  text-black border-b-3 border-r-3 border-[#0F3732]">
              Register to Another User
            </CommonButton>
          </Link>
          <div className="flex lg:flex-row flex-col gap-5">
            <UserInfo
              link="/professional-seller/dashboard/profile"
              userRole="professional-seller"
            />
            <StatsInfo userRole="professional-seller" />
          </div>
          <EnableBundleCreation />
          <ProfileFeatures userRole="professional-seller" />
        </Container>
      </div>
  )
}
