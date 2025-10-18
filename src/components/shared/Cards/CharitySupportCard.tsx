"use client";
import CharityInfo from "@/app/(public)/shop/[productId]/_components/dialog/CharityInfo";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
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

const CharitySupport = ({
  charitySupportsData,
}: {
  charitySupportsData?: TCharitySupport[];
}) => {

    const data = charitySupportsData || defaultCharitySupportData;
    const router = useRouter();
  return (
    <>
      <div>
        {/* ======================================= section header ========================================== */}
        <div className="flex-between lg:mb-2 mb-1 ">
          <div className="flex items-center gap-x-1.5">
            <h4 className="lg:text-2xl text-lg font-medium">Charity Support</h4>
            <CharityInfo />
          </div>
          <div className="flex gap-x-3 items-center group cursor-pointer">
            <h4 className=" font-bolda">ADD DONATE</h4>
            <AnimatedArrow size={20} />
          </div>
        </div>

        <hr className="border lg:mb-6 mb-4" />

        {/* ========================================= preview images and data ==================================== */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
          {data?.map((charitySupport) => (
            <div onClick={() => router.push(`/charity/profile-preview`)} key={charitySupport?._id} className="relative group">
              <Image
                src={charitySupport?.image}
                alt="charity_support_data"
                width={1200}
                height={1200}
                className="object-cover origin-center"
              ></Image>
              <div className="absolute top-0 right-0 bg-green-600 text-primary-white w-20 h-8 flex-center rounded">
                <p>{charitySupport?.present}%</p>
              </div>
              <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out h-[50px] group-hover:h-full group-hover:rounded-2xl md:group-hover:text-[25px] group-hover:text-xl origin-bottom overflow-hidden">
                <p>{charitySupport?.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CharitySupport;
