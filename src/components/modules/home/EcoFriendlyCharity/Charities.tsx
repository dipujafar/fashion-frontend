"use client";
import charityImage1 from "@/assets/images/home/EcoFriendlyCharity/charityImage1.png";
import charityImage2 from "@/assets/images/home/EcoFriendlyCharity/charityImage2.png";
import charityImage3 from "@/assets/images/home/EcoFriendlyCharity/charityImage3.png";
import charityImage4 from "@/assets/images/home/EcoFriendlyCharity/charityImage4.png";
import Image from "next/image";
import { motion } from "framer-motion";

const Charities = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid h-full w-full lg:gap-4 gap-2.5  grid-cols-4 grid-rows-4 ">
        <motion.div
          initial={{ opacity: 0, x: "-10%" }}
          whileInView={{ opacity: 1, x: "0" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          exit={{ opacity: 0, x: "-10%" }}
          viewport={{ once: true }}
          className="col-span-2 row-span-2 relative group"
        >
          <Image
            src={charityImage1}
            alt="charity_image"
            className="h-full w-full object-cover origin-center rounded-lg"
          ></Image>
          <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out lg:h-[65px] h-[50px] group-hover:h-full group-hover:rounded-2xl  origin-bottom overflow-hidden">
            <p className="uppercase text-xs lg:text-base md:group-hover:text-2xl group-hover:text-xl duration-1000">
              SAVE THE CHILDREN
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: "10%" }}
          whileInView={{ opacity: 1, x: "0" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          exit={{ opacity: 0, x: "10%" }}
          viewport={{ once: true }}
          className="col-span-2 row-span-2 relative group "
        >
          <Image
            src={charityImage2}
            alt="charity_image"
            className="h-full w-full object-cover origin-center rounded-lg"
          ></Image>
          <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out lg:h-[65px] h-[50px] group-hover:h-full group-hover:rounded-2xl  origin-bottom overflow-hidden">
            <p className="uppercase text-xs lg:text-base md:group-hover:text-2xl group-hover:text-xl duration-1000">
              Plant More Trees
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: "-10%" }}
          whileInView={{ opacity: 1, x: "0" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          exit={{ opacity: 0, x: "-10%" }}
          viewport={{ once: true }}
          className="col-span-2 row-span-2 relative group "
        >
          <Image
            src={charityImage3}
            alt="charity_image"
            className="h-full w-full object-cover origin-center rounded-lg"
          ></Image>
          <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out lg:h-[65px] h-[50px] group-hover:h-full group-hover:rounded-2xl  origin-bottom overflow-hidden">
            <p className="uppercase text-xs lg:text-base md:group-hover:text-2xl group-hover:text-xl duration-1000">
              Women for Women International
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: "10%" }}
          whileInView={{ opacity: 1, x: "0" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          exit={{ opacity: 0, x: "10%" }}
          viewport={{ once: true }}
          className="col-span-2 row-span-2 relative group"
        >
          <Image
            src={charityImage4}
            alt="charity_image"
            className="h-full w-full object-cover origin-center rounded-lg"
          ></Image>
          <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out lg:h-[65px] h-[50px] group-hover:h-full group-hover:rounded-2xl  origin-bottom overflow-hidden">
            <p className="uppercase text-xs lg:text-base md:group-hover:text-2xl group-hover:text-xl duration-1000">
              The Red Cross
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Charities;
