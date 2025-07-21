"use client";
import facebook from "@/assets/icons/facebook.png";
import instagram from "@/assets/icons/instagram.png";
import linkedin from "@/assets/icons/linkedin.png";
import XIcon from "@/assets/icons/x-icon.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/animations/FramerMotionValiants";

const SocialMedia = () => {
  return (
    <div className="flex gap-x-6 w-full items-center">
      <motion.span
        initial={{ opacity: 0, width: "0%", height: 0 }}
        whileInView={{
          opacity: 1,
          height: "1px",
          width: "40%",
          backgroundColor: "#000",
          transition: { duration: 2 },
        }}
        viewport={{ once: true }}
        exit={{ opacity: 0 }}
        className="flex-grow md:block   bg-primary-black/80 hidden"
      ></motion.span>
      {/* <span className="flex-grow h-[1px] block   bg-primary-black "></span> */}

      <motion.ul
        initial={{ opacity: 0, y: "10%" }}
        whileInView={{
          opacity: 1,
          y: "0%",
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        viewport={{ once: true }}
        exit={{ opacity: 0, y: "10%" }}
      >
        <motion.ul
          variants={parentVariants as any}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex justify-center items-center gap-x-8  w-full md:w-fit "
        >
          <motion.li variants={childrenVariants}>
            <Link href={"https://www.facebook.com/"}>
              <Image src={facebook} alt="facebook"></Image>
            </Link>
          </motion.li>
          <motion.li variants={childrenVariants}>
            <Link href={"https://www.instagram.com/"}>
              <Image src={instagram} alt="instagram"></Image>
            </Link>
          </motion.li>
          <motion.li variants={childrenVariants}>
            <Link href={"https://www.x.com/"}>
              <Image
                src={XIcon}
                alt="X"
                className="xl:max-h-11 xl:max-w-11 lg:max-h-10 lg:max-w-10 md:max-h-8 md:max-w-8 max-h-12 max-w-12"
              ></Image>
            </Link>
          </motion.li>
          <motion.li variants={childrenVariants}>
            <Link href={"https://www.linkedin.com/"}>
              <Image src={linkedin} alt="linkedin"></Image>
            </Link>
          </motion.li>
        </motion.ul>
      </motion.ul>

      <motion.span
        initial={{ opacity: 0, width: "30%", height: 0 }}
        whileInView={{
          opacity: 1,
          height: "1px",
          width: "40%",
          backgroundColor: "#000",
          transition: { duration: 2 },
        }}
        viewport={{ once: true }}
        exit={{ opacity: 0 }}
        className="flex-grow md:block   bg-primary-black/80 hidden"
      ></motion.span>
    </div>
  );
};

export default SocialMedia;
