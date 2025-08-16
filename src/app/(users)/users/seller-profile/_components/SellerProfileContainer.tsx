import UserProfileInfo from "./UserProfileInfo";
import Container from "@/components/shared/Container";
import UserInfo from "./UserInfo";
import ProfileFeatures from "./ProfileFeatures";
import ChoiceBundleModal from "./ChoiceBundleModal";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";

export default function SellerProfileContainer() {
  return (
    <div className="lg:space-y-8 space-y-4">
      <UserProfileInfo />
      <Container className="lg:space-y-8 space-y-4">
        <div className="flex lg:flex-row flex-col gap-5">
          <UserInfo />
          <StatsInfo userRole="celebrity" />
        </div>
        <div className="flex justify-between items-center bg-[#ecfef4] py-4 px-5">
          <span className="text-lg">Shop Bundle</span>
          <ChoiceBundleModal />
        </div>
        <ProfileFeatures />
      </Container>
    </div>
  );
}
