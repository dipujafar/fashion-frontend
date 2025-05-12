import AboutUsSection from "./AboutUsSection";
import BlogsUpdate from "./BlogsUpdate";
import ClothesSection from "./ClothesSection/ClothesSection";
import FeatureProduct from "./FeatureProdut/FeatureProduct";
import UserAvatar from "./UserAvatatTitle/UserAvatar";
import Feedbacks from "./Feedbacks/Feedbacks";
import RecentlyViewed from "@/components/shared/RecentlyViewed/RecentlyViewed";
import Container from "@/components/shared/Container";
import EcoFriendlyCharityContainer from "./EcoFriendlyCharity/EcoFriendlyCharityContainer";
import TrendingItem from "./TrendingItem/TrendingItem";
import DisplayProductSection from "@/components/shared/DisplayProductSection/DisplayProductSection";
import {
  newArrivalData,
  recentlyViewedData,
  trendingProductData,
} from "@/data/dummyData.tsx";
import GetInTouch from "./GetInTouch";

const HomeContainer = () => {
  return (
    <div className="xl:space-y-24 lg:space-y-16 space-y-10">
      <UserAvatar></UserAvatar>
      <ClothesSection></ClothesSection>
      <FeatureProduct></FeatureProduct>
      <DisplayProductSection
        title="New Arrival"
        linkTitle="View All"
        link="/shop"
        data={newArrivalData}
      ></DisplayProductSection>
      <EcoFriendlyCharityContainer></EcoFriendlyCharityContainer>
      <AboutUsSection></AboutUsSection>
      <TrendingItem></TrendingItem>
      <Feedbacks></Feedbacks>
      <DisplayProductSection
        title="Recently Viewed"
        linkTitle="View All"
        link="/shop"
        data={recentlyViewedData}
      ></DisplayProductSection>
      <BlogsUpdate></BlogsUpdate>

      <DisplayProductSection
        title="You may also like"
        linkTitle="VIEW ALL"
        link="/shop"
        data={trendingProductData}
      ></DisplayProductSection>

      <GetInTouch></GetInTouch>
    </div>
  );
};

export default HomeContainer;
