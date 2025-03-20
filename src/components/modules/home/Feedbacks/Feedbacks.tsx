import Container from "@/components/shared/Container";
import Link from "next/link";
import FeedbacksCarousel from "./FeedbacksCarousel";

const Feedbacks = () => {
  return (
    <div className="bg-[#F6F6F6] lg:py-14 py-8">
      <Container>
        <div className="flex justify-between items-center gap-x-4 mb-2 relative ">
          <h4 className="section-name">OUR HAPPY CLIENTS</h4>
        </div>
        <hr className=" border-primary-gray" />
        <FeedbacksCarousel></FeedbacksCarousel>
      </Container>
    </div>
  );
};

export default Feedbacks;
