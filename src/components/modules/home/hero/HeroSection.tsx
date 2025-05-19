import { TextAnimation } from "@/animations/TextAnimation";
import image1 from "@/assets/images/home/hero/hero_image1.png";
import image2 from "@/assets/images/home/hero/hero_image2.png";
import image3 from "@/assets/images/home/hero/hero_image3.png";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-3 relative">
        <Image src={image1} alt="hero image" className="w-full "></Image>
        <div
          className=" max-w-3xl absolute top-1/2 xl:-left-60 lg:-left-52 md:-left-40 sm:-left-36 -left-16 -translate-y-1/2  lg:px-28 lg:py-12 px-10 py-5 text-primary-white lg:text-5xl md:text-6xl text-xl font-semibold text-center w-full md:backdrop-blur-[7px] backdrop-blur-[4px] rotate-[270deg] rounded-lg flex justify-center items-center"
          style={{
            background: "rgba(217, 217, 217, 0.09)",
          }}
        >
          <TextAnimation
            reverse={true}
            text="Redefining Style"
            initialDelay={0.5}
            className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl  font-bold"
          />
        </div>
      </div>
      <Image src={image2} alt="hero image" className="w-full"></Image>
      <Image src={image3} alt="hero image" className="w-full"></Image>
    </div>
  );
};

export default HeroSection;
