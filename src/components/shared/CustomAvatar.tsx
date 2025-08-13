import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

const CustomAvatar = ({
  img,
  name,
  className,
  fallbackClass,
}: {
  img: any;
  name: string;
  className?: string;
  fallbackClass?: string;
}) => {
  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={img?.src || img} className="object-cover" />
      <AvatarFallback className={cn("bg-gray-300 md:text-3xl text-xl uppercase", fallbackClass)}>
         {name?.split(" ").length > 1 ? (
              <p>
                {name?.split(" ")[0]?.charAt(0)?.toLocaleUpperCase()}
                {name?.split(" ")[1]?.charAt(0)?.toLocaleUpperCase()}
              </p>
            ) : (
              name?.split(" ")[0].slice(0, 2)
            )}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;