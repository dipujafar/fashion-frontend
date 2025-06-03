import { ArrowLeft } from "lucide-react";
import React from "react";

const AnimatedArrowReverse = ({ size }: { size?: number }) => {
  return (
    <div className="relative overflow-hidden">
      <ArrowLeft
        className="ease-in-out-circ transition-all duration-500 group-hover:-translate-x-5"
        size={size || 24}
      />

      <ArrowLeft
        className="ease-in-out-circ absolute top-0 translate-x-5 transition-all duration-500 group-hover:translate-x-0"
        size={size || 24}
      />
    </div>
  );
};

export default AnimatedArrowReverse;
