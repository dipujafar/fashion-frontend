
import Container from "@/components/shared/Container";
import ChoiceBundleModal from "@/components/shared/UserProfile/Modals/ChoiceBundleModal";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import Link from "next/link";
import React from "react";

export default function ProfilePreviewContainer() {
  return (
    <div>
      <UserProfileInfo
        name="@Sarah_Style"
        profileImage="/dummyImages/professional-seller-profile-image.png"
        bio="Fashion lover 💫 | Curating the best of chic and street style ✨ | 10% of my sales go to supporting youth education 📚 | Join me on this stylish journey!"
        coverImage="/dummyImages/professional-seller-cover-image.png"
        user="professional seller"
      />

      <Container className="lg:space-y-8 space-y-4">
        <Link href="/#" className="flex justify-center mt-5 ">
          {/* <CommonButton className=" bg-[#F8FFFB] hover:bg-black/5  text-black border-b-3 border-r-3 border-[#0F3732]">
            Register to Another User
          </CommonButton> */}
        </Link>
        <div className="flex lg:flex-row flex-col gap-5">
          <UserInfo
            link="/professional-seller/dashboard/profile"
            userRole="professional-seller"
            preview="preview"
          />
          <StatsInfo userRole="professional-seller" />
        </div>
        <div className="flex justify-between items-center bg-[#ecfef4] py-4 px-5">
          <span className="text-lg">Shop Bundle</span>
          <ChoiceBundleModal />
        </div>
        <ProfileFeatures userRole="professional-seller" />
      </Container>
    </div>
  );
}
