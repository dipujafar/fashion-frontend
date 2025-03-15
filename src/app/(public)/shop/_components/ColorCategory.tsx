"use client";
import {
  childrenVariants,
  parentVariants,
} from "@/animations/FramerMotionValiants";
import { colorData } from "@/lib/colorData";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

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

const ColorCategory = () => {
  const [show, hide] = useState(true);
  return (
    <div className="xl:space-y-4 space-y-3 ">
      <div className="py-2 border-b flex items-center justify-between">
        <h4 className="text-lg font-bold uppercase">Color</h4>
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
        className="overflow-hidden"
      >
        <motion.div
          variants={parentVariants}
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {colorData?.map((colorData) => (
            <motion.div
              key={colorData._id}
              className="size-[34px] rounded-full border flex justify-center items-center border-primary-gray/50 cursor-pointer"
              variants={childrenVariants}
            >
              <div
                className="size-7 rounded-full"
                style={{ backgroundColor: colorData?.color }}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ColorCategory;
