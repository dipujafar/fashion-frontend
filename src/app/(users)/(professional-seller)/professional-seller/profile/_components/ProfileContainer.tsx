import Container from "@/components/shared/Container";
import EnableBundleCreation from "@/components/shared/UserProfile/CreateBundle/EnableBundleCreation";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import React from "react";

export default function ProfileContainer() {
  return (
    <div className="space-y-5">
      <UserProfileInfo
        name="@Sarah_Style"
        profileImage="/dummyImages/professional-seller-profile-image.png"
        bio="Fashion lover 💫 | Curating the best of chic and street style ✨ | 10% of my sales go to supporting youth education 📚 | Join me on this stylish journey!"
        coverImage="/dummyImages/professional-seller-cover-image.png"
      />

      <Container className="lg:space-y-8 md:space-y-4 space-y-2">
        <div className="flex lg:flex-row flex-col md:gap-5 gap-2">
          <UserInfo
            link="/professional-seller/dashboard/profile"
            userRole="professional-seller"
          />
          <StatsInfo userRole="professional-seller" />
        </div>
        <EnableBundleCreation />
        <ProfileFeatures userRole="professional-seller" />
      </Container>
    </div>
  );
}
