"use client"
import React from 'react'
import ProductImageCard from "@/components/shared/Cards/ProductImageCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { IProduct } from '@/types';

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


function TrendingProds({ productsData }: { productsData: IProduct[] }) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      variants={fadeUpVariants as any}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-3"
    >
      {productsData?.map((data) => (
        <motion.div key={data?.id} variants={fadeUpVariants as any}>
          <Link href={`/shop/${data?.id}`}>
            <ProductImageCard data={{ image: data?.images[0]?.url }}></ProductImageCard>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default TrendingProds