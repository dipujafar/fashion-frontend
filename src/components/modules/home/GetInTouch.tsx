import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const GetInTouch = () => {
  return (
    <div className="bg-gradient-to-r from-[#0D0000] via-[#310015] to-[#0D0000] md:py-8 py-5 text-white">
      <Container className=" flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div>
          <h4 className="md:text-3xl text-xl font-bold mb-1">
            Get in Touch with Us
          </h4>
          <p className="md:font-medium md:text-base text-sm lg:max-w-xl max-w-lg">
            We’d love to hear from you! Whether you have a question, need
            support, or want to share feedback, our team is here to help.
          </p>
        </div>
        <Link href={"#"}>
        <Button className="group bg-primary-white text-primary-black py-5 rounded-xs hover:bg-primary-white/90">CONTACT US <AnimatedArrow></AnimatedArrow></Button>
        </Link>
      </Container>
    </div>
  );
};

export default GetInTouch;
