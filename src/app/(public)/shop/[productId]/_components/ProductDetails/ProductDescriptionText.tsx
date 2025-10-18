"use client";
import React, { useState} from "react";
import { motion } from "framer-motion";

const description =
  "The Heart Ruffled Sweatshirt is a perfect blend of comfort, style, and personality. Crafted from a soft cotton blend, this cozy sweatshirt is designed to keep you feeling warm and stylish, whether you're lounging at home or out and about. The standout feature of this sweatshirt is the playful ruffled heart design on the front, which adds a charming and feminine touch to an otherwise classic wardrobe staple.";

export default function ProductDescriptionText() {
  const [openAllText, setOpenAllText] = useState(false);
  const shortText = description.substring(0, 120) + "...";

  return (
    <div className="overflow-hidden">
      <motion.div
        key={openAllText ? "full" : "short"}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <p className="text-gray-800 leading-relaxed">
          {openAllText ? description : shortText}{" "}
          {description.length > 119 && (
            <button
              onClick={() => setOpenAllText((prev) => !prev)}
              className="text-black font-semibold underline ml-1 hover:opacity-75 transition-opacity"
            >
              {openAllText ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </motion.div>
    </div>
  );
}
