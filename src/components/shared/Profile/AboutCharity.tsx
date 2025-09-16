import { Dot } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function AboutCharity() {
  return (
    <div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid h-full w-full gap-x-4  grid-cols-2 grid-rows-2">
          <div className="col-span-1 row-span-3  rounded-lg flex items-center justify-center max-h-[600px]">
            <Image
              src="/dummyImages/charity-about-image1.png"
              alt="Placeholder"
              width={1200}
              height={1200}
              className="w-full xl:h-[595px] object-cover"
            />
          </div>

          <div className="col-span-1 row-span-1  rounded-lg flex items-center justify-center max-h-[290px]">
            <Image
              src="/dummyImages/charity-about-image2.png"
              alt="Placeholder"
              width={1200}
              height={1200}
              className="w-full xl:h-[290px] object-cover"
            />
          </div>

          <div className="col-span-1 row-span-1  rounded-lg flex items-center justify-center max-h-[290px]  mt-2">
            <Image
              src="/dummyImages/charity-about-image3.png"
              alt="Placeholder"
              width={1200}
              height={1200}
              className="w-full  xl:h-[290px] object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 text-lg text-black/60 space-y-5">
        <h4>
          The Climate Change Fund is dedicated to addressing one of the most
          urgent global challenges — climate change — through high-impact,
          systemic solutions. In partnership with Giving Green, the fund
          strategically supports nonprofit organizations (NPOs) that leverage
          evidence-based interventions to reduce greenhouse gas emissions,
          accelerate clean energy transitions, and foster climate-resilient
          communities. By prioritizing scalable, cost-effective solutions, the
          Climate Change Fund seeks to drive meaningful progress toward a
          sustainable and equitable future.
        </h4>
        <p>A Holistic Approach to Climate Action:</p>
        <div className="space-y-1">
          <p>
            Scientific research underscores that effective climate change
            mitigation requires coordinated action across multiple sectors. The
            Climate Change Fund invests in organizations that advance solutions
            in five critical areas:
          </p>
          <ul>
            <li className="flex">
              <Dot />
              Policy Advocacy: Driving systemic change through legislative and
              regulatory reforms to support decarbonization.
            </li>
            <li className="flex">
              <Dot />
              Technology Innovation: Accelerating the deployment of
              next-generation clean energy solutions, such as advanced
              geothermal and nuclear power.
            </li>
            <li className="flex">
              <Dot />
              Market Shaping: Stimulating demand for climate-friendly
              alternatives, including plant-based and cultivated proteins, to
              reduce emissions from agriculture.
            </li>
            <li className="flex">
              <Dot />
              Grassroots Mobilization: Empowering communities to push for
              climate action and ensuring equity in the clean energy transition.
            </li>
          </ul>
          <p>
            By integrating these strategies, the Climate Change Fund ensures
            that climate action is effective, scalable, and aligned with
            scientific best practices.
          </p>
        </div>

        <p>
          Commitment and Reporting: The organizations selected for the fund
          undergo a rigorous evaluation process, leveraging Giving Green’s
          research methodology and Charity Navigators evaluation to ensure their
          effectiveness. When you invest in this fund, beginning in early 2025,
          you will receive quarterly reports detailing the initiatives and
          progress of these efforts toward making a difference in this cause.
        </p>

        <p>
          Invest in Climate Solutions: Be part of the solution — invest in the
          Climate Change Fund today. Whether through a one-time donation or a
          recurring contribution, your support directly fuels high-impact,
          science-backed interventions that help combat climate change and
          safeguard our planet for future generations.
        </p>
      </div>
    </div>
  );
}
