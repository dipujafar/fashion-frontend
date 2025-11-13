import Container from "@/components/shared/Container";
import ChoiceBundleModal from "@/components/shared/UserProfile/Modals/ChoiceBundleModal";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserInfoForSmallScreen from "@/components/shared/UserProfile/UserInfoForSmallScreen";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";

export const metadata = {
  title: "Celebrity Profile",
  description: "Preview your celebrity",
};

export default function CelebrityProfilePreviewPage() {
  return (
    <div className="lg:space-y-8 space-y-4">
      <UserProfileInfo user="Celebrity" />
      <Container className="lg:space-y-8 md:space-y-4 space-y-2">

        {/* profile information  for small screen */}
        <div className="lg:hidden" >
          <UserInfoForSmallScreen  userRole="celebrity"/>
        </div>
        {/* profile information  for large screen */}
        <div className="lg:flex lg:flex-row flex-col md:gap-5 gap-2 hidden ">
          <UserInfo userRole="celebrity" link="/celebrity/dashboard/profile" preview="preview" />
          <StatsInfo userRole="celebrity" />
        </div>
        <div className="flex justify-between items-center bg-[#ecfef4] md:py-4  md:px-5 py-2 px-2">
          <span className="text-lg">Shop Bundle</span>
          <ChoiceBundleModal />
        </div>
        <ProfileFeatures userRole="celebrity" />
      </Container>
    </div>
  );
}
