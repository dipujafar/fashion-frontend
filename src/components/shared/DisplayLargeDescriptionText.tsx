"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DisplayLargeDescriptionText({
  data,
  length = 120,
}: {
  data: string;
  length?: number;
}) {
  const [openAllText, setOpenAllText] = useState(false);
  const isLong = data?.length > length;
  const shortText = isLong ? data.substring(0, length) + "..." : data;

  return (
    <div className="overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={openAllText ? "full" : "short"}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <p className="text-gray-800 leading-relaxed">
            {openAllText ? data : shortText}
            {isLong && (
              <button
                onClick={() => setOpenAllText((prev) => !prev)}
                className="text-black font-semibold underline ml-1 hover:opacity-75 transition-opacity"
              >
                {openAllText ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}