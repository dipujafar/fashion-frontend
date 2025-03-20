import AboutUsSection from "./AboutUsSection";
import BlogsUpdate from "./BlogsUpdate";
import ClothesSection from "./ClothesSection/ClothesSection";
import FeatureProduct from "./FeatureProdut/FeatureProduct";
import UserAvatar from "./UserAvatatTitle/UserAvatar";
import Feedbacks from "./Feedbacks/Feedbacks";

const HomeContainer = () => {
  return (
    <div className="xl:space-y-24 md:space-y-16 space-y-10">
      <UserAvatar></UserAvatar>
      <ClothesSection></ClothesSection>
      <FeatureProduct></FeatureProduct>
      <AboutUsSection></AboutUsSection>
      <Feedbacks></Feedbacks>
      <BlogsUpdate></BlogsUpdate>
    </div>
  );
};

export default HomeContainer;
