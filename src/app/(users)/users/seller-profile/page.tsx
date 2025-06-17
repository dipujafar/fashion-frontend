import UserProfileInfo from "./_components/UserProfileInfo";
import Container from "@/components/shared/Container";
import UserInfo from "./_components/UserInfo";
import StatsInfo from "./_components/StatsInfo";
import ProfileFeatures from "./_components/ProfileFeatures";

const SellerProfilePage = () => {
  return (
    <div className="lg:space-y-8 space-y-4">
      <UserProfileInfo />
      <Container className="lg:space-y-8 space-y-4">
        <div className="flex lg:flex-row flex-col gap-5">
          <UserInfo />
          <StatsInfo />
        </div>
        <ProfileFeatures />
      </Container>
    </div>
  );
};

export default SellerProfilePage;
