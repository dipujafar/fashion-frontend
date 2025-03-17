import AboutUsSection from "./AboutUsSection";
import BlogsUpdate from "./BlogsUpdate";
import FeatureProduct from "./FeatureProduct";

const HomeContainer = () => {
  return (
    <div className="xl:space-y-20 md:space-y-12 space-y-7">
      <FeatureProduct></FeatureProduct>
      <AboutUsSection></AboutUsSection>
      <BlogsUpdate></BlogsUpdate>
    </div>
  );
};

export default HomeContainer;
