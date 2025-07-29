import { cn } from "@/lib/utils";
import React from "react";

interface TrackingCardProps {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
}

const ProfileDetailsCard = ({ data }: { data: TrackingCardProps[] }) => {
  return (
    <div className="w-full  mx-auto ">
      <div className=" rounded-lg shadow-lg overflow-hidden bg-black">
        <div
          className={cn(
            `grid grid-cols-1 md:grid-cols-${data?.length > 3 ? data?.length - 1: data?.length} lg:grid-cols-${
              data?.length
            } divide-y md:divide-y-0 md:divide-x divide-white/20`
          )}
        >
          {data?.map((item) => (
            <div key={item.id} className="p-4 md:p-6">
              <h3 className="text-sm font-medium text-white/80 mb-2">
                {item.title}
              </h3>
              <div className="flex gap-x-2">
                <p className="text-white font-semibold text-lg break-all">
                  {item.value}
                </p>
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;
