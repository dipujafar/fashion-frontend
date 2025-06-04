import Container from "@/components/shared/Container";
import React from "react";
import ProfileContainerForm from "./_components/ProfileContainerForm";
import ProfileDetailsCard from "./_components/ProfileDetailsCard";

const ProfilePage = () => {
  return (
    <Container>
      <ProfileDetailsCard
        orderId="120 items sold"
        trackingCode="
        $5,000 earned"
        name="12"
        address="$2,00"
      />
      <ProfileContainerForm />
    </Container>
  );
};

export default ProfilePage;
