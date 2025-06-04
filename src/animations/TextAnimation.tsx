"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function TextAnimation({
  text = "",
  duration = 0.3,
  delayMultiple = 0.04,
  initialDelay = 0,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className = "",
  reverse = false,
}) {
  return (
    <div className="flex  space-x-1">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            exit="hidden"
            variants={framerProps}
            transition={
              reverse
                ? {
                    duration,
                    delay: initialDelay + (text?.length - 1 - i) * delayMultiple, // reversed delay here
                  }
                : { duration, delay: initialDelay + i * delayMultiple }
            }
            className={cn("tracking-tight", className)}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}
