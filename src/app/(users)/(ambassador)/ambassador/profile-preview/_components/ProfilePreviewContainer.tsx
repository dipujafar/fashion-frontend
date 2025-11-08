import Container from "@/components/shared/Container";
import ChoiceBundleModal from "@/components/shared/UserProfile/Modals/ChoiceBundleModal";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserInfoForSmallScreen from "@/components/shared/UserProfile/UserInfoForSmallScreen";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import React from "react";

export default function ProfilePreviewContainer() {
  return (
    <div className="lg:space-y-8 space-y-4">
      <UserProfileInfo user="ambassador" />
      <Container className="lg:space-y-8 space-y-4 mt-8">
        <div className="lg:hidden" >
          <UserInfoForSmallScreen userRole="ambassador" />
        </div>
        <div className="lg:flex lg:flex-row flex-col gap-5 hidden">
          <UserInfo
            userRole="ambassador"
            link="/ambassador/dashboard/profile"
            preview="preview"
          />
          <StatsInfo userRole="ambassador" />
        </div>
        <div className="flex justify-between items-center bg-[#ecfef4] lg:py-4 py-2 px-5">
          <span className="text-lg">Shop Bundle</span>
          <ChoiceBundleModal />
        </div>
        <ProfileFeatures userRole="user" />
      </Container>
    </div>
  );
}
