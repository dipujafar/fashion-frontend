import Container from "@/components/shared/Container";
import EnableBundleCreation from "@/components/shared/UserProfile/CreateBundle/EnableBundleCreation";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import CommonButton from "@/components/ui/common-button";
import Link from "next/link";

export const metadata = {
  title: "Charity Shop Profile",
  description: "Here find charity shop profile",
};
export default function ProfilePage() {
  return (
    <div>
      <UserProfileInfo
        name="Save the Ocean Thrift Shop"
        profileImage="/dummyImages/charity-shop-profile-image.png"
        bio="By shopping with us, you're not just getting great items at affordable prices, you're also contributing to the fight against ocean pollution and supporting initiatives."
        coverImage="/dummyImages/charity-shop-cover-image.png"
      />

      <Container className="lg:space-y-8 space-y-4">
        <Link href="/#" className="flex justify-center ">
          <CommonButton className=" bg-[#F8FFFB] hover:bg-black/5  text-black border-b-3 border-r-3 border-[#0F3732]">
            Register as a Charity
          </CommonButton>
        </Link>
        <div className="flex lg:flex-row flex-col gap-5">
          <UserInfo
            link="/charity-shop/dashboard/profile"
            userRole="charity store"
          />
          <StatsInfo userRole="charity store" />
        </div>
        <EnableBundleCreation />
        <ProfileFeatures userRole="charity store" />
      </Container>
    </div>
  );
}
