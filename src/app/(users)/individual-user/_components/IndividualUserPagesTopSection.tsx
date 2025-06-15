"use client";
import Image from "next/image";
import React from "react";
import topSectionBg from "@/assets/images/users/users_page_top_section_image.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";

const navLinks = [
  {
    _id: 1,
    title: "Profile Details",
    href: "/individual-user/profile",
  },
  {
    _id: 2,
    title: "Products Listing",
    href: "/individual-user/uploaded-products-list",
  },
  {
    _id: 3,
    title: "Your Offers",
    href: "/individual-user/offers",
  },
  {
    _id: 4,
    title: "Message",
    href: "/individual-user/message",
  },
  {
    _id: 5,
    title: "Settings",
    href: "/individual-user/settings",
  },
];


const IndividualUserPagesTopSection = () => {
  const pathName = usePathname();
  const currentPath = pathName?.split("/")[2];
  const router = useRouter();

  return (
    <div className="max-h-[240px] relative">
      <Image
        src={topSectionBg}
        alt="bg_image"
        className="max-h-[240px] min-h-[150px] w-full object-cover"
      ></Image>
      <div
        className="max-w-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:px-8 lg:py-4 md:px-6 px-2 py-5 text-primary-white lg:text-5xl md:text-3xl text-xl font-semibold text-center w-full md:backdrop-blur-[7px] backdrop-blur-[4px] rounded-lg"
        style={{
          background: "rgba(217, 217, 217, 0.09)",
        }}
      >
        <div>
          {navLinks.map((navLink) => (
            <Link href={navLink?.href} key={navLink?._id}>
              <Button
                
                className={cn(
                  "rounded border-r-3 border-b-3  capitalize md:min-w-40 md:py-5 cursor-pointer group bg-white hover:bg-white/30  text-black  sm:m-2 m-1 text-[10px] md:text-sm px-2 md:px-3 py-0 md:h-9 h-7 hover:text-white",
                  "border-black",
                  currentPath === navLink?.href?.split("/")[2] &&
                    " text-white bg-black"
                )}
              >
                {navLink.title}
                <AnimatedArrow className="md:size-4 size-3" />
              </Button>
            </Link>
          ))}

          <Button
            className={cn(
              "rounded border-r-3 border-b-3  uppercase md:min-w-40 md:py-5 cursor-pointer group bg-white text-black  sm:m-2 m-1 text-[10px] md:text-sm px-2 md:px-3 py-0 md:h-9 h-7   mx-2 hover:bg-white/30  hover:text-white",
              "border-black"
            )}
            onClick={() => router.push("/sign-in")}
          >
            Logout
            <AnimatedArrow className="md:size-4 size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndividualUserPagesTopSection;
