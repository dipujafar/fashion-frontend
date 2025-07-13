import Link from "next/link";
import React from "react";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import PreviewProduct from "./PreviewProduct";
import Container from "../Container";
type TProps = {
  title: string;
  linkTitle?: string;
  link?: string;
  data: {
    _id: number;
    image: string;
  }[];
};

const DisplayProductSection = ({ title, linkTitle, link, data }: TProps) => {
  return (
    <div>
      <div className="flex justify-between items-center gap-x-4 mb-2 ">
        <h4 className="section-name uppercase">{title}</h4>
        {link && (
          <Link
            href={link}
            className="flex gap-x-2 items-center font-bold group "
          >
            <p>{linkTitle} </p>
            <AnimatedArrow size={20}></AnimatedArrow>
          </Link>
        )}
      </div>
      <hr />
      <PreviewProduct productData={data}></PreviewProduct>
    </div>
  );
};

export default DisplayProductSection;
