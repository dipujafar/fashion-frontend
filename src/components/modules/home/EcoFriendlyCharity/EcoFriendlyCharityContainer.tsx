import Container from "@/components/shared/Container";
import EcoFriendlyStore from "./EcoFriendlyStore";
import Charities from "./Charities";
import CommonButton from "@/components/ui/common-button";
import Link from "next/link";

const EcoFriendlyCharityContainer = () => {
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-4 ">
        <div>
          <div className="mb-2 ">
            <h4 className="section-name">Eco-Friendly Store</h4>
          </div>
          <hr className=" border-primary-gray" />
        </div>
        <div className="-translate-1.5">
          <div className="flex justify-between items-center gap-x-4 mb-2  ">
            <h4 className="section-name">CHARITIES</h4>
            <Link
              href={"/about-us"}
              className="flex gap-x-2 items-center font-bold group "
            >
              <CommonButton>view all</CommonButton>
            </Link>
          </div>
          <hr className=" border-primary-gray" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 ">
        <div className="lg:space-y-8 space-y-5">
          <EcoFriendlyStore></EcoFriendlyStore>
        </div>
        <div className="lg:space-y-8 space-y-5 ">
          <Charities></Charities>
        </div>
      </div>
    </Container>
  );
};

export default EcoFriendlyCharityContainer;
