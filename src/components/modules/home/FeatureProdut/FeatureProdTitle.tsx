"use client";
import React from 'react'
import FeatureProductCategory from "./FeatureProductCategory";
import Link from "next/link";
import CommonButton from "@/components/ui/common-button";
import { fadeUpWithBlurVariants } from "@/animations/motionVariant";
import { motion } from "framer-motion";

function FeatureProdTitle() {
    return (
        <>
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
            <div className="flex flex-col md:flex-row md:gap-x-4 gap-y-2 justify-between items-center">
                <div className=" md:w-[calc(100%-150px)] w-full">
                    <FeatureProductCategory></FeatureProductCategory>
                </div>
                <Link href={"/shop"}>
                    <CommonButton className="md:py-2 py-0">View All</CommonButton>
                </Link>
            </div>
        </>
    )
}

export default FeatureProdTitle