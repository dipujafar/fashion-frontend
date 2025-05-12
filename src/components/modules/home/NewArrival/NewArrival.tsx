import Link from "next/link";
import React from "react";
import PreviewProduct from "./PreviewProduct";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";

const NewArrival = () => {
  return (
    <div>
      <div className="flex justify-between items-center gap-x-4 mb-2 ">
        <h4 className="section-name uppercase">NEW ARRIVAL</h4>
        <Link
          href={"/shop"}
          className="flex gap-x-2 items-center font-bold group "
        >
          <p>VIEW ALL </p>
          <AnimatedArrow></AnimatedArrow>
        </Link>
      </div>
      <hr />
      <PreviewProduct></PreviewProduct>
    </div>
  );
};

export default NewArrival;
