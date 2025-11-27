import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  AwardIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon,
  VerifiedIcon,
} from "@/icons";
import CommonButton from "@/components/ui/common-button";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";

interface ProfileCardProps {
  name?: string;
  location?: string;
  email?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  badge?: string;
  progressText?: string;
  progressValue?: number;
  phone?: string;
  userRole?: string;
  link?: string;
  preview?: string;
}

export const findUserRole = (type: string) => {
  switch (type?.toLowerCase()) {
    case "user":
      return true;
    case "eco-friendly store":
      return true;
    case "charity":
      return true;
    case "charity store":
      return true;
    case "professional seller":
      return true;
    case "ambassador":
      return true;
    case "individual seller":
      return true;
    default:
      return false;
  }
};

export default function UserInfo({
  preview = "",
  name = "Sarah",
  location = "Los Angeles, CA",
  email = "example@gmail.com",
  phone = "+123456789",
  userRole,
  link = "/individual-user/dashboard/profile",
}: ProfileCardProps) {
  return (
    <Card
      style={{ boxShadow: "1px 4px 10px 0px rgba(0, 0, 0, 0.15)" }}
      className="w-full border-none py-2 md:py-4"
    >
      <CardContent className="lg:px-6 px-3">
        {/* Edit Profile Button */}
        {!preview && (
          <Link href={link}>
            <CommonButton className="w-full">Edit Profile</CommonButton>
          </Link>
        )}

        {preview && (
          <div className="flex gap-x-2">
            {/* <div className="flex-1">
              <Button className=" w-full bg-transparent hover:text-white text-black border-b-2 border-r-2 border-black rounded-none duration-500 cursor-pointer group">
                Message <AnimatedArrow />
              </Button>
            </div> */}
            <div className="flex-1 group">
              <Button className="rounded-none w-full cursor-pointer">
                Follow <AnimatedArrow />
              </Button>
            </div>
          </div>
        )}

        <div className="md:space-y-6 space-y-2 mt-4">
          {/* Name and Location */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:gap-4 gap-2">
            <div className="md:space-y-1">
              <p className="md:text-lg text-muted-foreground">Name</p>
              <p className="font-medium md:text-xl">{name}</p>
            </div>
            <div className="md:space-y-1">
              <p className="md:text-lg text-muted-foreground">Location</p>
              <p className="font-medium md:text-xl ">{location}</p>
            </div>
          </div>

          {/* ---------------------- show business tag for charity store --------------------------------- */}
          {userRole === "charity store" ||
            userRole === "eco-friendly-store" ||
            (userRole === "charity" && (
              <div className="space-y-1">
                <p className="md:text-lg text-muted-foreground ">
                  Business Tag
                </p>
                <div className="flex gap-x-2">
                  <span className=" font-medium md:text-xl text-lg">
                    Donating for Flood Relief Efforts
                  </span>
                </div>
              </div>
            ))}

          {/* Email and Phone Verification */}

          <div className="flex  flex-wrap gap-4">
            <div className="md:space-y-1 flex-1">
              <p className="md:text-lg text-muted-foreground">
                {(userRole === "user" ||
                  userRole === "ambassador" ||
                  userRole === "assisted-seller" ||
                  userRole === "celebrity") &&
                  "Email"}{" "}
                {(userRole === "charity store" ||
                  userRole === "charity" ||
                  userRole === "eco-friendly-store" ||
                  userRole === "professional-seller") &&
                  "Official Email"}
              </p>
              <div className="flex flex-wrap gap-x-2">
                {preview !== "preview" && (
                  <span className=" font-medium md:text-xl text-lg">
                    {email}
                  </span>
                )}
                <div className="flex items-center text-green-500 ">
                  <VerifiedIcon />
                  <span className="text-green-500 font-medium">Verified</span>
                </div>
              </div>
            </div>
            <div className="md:space-y-1 flex-1">
              <p className="md:text-lg text-muted-foreground">Phone</p>
              <div className="flex flex-wrap gap-x-2">
                {preview !== "preview" && (
                  <span className=" font-medium md:text-xl text-lg">
                    {phone}
                  </span>
                )}
                <div className="flex  flex-wrap items-center text-green-500 ">
                  <VerifiedIcon />
                  <span className="text-green-500 font-medium">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <p className="md:text-lg text-muted-foreground">Social Media</p>
            <div className="flex items-center gap-x-2">
              <Link href="#">
                <FacebookIcon />
              </Link>
              <Link href="#">
                <InstagramIcon />
              </Link>
              <Link href="#">
                <TwitterIcon />
              </Link>
              <Link href="#">
                <TikTokIcon />
              </Link>
            </div>
          </div>

          {preview && userRole === "celebrity" && (
            <div className="bg-[#FFFBE6] md:mt-5 mt-2 md:p-2 p-1 rounded-lg flex justify-center items-center">
              <AwardIcon />
              <p className="text-[#8C7600]">Fashion Activist</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
