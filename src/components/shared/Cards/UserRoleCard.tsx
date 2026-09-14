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
    slug: string;
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
              href={`${data?.link}`}
              className="text-primary font-semibold cursor-pointer"
            >
              More Details
            </Link>
          </p>
        </div>

        {/* mt-auto keeps the button pinned to the bottom of the card */}
        <Link href={`/sign-up/${data?.slug}`} className="mt-auto">
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