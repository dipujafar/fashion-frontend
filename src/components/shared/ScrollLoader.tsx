"use client";
import { motion, useScroll } from "framer-motion";

const ScrollLoader = () => {
  const { scrollXProgress } = useScroll();
  return (
    <motion.div style={{ width: scrollXProgress }}>
      <div className="bg-primary-red fixed top-0 size-3"></div>
    </motion.div>
  );
};

export default ScrollLoader;
