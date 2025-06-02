import Container from "@/components/shared/Container";
import React from "react";
import ProfileContainerForm from "./_components/ProfileContainerForm";
import ProfileDetailsCard from "./_components/ProfileDetailsCard";

const ProfilePage = () => {
  return (
    <Container>
      <ProfileDetailsCard
        orderId="#STG123456789"
        trackingCode="01JKLHGBNJIO"
        name="Aria Pal"
        address="153/2,Florida, UK"
        phoneNumber="0123456789"
      />
      <ProfileContainerForm />
    </Container>
  );
};

export default ProfilePage;
