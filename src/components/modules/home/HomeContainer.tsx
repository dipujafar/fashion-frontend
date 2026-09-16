import AboutUsSection from "./AboutUsSection";
import FeatureProduct from "./FeatureProdut/FeatureProduct";
import UserAvatar from "./UserAvatatTitle/UserAvatar";
import EcoFriendlyCharityContainer from "./EcoFriendlyCharity/EcoFriendlyCharityContainer";
// import TrendingItem from "./TrendingItem/TrendingItem";
import GetInTouch from "./GetInTouch";
import HeroSection from "./hero/HeroSection";
import RecentView from "./RecentView/RecentView";
import AuthenticateProds from "./Authenticate/AuthenticateProds";

const HomeContainer = () => {
  return (
    <div className="space-y-8 lg:space-y-14">

      <div className="lg:space-y-8 space-y-4">
        <HeroSection></HeroSection>
        <UserAvatar></UserAvatar>

        <FeatureProduct></FeatureProduct>
      </div>

      {/* ===============Authenticate Items============== */}
      <AuthenticateProds></AuthenticateProds>


      <EcoFriendlyCharityContainer></EcoFriendlyCharityContainer>


      <AboutUsSection></AboutUsSection>

      {/* ================Recent View==================== */}
      <RecentView />


      <GetInTouch></GetInTouch>
    </div>
  );
};

export default HomeContainer;
