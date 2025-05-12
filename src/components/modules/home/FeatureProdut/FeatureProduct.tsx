"use client";
import ProductCard from "@/components/shared/Cards/ProductCard";
import Container from "@/components/shared/Container";
import { productsData } from "@/data/dummyData.tsx";
import React from "react";
import FeatureProductCategory from "./FeatureProductCategory";
import Link from "next/link";
import CommonButton from "@/components/ui/common-button";
import { motion } from "framer-motion";
import { fadeUpWithBlurVariants } from "@/animations/motionVariant";

const fadeUpVariants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const FeatureProduct = () => {
  return (
    <Container className="lg:space-y-8 space-y-4">
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={fadeUpWithBlurVariants()}
        viewport={{ once: true }}
      >
        <motion.h6
          variants={fadeUpWithBlurVariants()}
          className="page-title uppercase md:text-xl text-base text-center  mb-2"
        >
          fashion trend, style
        </motion.h6>
        <motion.h2
          variants={fadeUpWithBlurVariants()}
          className="section-name text-center lg:text-3xl md:text-base text-sm"
        >
          Timeless Fashion, Sustainable Impact
        </motion.h2>
      </motion.div>
      <div className="flex gap-x-4 justify-between items-center">
        <div className=" md:w-[calc(100%-150px)] w-[calc(100%-110px)]">
          <FeatureProductCategory></FeatureProductCategory>
        </div>
        <Link href={"/shop"}>
          <CommonButton className="py-2">View All</CommonButton>
        </Link>
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        variants={fadeUpVariants}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3     2xl:grid-cols-4  md:gap-4 gap-x-2 gap-y-4 xl:gap-6 "
      >
        {productsData?.slice(0, 8).map((user) => (
          <motion.div  variants={fadeUpVariants} key={user._id}>
            <ProductCard data={user}></ProductCard>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
};

export default FeatureProduct;
