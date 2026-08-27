"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface TUserRoleCardProps {
  data: {
    _id: number;
    image: string;
    title: string;
    description: string;
    link: string;
    role: string;
  };
}

const UserRoleCard = ({ data }: TUserRoleCardProps) => {
  return (
    <Card className="shadow-none py-6 h-full flex flex-col">
      <CardContent className="lg:space-y-6 space-y-4 flex flex-col flex-1">
        <Image
          src={data?.image}
          alt="user_role_image"
          width={1200}
          height={1200}
          className="w-full max-h-[175px]"
        ></Image>

        {/* This block grows to fill leftover space, pushing the button down */}
        <div className="flex-1">
          <h1 className="text-lg font-medium">{data?.title}</h1>
          <p className="text-sm text-primary-gray">
            {data?.description}...{" "}
            <Link
              href={handleRedirectUser(data?.role)}
              className="text-primary font-semibold cursor-pointer"
            >
              More Details
            </Link>
          </p>
        </div>

        {/* mt-auto keeps the button pinned to the bottom of the card */}
        <Link href={data?.link} className="mt-auto">
          <Button
            variant={"default"}
            className="rounded-full h-10 w-full cursor-pointer"
          >
            Join Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserRoleCard;

// user redirect for more details

export const handleRedirectUser = (role: string) => {
  switch (role) {
    case "individual_user":
      return "/user-details#individual_user";
    case "charitable_organization":
      return "/user-details#charitable_organization";
    case "charity_shop":
      return "/user-details#charity_store";
    case "eco_friendly_store":
      return "/user-details#eco_friendly_store";
    case "professional_seller":
      return "/user-details#professional_seller";
    case "assisted_seller":
      return "/user-details#assisted_seller";
    case "ambassador":
      return "/user-details#ambassador";
    case "celebrity":
      return "/user-details#celebrity";
    default:
      return "/user-details";
  }
};