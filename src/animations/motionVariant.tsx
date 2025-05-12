
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
  

export const fadeUpWithBlurVariants = (stiffness?: number, damping?: number, mass?: number) => ({
  initial: {
    y: 50,
    opacity: 0,
    filter: "blur(3px)",
  },

  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      stiffness: stiffness || 190,
      damping: damping || 40,
      mass: mass || 0.3,
      staggerChildren: 0.09,
      when: "beforeChildren",
    },
  },
});