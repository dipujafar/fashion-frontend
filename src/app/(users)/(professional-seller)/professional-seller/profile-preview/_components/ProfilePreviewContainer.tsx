import Container from "@/components/shared/Container";
import ChoiceBundleModal from "@/components/shared/UserProfile/Modals/ChoiceBundleModal";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";
import SellerProfile from "@/components/shared/UserProfile/SellerProfile";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserInfoForSmallScreen from "@/components/shared/UserProfile/UserInfoForSmallScreen";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import React from "react";

export default function ProfilePreviewContainer() {
  return (
    <div className="space-y-5">
      {/* <UserProfileInfo
        name="@Sarah_Style"
        profileImage="/dummyImages/professional-seller-profile-image.png"
        bio="Fashion lover 💫 | Curating the best of chic and street style ✨ | 10% of my sales go to supporting youth education 📚 | Join me on this stylish journey!"
        coverImage="/dummyImages/professional-seller-cover-image.png"
        user="professional seller"
      /> */}

      <Container className="lg:space-y-8 space-y-4 mt-16">
        {/* <div className="lg:hidden" >
          <UserInfoForSmallScreen userRole="professional-seller" />
        </div> */}
        {/* <div className="lg:flex lg:flex-row flex-col gap-5 hidden">
          <UserInfo
            link="/professional-seller/dashboard/profile"
            userRole="professional-seller"
            preview="preview"
          />
          <StatsInfo userRole="professional-seller" />
        </div> */}
        
        
        <ProfileFeatures userRole="professional-seller" />
      </Container>
    </div>
  );
}
