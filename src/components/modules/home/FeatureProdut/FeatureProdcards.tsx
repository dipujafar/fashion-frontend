"use client"
import React from 'react'
import { motion } from "framer-motion";
import { fadeUpWithBlurVariants } from '@/animations/motionVariant';
import { IProduct } from '@/types';
import PProductCard from '@/components/shared/Cards/PProductCard';

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

function FeatureProdcards({ productsData }: { productsData: IProduct[] }) {
  return (
    <div>
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={fadeUpVariants as any}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3     2xl:grid-cols-4  md:gap-4 gap-x-2 gap-y-4 xl:gap-6 "
      >
        {productsData?.slice(0, 8).map((prod) => (
          <motion.div variants={fadeUpWithBlurVariants as any} key={prod.id}>
            <PProductCard data={prod}></PProductCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default FeatureProdcards