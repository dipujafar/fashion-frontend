import Container from "@/components/shared/Container";
import Link from "next/link";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";
import ChoiceBundleModal from "@/components/shared/UserProfile/Modals/ChoiceBundleModal";
import UserInfoForSmallScreen from "@/components/shared/UserProfile/UserInfoForSmallScreen";

export const metadata = {
  title: "Individual Seller Profile",
  description: "Preview your profile",
};

export default function page() {
  return (
    <div className="lg:space-y-8 space-y-4">
      <UserProfileInfo user="individual seller" />
      <Container className="lg:space-y-8 space-y-4">
         <div className="lg:hidden" >
          <UserInfoForSmallScreen  userRole="individual-seller" />
        </div>
        <div className="lg:flex lg:flex-row flex-col gap-5 hidden">
          <UserInfo userRole="user" preview="preview" />
          <StatsInfo userRole="user" />
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
