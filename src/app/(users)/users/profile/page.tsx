import React from "react";
import CommonButton from "@/components/ui/common-button";
import Container from "@/components/shared/Container";
import Link from "next/link";
import EnableBundleCreation from "./_components/EnableBundleCreation";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";

const UserProfilePage = () => {
  return (
    <div className="lg:space-y-8 space-y-4">
      <UserProfileInfo />
      <Container className="lg:space-y-8 space-y-4">
        <Link href="/sign-up" className="flex justify-center ">
          <CommonButton className=" bg-[#F8FFFB] hover:bg-black/5  text-black border-b-3 border-r-3 border-[#0F3732]">
            Register to another user
          </CommonButton>
        </Link>
        <div className="flex lg:flex-row flex-col gap-5">
          <UserInfo userRole="user" />
          <StatsInfo userRole="user" />
        </div>
        <EnableBundleCreation />
        <ProfileFeatures userRole="user" />
      </Container>
    </div>
  );
};

export default UserProfilePage;
