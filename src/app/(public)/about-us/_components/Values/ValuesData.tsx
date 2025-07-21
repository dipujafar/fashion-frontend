"use client";
import {
  childrenVariants,
  parentVariants,
} from "@/animations/FramerMotionValiants";
import { motion } from "framer-motion";
import valuesImage from "@/assets/images/about-us/valuesImage2.png";
import Image from "next/image";
import Link from "next/link";
const Values = [
  "Quality",
  "Sustainability",
  "Innovation",
  "Ethical Production",
  "Customer Satisfaction",
];

const ValuesData = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-10%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="md:space-y-8 space-y-5"
      >
        <motion.div
          variants={parentVariants as any}
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ once: true }}
          className="lg:space-y-9 space-y-3"
        >
          {Values.map((value, index) => (
            <motion.div
              variants={childrenVariants}
              key={index}
              className="flex gap-x-3 items-center"
            >
              <span className="bg-[#b0ef8f] h-10 w-10 flex items-center justify-center rounded-full pl-1">
                <motion.svg
                  width="41"
                  height="38"
                  viewBox="0 0 41 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.path
                    d="M13.0516 37.8395L12.8277 37.458C9.40766 31.631 0.319457 19.2652 0.227657 19.141L0.0965576 18.9629L3.19286 15.9029L12.9941 22.7468C19.1652 14.7389 24.9224 9.23867 28.6778 6.02677C32.7859 2.51327 35.46 0.895772 35.487 0.880272L35.5478 0.843872H40.8L40.2983 1.29067C27.3954 12.7833 13.41 37.2097 13.2707 37.4551L13.0516 37.8395Z"
                    variants={{
                      hidden: {
                        pathLength: 0,
                        fill: "rgba(0, 144, 69, 0)", // Start with transparent fill
                      },
                      visible: {
                        pathLength: 1,
                        fill: "rgba(0, 144, 69, 1)", // End with full color
                        transition: {
                          pathLength: {
                            duration: 0.8,
                            ease: "easeInOut",
                          },
                          fill: {
                            duration: 0.5,
                            delay: 0.8, // Start filling after path is drawn
                          },
                        },
                      },
                    }}
                    stroke="#009045"
                    strokeWidth="2"
                    strokeLinecap="round"

                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  />
                </motion.svg>
              </span>
              <p className="text-lg text-primary-gray">{value}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={childrenVariants}
          className="flex items-center gap-x-4"
        >
          <Image
            src={valuesImage}
            alt="valuesImage"
            className="rounded-lg"
          ></Image>
          <div>
            <h6 className="text-lg">Simple & Fast </h6>
            <Link
              href={"/#"}
              className="md:text-2xl underline text-primary-red font-bold"
            >
              Join Us in Our Mission
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ValuesData;
