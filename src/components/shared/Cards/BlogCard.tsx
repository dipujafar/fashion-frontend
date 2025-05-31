import { Card, CardContent } from "@/components/ui/card";
import { CalenderIcon } from "@/icons";
import { TBlogsData } from "@/types";
import { sliceText } from "@/utils/SliceText";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import React from "react";

const BlogCard = ({ data }: { data: TBlogsData }) => {
  return (
    <Card className="border-none  hover:-translate-y-1 duration-500 hover:bg-gray-100 py-4">
      <CardContent className="space-y-4 px-4">
        <Image
          src={data?.image}
          alt="blogImage"
          width={1200}
          height={1200}
          className="w-full max-h-[220px] object-cover rounded-lg"
        ></Image>
        <div className="space-y-2">
          {/*==================== date and feedback ============================== */}
          <div className="flex text-sm text-primary-gray">
            {/* date */}
            <div className="flex justify-center items-center pr-2 gap-x-1 border-r border-r-black">
              <CalenderIcon />
              <p className="truncate">{data?.date}</p>
            </div>
            {/* feedback */}
            <div className="flex justify-center items-center px-3 gap-x-1">
              <div className="border rounded-full size-6 flex justify-center items-center border-primary-gray">
                <MessageSquare size={18} color="#616161" />
              </div>
              <p className="truncate">{data?.totalFeedback} Feedbacks</p>
            </div>
          </div>
          {/* =================================== description ============================ */}
          <p className="text-primary-black text-sm">
            {sliceText(data?.description, 175)}
          </p>

          {data?.description?.length > 174 && (
            <p className="text-primary-red font-bold uppercase text-sm">
              Read More
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
