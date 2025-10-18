"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

type TCharitySupport = {
  _id: number;
  image: string;
  title: string;
  present: number;
};

const defaultCharitySupportData = [
  {
    _id: 1,
    image: "/charityImage1.png",
    title: "SAVE THE CHILDREN",
    present: 5,
  },
  {
    _id: 2,
    image: "/charityImage2.png",
    title: "Plant More Trees",
    present: 10,
  },
  {
    _id: 3,
    image: "/charityImage3.png",
    title: "Women for Women International",
    present: 15,
  },
];

const CharitySupportCards = ({
  charitySupportsData,
  className
}: {
  charitySupportsData?: TCharitySupport[];
  className?: string
}) => {
  const data = charitySupportsData || defaultCharitySupportData;
  const router = useRouter();
  return (
    <>
      {/* ========================================= preview images and data ==================================== */}
      <div className={cn("grid lg:grid-cols-3 md:grid-cols-2 gap-5", className)}>
        {data?.map((charitySupport) => (
          <div onClick={()=> router.push(`/charity/profile-preview`)} key={charitySupport?._id} className="relative group cursor-pointer">
            <Image
              src={charitySupport?.image}
              alt="charity_support_data"
              width={1200}
              height={1200}
              className="object-cover origin-center max-h-[350px]"
            ></Image>
            
            <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out h-[50px] group-hover:h-full group-hover:rounded-2xl md:group-hover:text-[25px] group-hover:text-xl origin-bottom overflow-hidden">
              <p>{charitySupport?.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharitySupportCards;
