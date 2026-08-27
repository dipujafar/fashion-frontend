import { cn } from "@/lib/utils";
import { defaultImg } from "@/utils/defaultImg";
import { Dot } from "lucide-react";
import Image from "next/image";
import React from "react";

interface TUserDetails {
  _id: number,
  id: string,
  name: string,
  image: string,
  title: string,
  features: {
    _id: number,
    title: string,
    description: string[],
  }[]
}

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
        placeholder="blur"
        blurDataURL={defaultImg?.placeholderImg}
      />
      <div className="text-[#7F7F7F]">
        <h3 className="lg:text-3xl md:text-2xl text-xl font-bold text-[#232323] mb-2">{data?.name}</h3>
        <p>{data?.title}</p>
        <p>Key Features:</p>
        <div className="px-1">
          {data?.features.map((feature, index) => (
            <div className="my-2" key={index}>
              <div className="flex ">
                <Dot />
                <span className="flex-1 text-gray-700">{feature?.title}</span>
              </div>
              <div className="px-5">
                {feature?.description.map((description, index) => (
                  <p key={index} className="flex ">
                    <Dot />
                    <span className="flex-1">{description}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
