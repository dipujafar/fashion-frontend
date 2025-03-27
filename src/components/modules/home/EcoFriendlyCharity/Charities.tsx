import charityImage1 from "@/assets/images/home/EcoFriendlyCharity/charityImage1.png";
import charityImage2 from "@/assets/images/home/EcoFriendlyCharity/charityImage2.png";
import charityImage3 from "@/assets/images/home/EcoFriendlyCharity/charityImage3.png";
import charityImage4 from "@/assets/images/home/EcoFriendlyCharity/charityImage4.png";
import Image from "next/image";

const Charities = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid h-full w-full gap-4  grid-cols-4 grid-rows-4 ">
        <div className="col-span-2 row-span-2 relative group">
          <Image
            src={charityImage1}
            alt="charity_image"
            className="h-full w-full object-cover origin-center rounded-lg"
          ></Image>
          <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out lg:h-[65px] h-[50px] group-hover:h-full group-hover:rounded-2xl  origin-bottom overflow-hidden">
            <p className="uppercase text-xs lg:text-base md:group-hover:text-3xl group-hover:text-xl duration-1000">
              SAVE THE CHILDREN
            </p>
          </div>
        </div>

        <div className="col-span-2 row-span-2 relative group ">
          <Image
            src={charityImage2}
            alt="charity_image"
            className="h-full w-full object-cover origin-center rounded-lg"
          ></Image>
          <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out lg:h-[65px] h-[50px] group-hover:h-full group-hover:rounded-2xl  origin-bottom overflow-hidden">
            <p className="uppercase text-xs lg:text-base md:group-hover:text-3xl group-hover:text-xl duration-1000">
              Plant More Trees
            </p>
          </div>
        </div>

        <div className="col-span-2 row-span-2 relative group ">
          <Image
            src={charityImage3}
            alt="charity_image"
            className="h-full w-full object-cover origin-center rounded-lg"
          ></Image>
          <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out lg:h-[65px] h-[50px] group-hover:h-full group-hover:rounded-2xl  origin-bottom overflow-hidden">
            <p className="uppercase text-xs lg:text-base md:group-hover:text-3xl group-hover:text-xl duration-1000">
              Women for Women International
            </p>
          </div>
        </div>

        <div className="col-span-2 row-span-2 relative group">
          <Image
            src={charityImage4}
            alt="charity_image"
            className="h-full w-full object-cover origin-center rounded-lg"
          ></Image>
          <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out lg:h-[65px] h-[50px] group-hover:h-full group-hover:rounded-2xl  origin-bottom overflow-hidden">
            <p className="uppercase text-xs lg:text-base md:group-hover:text-3xl group-hover:text-xl duration-1000">
              The Red Cross
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charities;
