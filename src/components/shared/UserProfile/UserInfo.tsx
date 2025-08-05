import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon,
  VerifiedIcon,
} from "@/icons";
import CommonButton from "@/components/ui/common-button";

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
  name = "Sarah Rahman",
  location = "Los Angeles, CA",
  email = "example@gmail.com",
  phone = "+123456789",
  userRole,
  link ="/individual-user/profile"
}: ProfileCardProps) {
  return (
    <Card
      style={{ boxShadow: "1px 4px 10px 0px rgba(0, 0, 0, 0.15)" }}
      className="w-full border-none "
    >
      <CardContent className="lg:px-6 px-3">
        {/* Edit Profile Button */}
        <Link href={link}>
          <CommonButton className="w-full">Edit Profile</CommonButton>
        </Link>

        <div className="space-y-6 mt-4">
          {/* Name and Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="md:text-lg text-muted-foreground">Name</p>
              <p className="font-medium md:text-xl text-lg">{name}</p>
            </div>
            <div className="space-y-1">
              <p className="md:text-lg text-muted-foreground">Location</p>
              <p className="font-medium md:text-xl text-lg">{location}</p>
            </div>
          </div>

          {/* ---------------------- show business tag for charity store --------------------------------- */}
          {userRole === "charity store" || userRole === "eco-friendly-store" && (
            <div className="space-y-1">
              <p className="md:text-lg text-muted-foreground ">Business Tag</p>
              <div className="flex gap-x-2">
                <span className=" font-medium md:text-xl text-lg">
                  Donating for Flood Relief Efforts
                </span>
              </div>
            </div>
          )}

          {/* Email and Phone Verification */}

          <div className="flex  flex-wrap gap-4">
            <div className="space-y-1">
              <p className="md:text-lg text-muted-foreground">
                {userRole === "user" && "Email"}{" "}
                {userRole === "charity store" || userRole === "charity" || userRole === "eco-friendly-store" && "Business Email"}
              </p>
              <div className="flex flex-wrap gap-x-2">
                <span className=" font-medium md:text-xl text-lg">{email}</span>
                <div className="flex items-center text-green-500 ">
                  (<VerifiedIcon />
                  <span className="text-green-500 font-medium">Verified</span>)
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="md:text-lg text-muted-foreground">Phone</p>
              <div className="flex flex-wrap gap-x-2">
                <span className=" font-medium md:text-xl text-lg">{phone}</span>
                <div className="flex  flex-wrap items-center text-green-500 ">
                  (<VerifiedIcon />
                  <span className="text-green-500 font-medium">Verified</span>)
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
        </div>
      </CardContent>
    </Card>
  );
}
