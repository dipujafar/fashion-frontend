"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/animations/FramerMotionValiantsFadeUp";

const TeamMember = [
  {
    image: "/teamMember3.png",
    name: "Sarah Thompson",
    designation: "Founder/CEO",
  },
  {
    image: "/teamMember1.png",
    name: "James Carter",
    designation: "Chief Operating Officer (COO)",
  },
  {
    image: "/teamMember3.png",
    name: "Michael Lee",
    designation: "Marketing and Sales Director",
  },
  {
    image: "/teamMember2.png",
    name: "Michael Lee",
    designation: "Marketing and Sales Director",
  },
];

const TeamMemberData = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "10%" }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "10%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        variants={parentVariants}
        initial="initial"
        whileInView="animate"
        exit="exit"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:mt-10 mt-5 "
      >
        {TeamMember.map((member, index) => (
          <motion.div
            className="lg:space-y-2 space-y-1 flex flex-col"
            key={index}
            variants={childrenVariants}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={1200}
              height={1200}
              className="w-auto rounded-lg object-cover origin-center"
            ></Image>
            <div className=" text-primary-black 2xl:text-3xl text-xl font-medium">
              {member.name}
            </div>
            <div className="lg:text-xl text-[12px] truncate text-primary-gray">
              {member.designation}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TeamMemberData;
