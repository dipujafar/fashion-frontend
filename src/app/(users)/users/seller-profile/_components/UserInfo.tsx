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
  emailVerified?: boolean;
  phoneVerified?: boolean;
  badge?: string;
  progressText?: string;
  progressValue?: number;
}

export default function UserInfo({
  name = "Sarah Rahman",
  location = "Los Angeles, CA",
}: ProfileCardProps) {
  return (
    <Card
      style={{ boxShadow: "1px 4px 10px 0px rgba(0, 0, 0, 0.15)" }}
      className="w-full border-none "
    >
      <CardContent className="lg:px-6 px-3">
        {/* message and follow button */}
        <div className="flex gap-x-2">
          <div className="flex-1">
            <Button className=" w-full bg-transparent hover:text-white text-black border-b-2 border-r-2 border-black rounded-none duration-500 cursor-pointer group">
              Message <AnimatedArrow />
            </Button>
          </div>
          <div className="flex-1 group">
            <Button className="rounded-none w-full">
              Follow <AnimatedArrow />
            </Button>
          </div>
        </div>

        <div className="space-y-6 mt-4">
          {/* Name and Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium text-lg">{name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium text-lg">{location}</p>
            </div>
          </div>

          {/* Email and Phone Verification */}
          <div className="flex  flex-wrap gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <div className="flex gap-x-2">
                <span className=" font-medium">example@gmail.com</span>
                <div className="flex items-center text-green-500 ">
                  (<VerifiedIcon />
                  <span className="text-green-500 font-medium">Verified</span>)
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Phone</p>
              <div className="flex flex-wrap gap-x-2">
                <span className=" font-medium">+123456789</span>
                <div className="flex  flex-wrap items-center text-green-500 ">
                  (<VerifiedIcon />
                  <span className="text-green-500 font-medium">Verified</span>)
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Social Media</p>
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

        <div className="bg-[#FFFBE6] mt-5 p-2 rounded-lg flex justify-center items-center">
          <AwardIcon />
          <p className="text-[#8C7600]">Fashion Activist</p>
        </div>
      </CardContent>
    </Card>
  );
}
