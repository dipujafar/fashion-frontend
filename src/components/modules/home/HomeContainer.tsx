import AboutUsSection from "./AboutUsSection";
import BlogsUpdate from "./BlogsUpdate";
import ClothesSection from "./ClothesSection/ClothesSection";
import FeatureProduct from "./FeatureProdut/FeatureProduct";
import UserAvatar from "./UserAvatatTitle/UserAvatar";
import Feedbacks from "./Feedbacks/Feedbacks";
import RecentlyViewed from "@/components/shared/RecentlyViewed/RecentlyViewed";
import Container from "@/components/shared/Container";
import NewArrival from "./NewArrival/NewArrival";
import EcoFriendlyCharityContainer from "./EcoFriendlyCharity/EcoFriendlyCharityContainer";

const HomeContainer = () => {
  return (
    <div className="xl:space-y-24 md:space-y-16 space-y-10">
      <UserAvatar></UserAvatar>
      <ClothesSection></ClothesSection>
      <FeatureProduct></FeatureProduct>
      <Container>
        <NewArrival></NewArrival>
      </Container>
      <EcoFriendlyCharityContainer></EcoFriendlyCharityContainer>
      <AboutUsSection></AboutUsSection>
      <Feedbacks></Feedbacks>
      <Container>
        <RecentlyViewed></RecentlyViewed>
      </Container>
      <BlogsUpdate></BlogsUpdate>
    </div>
  );
};

export default HomeContainer;
