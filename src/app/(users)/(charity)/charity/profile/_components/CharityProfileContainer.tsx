import Container from "@/components/shared/Container";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import React from "react";
import AboutCharity from "./AboutCharity";

export default function CharityProfileContainer() {
  return (
    <div>
      <UserProfileInfo
        name="Climate Change Fund"
        profileImage="/dummyImages/charity-profile-image.png"
        bio="By shopping with us, you're not just getting great items at affordable prices, you're also contributing to the fight against ocean pollution and supporting initiatives.."
        coverImage="/dummyImages/charity-cover-images.jpg"
      />

      <Container className="lg:space-y-8 space-y-4">
        <div className="flex lg:flex-row flex-col gap-5">
          <UserInfo userRole="charity store" />
          <StatsInfo userRole="charity store" />
        </div>
        <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.06)" }} className="flex justify-center items-center py-2">
            <p className="font-medium text-xl">About</p>
        </div>
        <AboutCharity />
      </Container>
    </div>
  );
}
