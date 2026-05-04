import { cn } from "@/lib/utils";
import { defaultImg } from "@/utils/defaultImg";
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
          "embla-thumbs__slide__number w-full border! p-1 rounded relative h-40",
          selected && "border-2 "
        )}
      >
        {/* {index + 1} */}
        <Image
          src={data.url || defaultImg?.product}
          fill
          placeholder="blur"
          blurDataURL={defaultImg.placeholderImg}
          alt="thumbnail"
          className={cn("object-contain h-auto w-auto mx-auto")}
        ></Image>
      </button>
    </div>
  );
};
