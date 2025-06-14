import Container from "@/components/shared/Container";
import ProfileDetailsCard from "./_components/ProfileDetailsCard";
import ProfileFeatures from "./_components/ProfileFeatures";

const ProfilePage = () => {
  return (
    <Container className="space-y-5">
      <ProfileDetailsCard
        orderId="120 items sold"
        trackingCode="
        $5,000 earned"
        name="12"
        address="$2,00"
      />
      <ProfileFeatures />
    </Container>
  );
};

export default ProfilePage;
