import missionImage from "@/assets/images/about-us/missionImage.jpeg";
import Image from "next/image";
import MissionData from "./MissionData";

const Mission = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-x-4 gap-y-5">
      <h1  id="mission" className="page-title lg:hidden">Our Mission</h1>
      <div className="flex-1">
        <Image
          src={missionImage}
          alt="missionImage"
          width={1200}
          height={1200}
          className="w-full rounded-lg"
          quality={100}
        ></Image>
      </div>
      <div className="xl:space-y-8 space-y-4 flex-1">
        <h1 id="mission" className="page-title hidden lg:block">Our Mission</h1>
        <h4 className=" xl:text-4xl text-2xl font-bold ">
          Empowering Change Through Fashion, Sustainability, and Giving Back
        </h4>
        <MissionData></MissionData>
      </div>
    </div>
  );
};

export default Mission;
