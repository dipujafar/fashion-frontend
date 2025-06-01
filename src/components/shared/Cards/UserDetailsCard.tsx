import { cn } from "@/lib/utils";
import { TUserDetails } from "@/types";
import { Dot } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserDetailsCard = ({
  data,
  className,
}: {
  data: TUserDetails;
  className?: string;
}) => {
  return (
    <div id={data?.id} className={cn("flex flex-col lg:flex-row gap-4 ", className)}>
      <Image
        src={data?.image}
        alt="user image"
        className="w-full lg:w-1/2 rounded-lg h-fit max-h-[600px] object-cover"
        width={1200}
        height={1200}
      />
      <div className="text-[#7F7F7F]">
        <h3 className="lg:text-[40px] md:text-3xl text-xl  font-bold text-[#232323]">{data?.name}</h3>
        <p>{data?.title}</p>
        <p>Key Features:</p>
        <div className="px-1">
          {data?.features.map((feature, index) => (
            <p key={index}>
              <div className="flex ">
                <Dot />
                <span className="flex-1">{feature?.title}</span>
              </div>
              <div className="px-5">
                {feature?.description.map((description, index) => (
                  <p key={index} className="flex ">
                    <Dot />
                    <span className="flex-1">{description}</span>
                  </p>
                ))}
              </div>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
