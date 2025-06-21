import Container from "@/components/shared/Container";
import EcoFriendlyStore from "./EcoFriendlyStore";
import Charities from "./Charities";
import CommonButton from "@/components/ui/common-button";
import Link from "next/link";

const EcoFriendlyCharityContainer = () => {
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="lg:mb-1.5 md:mb-3.5 ">
            <h4 className="section-name md:text-lg lg:text-2xl xl:text-3xl ">Eco-Friendly Store</h4>
          </div>
          <hr className=" border-primary-gray" />
        </div>
        <div className="xl:-translate-1.5 lg:-translate-2.5 md:-translate-1.5  mb-2 md:mb-0">
          <div className="flex justify-between items-center gap-x-4 mb-2  ">
            <h4 className="section-name md:text-lg lg:text-2xl xl:text-3xl">CHARITIES</h4>
            <Link
              href={"/#"}
              className="flex gap-x-2 items-center font-bold group "
            >
              <CommonButton>view all</CommonButton>
            </Link>
          </div>
          <hr className=" border-primary-gray" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:gap-4 gap-2.5 ">
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
