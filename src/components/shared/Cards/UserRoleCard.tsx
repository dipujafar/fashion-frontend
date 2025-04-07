import { Card, CardContent } from "@/components/ui/card";
import CommonButton from "@/components/ui/common-button";
import { TUserRoleData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserRoleCard = ({ data }: { data: TUserRoleData }) => {
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
          <p className="text-sm text-primary-gray">{data?.description}</p>
        </div>
        <Link href={data?.link}>
          <CommonButton className="w-full md:py-4">Join Now</CommonButton>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserRoleCard;
