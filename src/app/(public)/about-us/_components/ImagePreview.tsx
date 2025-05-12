"use client";
import Image from "next/image";
import frameImage1 from "@/assets/images/about-us/Frame1.png";
import frameImage2 from "@/assets/images/about-us/Frame2.png";
import frameImage3 from "@/assets/images/about-us/Frame3.png";
import { motion } from "framer-motion";

const ImagePreview = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid h-full w-full gap-4   grid-cols-4 grid-rows-4 rounded-lg ">
        <motion.div
          initial={{ opacity: 0, x: "-10%" }}
          whileInView={{ opacity: 1, x: "0" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          exit={{ opacity: 0, x: "-10%" }}
          viewport={{ once: true }}
          className="col-span-2 row-span-4  rounded-lg  flex items-center justify-center"
        >
          <Image
            src={frameImage1}
            alt="frame1"
            width={1200}
            height={1200}
            className="w-full max-h-[766px] object-cover rounded-md"
          ></Image>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: "10%" }}
          whileInView={{ opacity: 1, x: "0" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          exit={{ opacity: 0, x: "10%" }}
          viewport={{ once: true }}
          className="col-span-2 row-span-2  rounded-lg  flex items-center justify-center"
        >
          <Image
            src={frameImage2}
            alt="frame2"
            width={1200}
            height={1200}
            className="w-full max-h-[375px] object-cover rounded-md"
          ></Image>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: "-10%" }}
          whileInView={{ opacity: 1, x: "0" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          exit={{ opacity: 0, x: "-10%" }}
          viewport={{ once: true }}
          className="col-span-2 row-span-2 rounded-lg  flex items-center justify-center"
        >
          <Image
            src={frameImage3}
            alt="frame3"
            width={1200}
            height={1200}
            className="w-full max-h-[375px] object-cover rounded-md"
          ></Image>
        </motion.div>
      </div>
    </div>
  );
};

export default ImagePreview;
