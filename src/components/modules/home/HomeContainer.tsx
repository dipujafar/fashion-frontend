import AboutUsSection from "./AboutUsSection";
import BlogsUpdate from "./BlogsUpdate";
import ClothesSection from "./ClothesSection/ClothesSection";
import FeatureProduct from "./FeatureProdut/FeatureProduct";
import UserAvatar from "./UserAvatatTitle/UserAvatar";
import Feedbacks from "./Feedbacks/Feedbacks";
import EcoFriendlyCharityContainer from "./EcoFriendlyCharity/EcoFriendlyCharityContainer";
import TrendingItem from "./TrendingItem/TrendingItem";
import {
  trendingProductData,
} from "@/data/dummyData.tsx";
import GetInTouch from "./GetInTouch";
import HeroSection from "./hero/HeroSection";
import Container from "@/components/shared/Container";
import Link from "next/link";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import RecentView from "./RecentView/RecentView";
import NewArrival from "./NewArrival/NewArrival";
import RecommendedProds from "./Recommended/Recommended";

const HomeContainer = ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  return (
    <div className="xl:space-y-24 lg:space-y-16 space-y-10">
      <div className="lg:space-y-8 space-y-4">
        <HeroSection></HeroSection>
        <UserAvatar></UserAvatar>
        <ClothesSection></ClothesSection>
      </div>

      <FeatureProduct searchParams={searchParams}></FeatureProduct>


      {/* ===============New Arrival============== */}
      <Container>

        <div>
          <div className="flex justify-between items-center gap-x-4 mb-2 ">
            <h4 className="section-name uppercase">{"New Arrival"}</h4>
            {
              <Link
                href={"/shop"}
                className="flex gap-x-2 items-center font-bold group "
              >
                <p>{"View All"} </p>
                <AnimatedArrow size={20}></AnimatedArrow>
              </Link>
            }
          </div>
          <hr />

          <NewArrival />

        </div>
      </Container>


      <EcoFriendlyCharityContainer></EcoFriendlyCharityContainer>

      <AboutUsSection></AboutUsSection>

      {/* ===============Trending Items============== */}
      <TrendingItem></TrendingItem>

      {/* <Feedbacks></Feedbacks> */}

      {/* ================Recent View==================== */}
      <Container>
        <div>
          <div className="flex justify-between items-center gap-x-4 mb-2 ">
            <h4 className="section-name uppercase">{"Recently Viewed"}</h4>
            {
              <Link
                href={"/shop"}
                className="flex gap-x-2 items-center font-bold group "
              >
                <p>{"View All"} </p>
                <AnimatedArrow size={20}></AnimatedArrow>
              </Link>
            }
          </div>
          <hr />

          <RecentView />

        </div>
      </Container>


      <BlogsUpdate></BlogsUpdate>

      {/* ==================Recommende============= */}
      <Container>
        <div>
          <div className="flex justify-between items-center gap-x-4 mb-2 ">
            <h4 className="section-name uppercase">{"You may also like"}</h4>
            {
              <Link
                href={"/shop"}
                className="flex gap-x-2 items-center font-bold group "
              >
                <p>{"View All"} </p>
                <AnimatedArrow size={20}></AnimatedArrow>
              </Link>
            }
          </div>
          <hr />

          <RecommendedProds />

        </div>
      </Container>

      <GetInTouch></GetInTouch>
    </div>
  );
};

export default HomeContainer;
