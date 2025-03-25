import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  data: any;
};

export const CarouselThumbs: React.FC<PropType> = (props) => {
  const { selected, onClick, data } = props;

  return (
    <div className={"embla-thumbs__slide"}>
      <button
        onMouseEnter={onClick}
        type="button"
        className={cn(
          "embla-thumbs__slide__number w-full !border p-1 rounded",
          selected && "border-2= "
        )}
      >
        {/* {index + 1} */}
        <Image
          src={data.url}
          width={500}
          height={500}
          alt="thumbnail"
          className={cn(" h-full w-full ")}
        ></Image>
      </button>
    </div>
  );
};
