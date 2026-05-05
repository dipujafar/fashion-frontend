import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import CommonButton from "@/components/ui/common-button";
import CustomAvatar from "@/components/ui/custom-avatar";
import { Rating } from "@/components/ui/rating";
import { LocationIcon } from "@/icons";
import { IUser } from "@/types";
import { userRoleMapper } from "@/utils/userRoleMapper";
import { Check } from "lucide-react";
import Link from "next/link";

const SellerDetails = ({ user }: { user: IUser }) => {
  return (
    <div className=" max-w-lg">
      <div className=" flex justify-between gap-x-2 items-center md:mb-3 mb-2 ">
        <h4 className="uppercase underline text-primary-gray">
          seller information
        </h4>
        <Link
          href={`/member/${user?.userName}`}
          className="flex items-center gap-x-2 group cursor-pointer"
        >
          <p className="font-medium">VIEW DETAILS</p>
          <AnimatedArrow size={18} />
        </Link>
      </div>

      <div
        style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.15)" }}
        className="bg-primary-gray/10 lg:p-4 p-3 rounded-lg "
      >
        <div className="space-y-2">
          <div className="flex-between gap-x-2 ">
            <Link
              href={`/member/${user?.userName}`}
              className="flex items-center gap-x-2 group cursor-pointer"
            >
              <div className="relative size-12 rounded-full">
                {/* <Image
                  src={"/userProfile1.png"}
                  alt="user_image"
                  width={1200}
                  height={1200}
                  className="size-12 rounded-full  "
                ></Image> */}
                <CustomAvatar image={user?.picture?.url || null} name={user?.userName}></CustomAvatar>
                <div
                  className="rounded-full size-4 flex justify-center items-center absolute -top-1 right-1"
                  style={{ backgroundColor: userRoleMapper(user?.auth?.role)?.color }}>
                  <Check size={16} color="#fff"></Check>
                </div>
              </div>
            </Link>

            <div
              style={{ backgroundColor: userRoleMapper(user?.auth?.role)?.color }}
              className="px-3 rounded"
            >
              <h6 className="text-primary-white"> {userRoleMapper(user?.auth?.role)?.label}</h6>
            </div>
          </div>

          <div className="flex-between gap-x-2">
            <div>
              <Link
                href={`/member/${user?.userName}`}
                className="flex items-center gap-x-2 group cursor-pointer"
              >
                <h5 className="font-medium">{user?.userName}</h5>
              </Link>
              <div className="flex items-center gap-x-1">
                <Rating rating={user?.avgRating} size={16}></Rating>
                <p className="text-primary-gray md:text-base text-sm">
                  ({user?.avgRating})
                </p>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <LocationIcon />
              <h6>{[user?.city, user?.state, user?.country]
                .filter(Boolean)
                .join(", ")}</h6>
            </div>
          </div>
          <hr />
        </div>

        <div className="lg:mt-4 mt-3 flex gap-x-2">
          <CommonButton className="flex-1">Ask a Question</CommonButton>
          <CommonButton className="flex-1 bg-primary-white text-black hover:bg-primary-black/10 ">
            Follow seller
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
