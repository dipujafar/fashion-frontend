import Container from "@/components/shared/Container";
import { IndividualCharityDonationFormDialog } from "@/components/shared/Modal/IndividualCharityDonationFormDialog";
import AboutCharity from "@/components/shared/Profile/AboutCharity";
import StatsInfo from "@/components/shared/UserProfile/StatsInfo";
import UserInfo from "@/components/shared/UserProfile/UserInfo";
import UserInfoForSmallScreenForCharity from "@/components/shared/UserProfile/UserInfoForSmallScreenForCharity";
import UserProfileInfo from "@/components/shared/UserProfile/UserProfileInfo";
export default function CharityProfilePreviewContainer() {
  return (
    <div>
      <UserProfileInfo
        name="Climate Change Fund"
        profileImage="/dummyImages/charity-profile-image.png"
        bio="By shopping with us, you're not just getting great items at affordable prices, you're also contributing to the fight against ocean pollution and supporting initiatives.."
        coverImage="/dummyImages/charity-cover-images.jpg"
        user="charity"
      />
      <Container className="w-fit mx-auto my-5">
        <IndividualCharityDonationFormDialog />
      </Container>

      <Container className="lg:space-y-8 space-y-4 ">

        <div className="lg:hidden" >
          <UserInfoForSmallScreenForCharity userRole="professional-seller" />
        </div>

        <div className="lg:flex lg:flex-row flex-col gap-5 hidden">
          <UserInfo userRole="charity" preview="preview" />
          <StatsInfo userRole="charity" preview="preview" />
        </div>
        <div
          style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.06)" }}
          className="flex justify-center items-center py-2"
        >
          <p className="font-medium text-xl">About</p>
        </div>
        <AboutCharity />
      </Container>
    </div>
  );
}
