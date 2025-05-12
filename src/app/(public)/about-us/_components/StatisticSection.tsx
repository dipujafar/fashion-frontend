"use client";
import CountUp from "react-countup";

const StatisticSection = () => {
  return (
    <div>
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
            <p className="xl:text-lg text-sm">Years of Experience</p>
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
            <p className="xl:text-lg text-sm">Sellers on Our Platform</p>
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
            <p className="xl:text-lg">Products Available</p>
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
            <p className="xl:text-lg text-sm">Charitable Causes Supported</p>
          </div>

          <div className="col-span-1 row-span-4  flex flex-col  mx-auto   md:px-4 px-2  w-full border-r md ">
            <div className="text-2xl   ">
              <CountUp
                end={18}
                enableScrollSpy={true}
                duration={6}
                scrollSpyOnce={true}
              />
              +
            </div>
            <p className="xl:text-lg text-sm">Customer Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticSection;
