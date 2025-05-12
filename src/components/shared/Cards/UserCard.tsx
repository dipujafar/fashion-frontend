import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TUser } from "@/types";
import { userTagColor } from "@/utils/userTagColor";
import { Check } from "lucide-react";
import Image from "next/image";

const UserCard = ({ data }: { data: TUser }) => {
  return (
    <Card className="py-0 hover:-translate-y-1 transition-all duration-500 hover:border-primary-gray/40">
      <CardContent className="p-4">
        <Image
          src={data.coverImage}
          alt="user_cover_image"
          width={1200}
          height={1200}
          className="max-h-[240px]"
        ></Image>
        <div className="-translate-y-10 relative size-20 rounded-full mx-auto">
          <Image
            src={data.image}
            alt="user_image"
            width={1200}
            height={1200}
            className="size-20 rounded-full mx-auto "
          ></Image>
          <div
            className="rounded-full size-5 flex justify-center items-center absolute top-0 right-1"
            style={{ backgroundColor: userTagColor(data?.type) }}
          >
            <Check size={16} color="#fff"></Check>
          </div>
        </div>
        <div className="xl:space-y-4 space-y-3 flex flex-col items-center justify-center w-full -translate-y-5">
          <div className="space-y-[2px]">
            <h5 className="font-medium text-center text-lg">{data?.name}</h5>
            <div className="flex items-center gap-x-1">
              <div
                className={`px-1  text-primary-white rounded text-sm w-fit mx-auto h-fit `}
                style={{ backgroundColor: userTagColor(data?.type) }}
              >
                <span className="uppercase text-center">{data?.type}</span>
              </div>
              {data?.bestOn && (
                <div className="flex items-center gap-x-1">
                  ||
                  <div
                    className={`px-1 bg-[#87CEEB]  text-primary-white rounded text-sm w-fit mx-auto h-fit `}
                  >
                    <span className="uppercase text-center">
                      {data?.bestOn}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-primary-gray text-sm">{data?.bio}</p>
        </div>
        <Button className="w-full border-r-2 border-b-2 border-primary-black bg-primary-white text-primary-black hover:bg-primary-black/20 cursor-pointer">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
