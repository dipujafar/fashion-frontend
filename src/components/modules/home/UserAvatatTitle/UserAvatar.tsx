"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";

const UserData = [
  {
    _id: 1,
    image: "/userAvatar1.png",
  },
  {
    _id: 2,
    image: "/userAvatar2.png",
  },
  {
    _id: 3,
    image: "/userAvatar3.png",
  },
  {
    _id: 4,
    image: "/userAvatar4.png",
  },
  {
    _id: 5,
    image: "/userAvatar2.png",
  },
];
const UserAvatar = () => {
  return (
    <Container className="md:-translate-y-5 -translate-y-4">
      <div className="space-y-2">
        <motion.h6
          initial={{ opacity: 0, y: "10%" }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          }}
          viewport={{ once: true }}
          className="uppercase md:text-base text-sm text-center text-primary-gray"
        >
          Become a Fashion philanthropist today!
        </motion.h6>
        <div className="flex justify-center flex-shrink-0 -space-x-1.5 md:-space-x-2">
          {UserData.map((data) => (
            <motion.div
              initial={{ opacity: 0, x: "5%" }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  duration: 0.8,
                  delay: 0.15 * data?._id,
                },
              }}
              viewport={{ once: true }}
              key={data._id}
            >
              <Image
                src={data.image}
                alt="user avatar"
                width={1200}
                height={1200}
                className="size-12 rounded-full"
              />
            </motion.div>
          ))}
        </div>

        <motion.h3
          initial={{ opacity: 0, y: "10%" }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
          viewport={{ once: true }}
          className="lg:text-3xl md:text-lg text-sm text-center max-w-5xl mx-auto"
        >
          Trusted by thousands for quality and style. Discover why users love
          our secondhand marketplace and charitable impact.
        </motion.h3>
      </div>
    </Container>
  );
};

export default UserAvatar;
