"use client";
import {
  childrenVariants,
  parentVariants,
} from "@/animations/FramerMotionValiants";
import { RangeSlider } from "@/components/ui/dual-range-slider";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import reverseIcon from "@/assets/icons/reverseIcon.png";
import Image from "next/image";

const containerVariants = {
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: "0.75rem",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  hidden: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

const PriceCategory = () => {
  const [show, hide] = useState(true);
  const [values, setValues] = useState([0, 500]);
  return (
    <div className="xl:space-y-4 space-y-3 ">
      <div className="py-2 border-b flex items-center justify-between">
        <h4 className="text-lg font-bold uppercase">PRICE</h4>
        <div>
          <button
            onClick={() => {
              hide(!show);
            }}
            className="text-primary-gray hover:text-primary-blue transition-all duration-300 cursor-pointer  w-8 border h-fit flex justify-center items-center"
          >
            {show ? <Minus /> : <Plus />}
          </button>
        </div>
      </div>
      {/* =============== user types ================ */}
      <motion.div
        initial={show ? "visible" : "hidden"}
        animate={show ? "visible" : "hidden"}
        exit="hidden"
        variants={containerVariants}
      >
        <motion.div
          variants={parentVariants}
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ once: true }}
        >
          <div>
            <RangeSlider
              value={values}
              onValueChange={(price) => setValues(price)}
              max={values[1] >= 950 ? values[1] + 100 : 1000}
              step={1}
            />
          </div>
          <div className=" flex items-center justify-between mt-5 gap-x-2">
            <div className="mr-2 border w-full flex-1 rounded flex items-center justify-center text-primary-gray">
              ${values[0]}
            </div>
            <Image src={reverseIcon} alt="reverseIcon"></Image>
            <div className="mr-2 border w-full flex-1 rounded flex items-center justify-center text-primary-gray">
              ${values[1]}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PriceCategory;
