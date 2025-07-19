import React from "react";
import UserProfileInfo from "./_components/UserProfileInfo";
import CommonButton from "@/components/ui/common-button";
import Container from "@/components/shared/Container";
import Link from "next/link";
import UserInfo from "./_components/UserInfo";
import StatsInfo from "./_components/StatsInfo";
import ProfileFeatures from "./_components/ProfileFeatures";
import EnableBundleCreation from "./_components/EnableBundleCreation";

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
          <UserInfo />
          <StatsInfo />
        </div>
        <EnableBundleCreation />
        <ProfileFeatures />
      </Container>
    </div>
  );
};

export default UserProfilePage;
