import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import CommonButton from "@/components/ui/common-button";
import { Rating } from "@/components/ui/rating";
import { LocationIcon } from "@/icons";
import { userTagColor } from "@/utils/userTagColor";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SellerDetails = () => {
  return (
    <div className=" max-w-lg">
      <div className=" flex justify-between gap-x-2 items-center md:mb-6 mb-4 ">
        <h4 className="uppercase underline text-primary-gray">
          seller information
        </h4>
        <Link
          href="/users/seller-profile"
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
              href="/users/seller-profile"
              className="flex items-center gap-x-2 group cursor-pointer"
            >
              <div className="relative size-12 rounded-full">
                <Image
                  src={"/userProfile1.png"}
                  alt="user_image"
                  width={1200}
                  height={1200}
                  className="size-12 rounded-full  "
                ></Image>
                <div
                  className="rounded-full size-4 flex justify-center items-center absolute -top-1 right-1"
                  style={{
                    backgroundColor: userTagColor("Professional Seller"),
                  }}
                >
                  <Check size={16} color="#fff"></Check>
                </div>
              </div>
            </Link>

            <div
              style={{ backgroundColor: userTagColor("Professional Seller") }}
              className="px-3 rounded"
            >
              <h6 className="text-primary-white">Professional Seller</h6>
            </div>
          </div>

          <div className="flex-between gap-x-2">
            <div>
              <Link
                href="/users/seller-profile"
                className="flex items-center gap-x-2 group cursor-pointer"
              >
                <h5 className="font-medium">Anita_Rahman</h5>
              </Link>
              <div className="flex items-center gap-x-1">
                <Rating rating={5} size={16}></Rating>
                <p className="text-primary-gray md:text-base text-sm">
                  (5)
                </p>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <LocationIcon />

              <h6>Dublin, Ireland</h6>
            </div>
          </div>
          <hr />
        </div>

        <div className="lg:mt-4 mt-3 flex gap-x-2">
          <CommonButton className="flex-1">message seller</CommonButton>
          <CommonButton className="flex-1 bg-primary-white text-black hover:bg-primary-black/10 border-r-2 border-b-2 border-black">
            follow seller
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
