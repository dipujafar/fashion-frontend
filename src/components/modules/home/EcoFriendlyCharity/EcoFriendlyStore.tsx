"use client";
import ecoFriendLyStoreImage from "@/assets/images/home/EcoFriendlyCharity/ecoFriendlyStoreImage.png";
import CommonButton from "@/components/ui/common-button";
import Image from "next/image";
import { motion } from "framer-motion";

const EcoFriendlyStore = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "10%" }}
      whileInView={{ opacity: 1, x: "0" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      exit={{ opacity: 0, x: "10%" }}
      viewport={{ once: true }}
      className="relative group"
    >
      <Image src={ecoFriendLyStoreImage} alt="ecoFriendly_store"></Image>
      <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white py-6 px-2 backdrop-blur-[7px] transition-all duration-1000 ease-in-out h-[80px] group-hover:h-full  origin-bottom overflow-hidden">
        <div className="flex-center  md:gap-x-5 gap-x-2">
          <p className="lg:text-xl text-sm font-semibold group-hover:rounded-2xl md:group-hover:text-3xl group-hover:text-xl duration-1000">
            Shop Eco-Conscious Brands & Support the Planet
          </p>
          <CommonButton className="lg:min-w-40 md:min-w-10 ">
            SHOP NOW
          </CommonButton>
        </div>
      </div>
    </motion.div>
  );
};

export default EcoFriendlyStore;
