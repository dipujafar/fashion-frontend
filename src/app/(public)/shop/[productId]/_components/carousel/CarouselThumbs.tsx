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
        onClick={onClick}
        type="button"
        className={cn("embla-thumbs__slide__number border! p-1 rounded relative h-20 w-full")}>
        <Image
          src={data.url || defaultImg?.product}
          fill
          placeholder="blur"
          blurDataURL={defaultImg.placeholderImg}
          alt="thumbnail"
          className={cn("object-cover h-full w-full mx-auto ")}
        ></Image>

        <span className={cn("absolute top-0 left-0 right-0 bottom-0 bg-black/60 rounded transition-opacity duration-300 pointer-events-none", selected && "bg-transparent")} />

      </button>
    </div>
  );
};
