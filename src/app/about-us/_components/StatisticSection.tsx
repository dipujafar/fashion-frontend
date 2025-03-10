"use client";
import frameImage1 from "@/assets/images/about-us/Frame1.png";
import frameImage2 from "@/assets/images/about-us/Frame2.png";
import frameImage3 from "@/assets/images/about-us/Frame3.png";
import Image from "next/image";
import CountUp from "react-countup";

const StatisticSection = () => {
  return (
    <div className="md:space-y-4 space-y-2 ">
      {/* ================= image preview ====================== */}
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid h-full w-full gap-4   grid-cols-4 grid-rows-4 rounded-lg ">
          <div className="col-span-2 row-span-4  rounded-lg  flex items-center justify-center">
            <Image
              src={frameImage1}
              alt="frame1"
              width={1200}
              height={1200}
              className="w-full"
            ></Image>
          </div>

          <div className="col-span-2 row-span-2  rounded-lg  flex items-center justify-center">
            <Image
              src={frameImage2}
              alt="frame2"
              width={1200}
              height={1200}
              className="w-full"
            ></Image>
          </div>

          <div className="col-span-2 row-span-2 rounded-lg  flex items-center justify-center">
            <Image
              src={frameImage3}
              alt="frame3"
              width={1200}
              height={1200}
              className="w-full"
            ></Image>
          </div>
        </div>
      </div>

      {/* ==================== static section ================ */}
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid h-full w-full gap-4 bg-primary-black lg:grid-cols-5 grid-cols-2 grid-rows-1 rounded-lg  text-primary-white md:py-4 py-2 mixin/common:col-span-1 mixin/common:row-span-4 mixin/common:flex mixin/common:flex-col mixin/common:mx-auto mixin/common:border-r mixin/common:border-r-primary-white mixin/common:md:px-4 mixin/common:px-2 mixin/common:w-full">
          <div className="mixin/common">
            <div className="text-2xl ">
              <CountUp
                end={12}
                enableScrollSpy={true}
                duration={6}
                scrollSpyOnce={true}
              />
              +
            </div>
            <p className="md:text-lg">Years of Experience</p>
          </div>

          <div className="mixin/common">
            <div className="text-2xl ">
              <CountUp
                end={20}
                enableScrollSpy={true}
                duration={6}
                scrollSpyOnce={true}
              />
              +
            </div>
            <p className="md:text-lg">Sellers on Our Platform</p>
          </div>

          <div className="mixin/common">
            <div className="text-2xl ">
              <CountUp
                end={50}
                enableScrollSpy={true}
                duration={6}
                scrollSpyOnce={true}
              />
              +
            </div>
            <p className="md:text-lg">Products Available</p>
          </div>

          <div className="mixin/common">
            <div className="text-2xl  ">
              <CountUp
                end={19}
                enableScrollSpy={true}
                duration={6}
                scrollSpyOnce={true}
              />
              +
            </div>
            <p className="md:text-lg">Charitable Causes Supported</p>
          </div>

          <div className="col-span-1 row-span-4 md flex flex-col  mx-auto   md:px-4 px-2  w-full ">
            <div className="text-2xl   ">
              <CountUp
                end={18}
                enableScrollSpy={true}
                duration={6}
                scrollSpyOnce={true}
              />
              +
            </div>
            <p className="md:text-lg">Customer Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticSection;
