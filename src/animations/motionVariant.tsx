
export const scaleUpVariant = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
      delay: 0.3,
    },
  },
};

export const scaleUpChildVariant = {
  initial: { scale: 0, x: 10 },
  animate: {
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 30,
      mass: 0.1,
    },
  },
};
  