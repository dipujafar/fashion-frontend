import Container from "@/components/shared/Container";
import ChoiceBundleModal from "@/components/shared/UserProfile/Modals/ChoiceBundleModal";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import React from "react";

export default function ProfilePreviewContainer() {
  return (
    <div className="lg:space-y-8 space-y-4">
      <UserProfileInfo user="ambassador" />
      <Container className="lg:space-y-8 space-y-4 mt-8">
        {/* <Link href="/sign-up" className="flex justify-center ">
          <CommonButton className=" bg-[#F8FFFB] hover:bg-black/5  text-black border-b-3 border-r-3 border-[#0F3732]">
            Register to another user
          </CommonButton>
        </Link> */}
        <div className="flex lg:flex-row flex-col gap-5">
          <UserInfo
            userRole="ambassador"
            link="/ambassador/dashboard/profile"
            preview="preview"
          />
          <StatsInfo userRole="ambassador" />
        </div>
        <div className="flex justify-between items-center bg-[#ecfef4] py-4 px-5">
          <span className="text-lg">Shop Bundle</span>
          <ChoiceBundleModal />
        </div>
        <ProfileFeatures userRole="user" />
      </Container>
    </div>
  );
}
