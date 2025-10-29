import Image from "next/image";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { userTagColor } from "@/utils/userTagColor";
import { Check } from "lucide-react";

export default function UserProfileInfo(
  {
    coverImage = "/user_profile_cover_image.png",
    name= "@Sarah_Style",
    bio = "Fashion lover 👗 | Curating the best of chic and street style ✨ | 10% of my sales go to supporting youth education 📚 | Join me on this stylish journey!",
    profileImage = "/seller_profile.png",
    user,
    
  }: {
    coverImage?: string;
    name?: string;
    bio?: string;
    profileImage?: string;
    user? : string
  }
) {
  return (
    <div className="w-full ">
      <div className="relative">
        {/* Cover Photo */}
        <div className="w-full h-[80px] md:h-[200px] lg:h-[250px] relative overflow-hidden ">
          <Image
            src={coverImage}
            alt="Cover photo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 -bottom-10">
          <CustomAvatar
            img={profileImage || "/seller_profile.png"}
            name="Sarah_Style"
            className="md:size-36 size-20"
          />
          <div
            className="rounded-full size-5 flex justify-center items-center absolute md:top-3 top-1 right-0 md:right-2"
            style={{ backgroundColor: userTagColor(user || "") }}
          >
            <Check size={16} color="#fff"></Check>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="md:mt-20 mt-10 text-center md:px-4 max-w-5xl mx-auto hidden lg:block">
        <h2 className="md:text-xl font-bold">{name}</h2>
        <p className="md:mt-2 md:text-xl text-black/60 text-sm  ">
          {bio}
        </p>
      </div>
    </div>
  );
}
