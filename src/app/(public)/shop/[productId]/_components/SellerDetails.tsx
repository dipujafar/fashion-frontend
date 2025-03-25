import CommonButton from "@/components/ui/common-button";
import { userTagColor } from "@/utils/userTagColor";
import { Check } from "lucide-react";
import Image from "next/image";

const SellerDetails = () => {
  return (
    <div className=" max-w-lg">
      <div className=" flex justify-between gap-x-2 items-center md:mb-6 mb-4 ">
        <h4 className="uppercase underline text-primary-gray">
          seller information
        </h4>
        <div className="flex gap-x-2 group cursor-pointer ">
          <p className="font-medium">VIEW DETAILS</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="group-hover:translate-x-2 duration-500"
          >
            <path
              d="M14.4311 18.8191C14.2411 18.8191 14.0511 18.7491 13.9011 18.5991C13.6111 18.3091 13.6111 17.8291 13.9011 17.5391L19.4411 11.9991L13.9011 6.45914C13.6111 6.16914 13.6111 5.68914 13.9011 5.39914C14.1911 5.10914 14.6711 5.10914 14.9611 5.39914L21.0311 11.4691C21.3211 11.7591 21.3211 12.2391 21.0311 12.5291L14.9611 18.5991C14.8111 18.7491 14.6211 18.8191 14.4311 18.8191Z"
              fill="black"
              fillOpacity="0.66"
            />
            <path
              d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
              fill="black"
              fillOpacity="0.66"
            />
          </svg>
        </div>
      </div>

      <div
        style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.15)" }}
        className="bg-primary-light-pink/50 lg:p-4 p-3 rounded-lg "
      >
        <div className="space-y-2">
          <div className="flex-between gap-x-2 ">
            <div className="relative size-12 rounded-full     ">
              <Image
                src={"/userProfile1.png"}
                alt="user_image"
                width={1200}
                height={1200}
                className="size-12 rounded-full  "
              ></Image>
              <div
                className="rounded-full size-4 flex justify-center items-center absolute -top-1 right-1"
                style={{ backgroundColor: userTagColor("Professional Seller") }}
              >
                <Check size={16} color="#fff"></Check>
              </div>
            </div>

            <div
              style={{ backgroundColor: userTagColor("Professional Seller") }}
              className="px-3 rounded"
            >
              <h6 className="text-primary-white">Professional Seller</h6>
            </div>
          </div>

          <div className="flex-between gap-x-2">
            <h5 className="font-medium">Anita_Rahman</h5>
            <div className="flex gap-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_20155_29138)">
                  <path
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                    fill="#E12728"
                  />
                  <path
                    d="M9.97553 3.39258C7.12407 3.39258 4.8125 5.70412 4.8125 8.55549C4.8125 12.3817 8.75916 14.8045 9.97553 16.8852C11.1917 14.8045 15.1384 12.3817 15.1384 8.55549C15.1384 5.70412 12.8269 3.39258 9.97553 3.39258ZM9.97553 10.9755C8.63884 10.9755 7.55533 9.89203 7.55533 8.55549C7.55533 7.21889 8.63884 6.13529 9.97553 6.13529C11.3121 6.13529 12.3956 7.21889 12.3956 8.55549C12.3956 9.89206 11.3121 10.9755 9.97553 10.9755Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_20155_29138">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <h6>Dublin, Ireland</h6>
            </div>
          </div>
          <hr />
        </div>

        <div className="lg:mt-4 mt-3 flex gap-x-2">
          <CommonButton className="flex-1">message seller</CommonButton>
          <CommonButton className="flex-1 bg-primary-light-pink text-black hover:bg-primary-black/10">
            follow seller
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
