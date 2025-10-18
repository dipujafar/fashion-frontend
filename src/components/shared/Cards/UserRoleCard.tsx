"use client";
import { Card, CardContent } from "@/components/ui/card";
import CommonButton from "@/components/ui/common-button";
import { TUserRoleData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const UserRoleCard = ({ data }: { data: TUserRoleData }) => {
  const router = useRouter();

  return (
    <Card className="shadow-none py-6">
      <CardContent className="lg:space-y-6 space-y-4">
        <Image
          src={data?.image}
          alt="user_role_image"
          width={1200}
          height={1200}
          className="w-full  max-h-[175px]"
        ></Image>
        <div>
          <h1 className="text-lg font-medium">{data?.title}</h1>
          <p className="text-sm text-primary-gray">
            {data?.description}...{" "}
            <span
              onClick={() => handleRedirectUser(data?.role, router)}
              className="text-primary font-semibold cursor-pointer"
            >
              More Details
            </span>
          </p>
        </div>
        <Link href={data?.link}>
          <CommonButton className="w-full md:py-4">Join Now</CommonButton>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserRoleCard;

// user redirect for more details

export const handleRedirectUser = (role: string, router: any) => {
  switch (role) {
    case "individual_user":
      router.push("/user-details#individual_user");
      break;
    case "charitable_organization":
      router.push("/user-details#charitable_organization");
      break;
    case "charity_shop":
      router.push("/user-details#charity_store");
      break;
    case "eco_friendly_store":
      router.push("/user-details#eco_friendly_store");
      break;
    case "professional_seller":
      router.push("/user-details#professional_seller");
      break;
    case "assisted_seller":
      router.push("/user-details#assisted_seller");
      break;
    case "ambassador":
      router.push("/user-details#ambassador");
    case "celebrity":
      router.push("/user-details#celebrity");
    default:
      break;
  }
};
