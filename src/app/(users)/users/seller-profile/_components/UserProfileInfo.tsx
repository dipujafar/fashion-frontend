import Image from "next/image";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { userTagColor } from "@/utils/userTagColor";
import { Check } from "lucide-react";

export default function UserProfileInfo() {
  return (
    <div className="w-full ">
      <div className="relative">
        {/* Cover Photo */}
        <div className="w-full h-[130px] md:h-[200px] lg:h-[250px] relative overflow-hidden ">
          <Image
            src="/user_profile_cover_image.png"
            alt="Cover photo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 -bottom-14">
          <CustomAvatar
            img="/seller_profile.png"
            name="Sarah_Style"
            className="md:size-36 size-24"
          />
          <div
            className="rounded-full size-5 flex justify-center items-center absolute md:top-3 top-1 right-0 md:right-2"
            style={{ backgroundColor: userTagColor("INFLUENCER") }}
          >
            <Check size={16} color="#fff"></Check>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 text-center px-4 max-w-3xl mx-auto">
        <h2 className="md:text-xl font-bold">@Sarah_Style</h2>
        <p className="mt-2 md:text-xl text-black/60 ">
          Fashion lover 👗 | Curating the best of chic and street style ✨ | 10%
          of my sales go to supporting youth education 📚 | Join me on this
          stylish journey!
        </p>
      </div>
    </div>
  );
}
