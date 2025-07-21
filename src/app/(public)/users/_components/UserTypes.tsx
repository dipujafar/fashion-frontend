"use client";
import {
  childrenVariants,
  parentVariants,
} from "@/animations/FramerMotionValiants";
import { Checkbox } from "@/components/ui/checkbox";
import { userTypes } from "@/lib/userTypeData";
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

const UserTypes = () => {
  const [show, hide] = useState(true);
  return (
    <div className="xl:space-y-4 space-y-3 ">
      <div className="py-2 border-b flex items-center justify-between">
        <h4 className="text-lg font-bold">USER TYPE</h4>
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
        variants={containerVariants as any}
        className="overflow-hidden"
      >
        <motion.div
          variants={parentVariants as any}
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {userTypes?.map((userType) => (
            <motion.div
              variants={childrenVariants}
              key={userType?._id}
              className="flex items-center space-x-3"
            >
              <Checkbox id={userType?.value} className="border-primary-gray" />
              <label
                htmlFor={userType?.value}
                className=" text-primary-gray leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg"
              >
                {userType?.label}
              </label>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserTypes;
