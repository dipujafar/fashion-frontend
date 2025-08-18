import Container from "@/components/shared/Container";
import ChoiceBundleModal from "@/components/shared/UserProfile/Modals/ChoiceBundleModal";
import ProfileFeatures from "@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
import Link from "next/link";

export const metadata = {
  title: "Celebrity Profile",
  description: "Preview your celebrity",
};

export default function CelebrityProfilePreviewPage() {
  return (
    <div className="lg:space-y-8 space-y-4">
      <UserProfileInfo user="Influencer" />
      <Container className="lg:space-y-8 space-y-4">
        <Link href="/sign-up" className="flex justify-center ">
          {/* <CommonButton className=" bg-[#F8FFFB] hover:bg-black/5  text-black border-b-3 border-r-3 border-[#0F3732]">
            Register to another user
          </CommonButton> */}
        </Link>
        <div className="flex lg:flex-row flex-col gap-5">
          <UserInfo userRole="celebrity" link="/celebrity/dashboard/profile" preview="preview" />
          <StatsInfo userRole="celebrity" />
        </div>
        <div className="flex justify-between items-center bg-[#ecfef4] py-4 px-5">
          <span className="text-lg">Shop Bundle</span>
          <ChoiceBundleModal />
        </div>
        <ProfileFeatures userRole="celebrity" />
      </Container>
    </div>
  );
}
