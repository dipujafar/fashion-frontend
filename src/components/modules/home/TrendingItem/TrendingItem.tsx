"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import ProductImageCard from "@/components/shared/Cards/ProductImageCard";
import Container from "@/components/shared/Container";
import { trendingProductData } from "@/data/dummyData.tsx";
import Link from "next/link";
import { motion } from "framer-motion";

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

const TrendingItem = () => {
  return (
    <Container>
      <div className="flex justify-between items-center gap-x-4 mb-2 ">
        <h4 className="section-name">Trending item</h4>
        <Link
          href={"/shop"}
          className="flex gap-x-2 items-center font-bold group "
        >
          <p>VIEW ALL</p>
          <AnimatedArrow size={20}></AnimatedArrow>
        </Link>
      </div>
      <hr className=" border-primary-gray" />

      <motion.div
        initial="initial"
        whileInView="animate"
        variants={fadeUpVariants as any}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-3 xl:mt-8  md:mt-6 mt-4"
      >
        {trendingProductData?.map((data) => (
          <motion.div key={data?._id} variants={fadeUpVariants as any}>
            <Link href={`/shop/${data?._id}`}>
              <ProductImageCard data={data}></ProductImageCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
};

export default TrendingItem;
