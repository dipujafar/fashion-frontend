import Image from "next/image";
import CustomAvatar from "@/components/shared/CustomAvatar";

export default function UserProfileInfo(
  {
    coverImage = "/user_profile_cover_image.png",
    profileImage= "/dummyImages/profile-image.jpg",
    name= "@Sarah_Style",
    bio = "Fashion lover 👗 | Curating the best of chic and street style ✨ | 10% of my sales go to supporting youth education 📚 | Join me on this stylish journey!"
    
  }: {
    coverImage?: string;
    profileImage?: string;
    name?: string;
    bio?: string;
  }
) {
  return (
    <div className="w-full ">
      <div className="relative">
        {/* Cover Photo */}
        <div className="w-full h-[130px] md:h-[200px] lg:h-[250px] relative overflow-hidden ">
          <Image
            src={coverImage}
            alt="Cover photo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 -bottom-14">
          <CustomAvatar
            img={profileImage}
            name="Sarah_Style"
            className="md:size-36 size-24"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 text-center px-4 max-w-5xl mx-auto">
        <h2 className="md:text-xl font-bold">{name}</h2>
        <p className="mt-2 md:text-xl text-black/60 ">
          {bio}
        </p>
      </div>
    </div>
  );
}
