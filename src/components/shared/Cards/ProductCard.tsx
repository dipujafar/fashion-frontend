import { Card, CardContent } from "@/components/ui/card";
import CommonButton from "@/components/ui/common-button";
import { Rating } from "@/components/ui/rating";
import { TProduct } from "@/types";
import { userTagColor } from "@/utils/userTagColor";
import { Check, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const ProductCard = ({
  data,
  ownProduct,
  children,
}: {
  data: TProduct;
  ownProduct?: boolean;
  children?: ReactNode;
}) => {
  return (
    <Card className="border-none shadow-none p-0">
      <CardContent className="md:space-y-4 space-y-2 p-0">
        {/* ===================================== product image =============================== */}
        <div className="relative">
          <div className="relative group">
            <Image
              src={data?.image}
              alt="product_image"
              width={1200}
              height={1200}
              className="lg:max-h-80 md:max-h-64 max-h-52 object-cover origin-center rounded cursor-pointer"
            ></Image>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 flex justify-center items-center  transform scale-y-0 group-hover:scale-y-100 transition-all duration-700 origin-top">
              <div className="space-y-2">
                <Link href={`/shop/${data?._id}`} className="block">
                  <CommonButton className="hover:bg-black/80">
                    VIEW DETAILS
                  </CommonButton>
                </Link>
                <Link href={"#"} className="block">
                  <CommonButton className="bg-primary-white text-primary-black hover:bg-white/85">
                    ADD TO CART
                  </CommonButton>
                </Link>
              </div>
            </div>
          </div>

          {/* ===================== product offers ================ */}
          {data?.offers && (
            <div className="bg-primary-light-pink absolute top-2 left-2 p-0.5 md:p-1 rounded">
              <h3 className="uppercase text-xs md:text-[12px] font-bold text-[#E1272880]">
                {data?.offers}
              </h3>
            </div>
          )}

          {/* ===================== product tag ================ */}
          {!ownProduct && data?.tag && (
            <div className="bg-[#87CEEB] absolute bottom-2 left-2 p-0.5 md:p-1 rounded">
              <h3 className="uppercase text-xs md:text-[12px] font-bold text-primary-white">
                {data?.tag}
              </h3>
            </div>
          )}

          {/* ===================== favorite button ================ */}
          <div className="bg-primary-white absolute bottom-2 right-2 h-5 md:h-7 w-[50px] md:w-16 flex justify-center items-center gap-x-1 rounded-full cursor-pointer group duration-500 md:text-base text-sm ">
            <Heart
              
              className="group-hover:fill-primary-red text-primary-red duration-500 md:size-[18px] size-4"
            ></Heart>
            <p>12</p>
          </div>
        </div>

        {/* ===================================== product details =============================== */}
        <div className="md:space-y-[2px] space-y-[1px]">
          {/* ===== user image and user type ======== */}
          {!ownProduct && (
            <div className="flex items-center gap-x-1 gap-y-1 justify-between">
              <Link href={`/celebrity/profile-preview`}>
            <div className="relative">
                <Image
                  src={data?.userImage}
                  alt="user_image"
                  width={1200}
                  height={1200}
                  className="md:size-8 size-6 rounded-full"
                ></Image>
                <div
                  className="rounded-full size-3 flex justify-center items-center absolute top-0 -right-1"
                  style={{ backgroundColor: userTagColor(data?.userType) }}
                >
                  <Check size={14} color="#fff"></Check>
                </div>
              </div>
              </Link>
              <div
                className="px-2 rounded text-primary-white md:text-sm text-[11px] md:font-bold uppercase"
                style={{ backgroundColor: userTagColor(data?.userType) }}
              >
                {data?.userType}
              </div>
            </div>
          )}

          {/* ===================== product title ================ */}
          <p className="text-primary-gray md:text-base text-sm">
            {data?.title}
          </p>
          <h6 className="md:text-lg text-primary-black">{data?.size}</h6>
          <h5 className="font-bold text-primary-black">${data?.price}</h5>

          {/* ===================== product rating ================ */}
         {!ownProduct && <div className="flex items-center gap-x-1">
            <Rating rating={data?.rating} size={18}></Rating>
            <p className="text-primary-gray md:text-base text-sm">
              ({data?.rating})
            </p>
          </div>}

          {/* ===================== location ================ */}
         {!ownProduct && <div className="flex items-center gap-x-1 text-primary-gray md:text-base text-sm">
            <MapPin size={18} />
            <p>{data?.location}</p>
          </div>}
        </div>

        {/* ====================== if there provide any children then render it here ================  */}
        {children}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
