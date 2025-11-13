"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TUser } from "@/types";
import { userTagColor } from "@/utils/userTagColor";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


export const userTagColor2 = (type: string) => {
  switch (type.toLowerCase()) {
    case "celebrity":
      return "#123CA6";
    case "eco-friendly store":
      return "#00B047";
    case "charity":
      return "#4B105F";
    case "charity store":
      return "#B59900";
    case "professional seller":
      return "#b91a4f";
    case "ambassador":
      return "#81b91a";
    case "individual seller":
      return "#b96f1a";
    default:
      return "#000";
  }
};

const UserCard = ({ data }: { data: TUser }) => {
  const router = useRouter();
  const handleRedirect = (user: string) => {
    switch (user?.toLowerCase()) {
      case "celebrity":
        return "/celebrity/profile-preview";
      case "eco-friendly store":
        return "/eco-friendly-store/profile-preview";
      case "charity":
        return "/charity/profile-preview";
      case "charity store":
        return "/charity-shop/profile-preview";
      case "professional seller":
        return "/professional-seller/profile-preview";
      case "ambassador":
        return "/ambassador/profile-preview";
      case "individual seller":
        return "/individual-user/profile-preview";
      default:
        return "/";
    }

  }
  return (
    <Card className="py-0 hover:-translate-y-1 transition-all duration-500 hover:border-primary-gray/40">
      <CardContent className="lg:p-4 p-2">
        <div className="flex flex-col md:h-auto h-[330px] ">
          <div >
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
            <div className="xl:space-y-4 space-y-3 flex flex-col items-center justify-center w-full -translate-y-5 italic">
              <div className="space-y-[2px]">
                <h5 className="font-medium text-center text-lg">{data?.name}</h5>
                <div className="flex flex-wrap justify-center items-center gap-x-1">
                  <div
                    className={`text-primary-white rounded text-xs w-fit mx-auto h-fit truncate px-2`}
                    style={{ backgroundColor: userTagColor(data?.type) }}
                  >
                    <span className="uppercase text-center">{data?.type}</span>
                  </div>
                  {data?.bestOn && (
                    <div className="flex items-center gap-x-1">
                      ||
                      <div
                        className={` bg-[#87CEEB]  text-primary-white rounded text-xs w-fit mx-auto h-fit truncate px-2 italic`}
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
          </div>
          <div className="mt-auto">
            <Button onClick={() => router.push(handleRedirect(data?.type))} className="w-full border-r-2 border-b-2 border-primary-black bg-primary-white text-primary-black hover:bg-primary-black/20 cursor-pointer">
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
