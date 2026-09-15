import AboutUsSection from "./AboutUsSection";
import ClothesSection from "./ClothesSection/ClothesSection";
import FeatureProduct from "./FeatureProdut/FeatureProduct";
import UserAvatar from "./UserAvatatTitle/UserAvatar";
import EcoFriendlyCharityContainer from "./EcoFriendlyCharity/EcoFriendlyCharityContainer";
import TrendingItem from "./TrendingItem/TrendingItem";
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
    <div className="space-y-8 lg:space-y-14">

      <div className="lg:space-y-8 space-y-4">
        <HeroSection></HeroSection>
        <UserAvatar></UserAvatar>
        {/* <ClothesSection></ClothesSection> */}

        <FeatureProduct searchParams={searchParams}></FeatureProduct>

      </div>

      {/* ===============New Arrival============== */}
      <Container>

        <div>
          <div className="flex justify-between items-center gap-x-4 mb-4 ">
            <h4 className="text-2xl font-semibold">{"New Arrival"}</h4>
            {/* {
              <Link
                href={"/shop"}
                className="flex gap-x-2 items-center font-bold group "
              >
                <p>{"View All"} </p>
                <AnimatedArrow size={20}></AnimatedArrow>
              </Link>
            } */}
          </div>
          {/* <hr /> */}

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
          <div className="flex justify-between items-center gap-x-4 mb-4">
            <h4 className="text-2xl font-semibold">{"Recently Viewed"}</h4>
            {/* {
              <Link
                href={"/shop"}
                className="flex gap-x-2 items-center font-bold group "
              >
                <p>{"View All"} </p>
                <AnimatedArrow size={20}></AnimatedArrow>
              </Link>
            } */}
          </div>
          {/* <hr /> */}

          <RecentView />

        </div>
      </Container>

      {/* ==================Recommende============= */}
      {/* <Container>
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
      </Container> */}

      <GetInTouch></GetInTouch>
    </div>
  );
};

export default HomeContainer;
