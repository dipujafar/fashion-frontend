"use client";
import Container from "@/components/shared/Container";
import SaleStatsCard from "@/components/shared/UserProfile/Sale-Product/SaleStatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EaringIcon } from "@/icons";
import DirectDonationTable from "./DirectDonationTable";
import { useState } from "react";
import DateSelector from "@/components/ui/date-selector";
import SalesContributionsTable from "./SalesContributionsTable";

const statData = [
  {
    icon: <EaringIcon />,
    title: "Total Donations",
    value: "$20,000",
  },
  {
    icon: <EaringIcon />,
    title: "Direct Donations",
    value: "$5,000",
  },
  {
    icon: <EaringIcon />,
    title: "TSales Contributions",
    value: "$15,000",
  },
];

export default function DonationTrackingContainer() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Container className="space-y-8">
      <SaleStatsCard data={statData} />

      {/*  ----------------------- filter by date -------------------- */}
      <div>
        <DateSelector date={date} setDate={setDate} />
      </div>

      <div>
        <Tabs defaultValue={"direct_donation"} className="w-full">
          <TabsList
            style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
            className="w-full bg-white lg:mb-4 mb-2"
          >
            <TabsTrigger
              value="direct_donation"
              className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black"
            >
              Direct Donation
            </TabsTrigger>
            <TabsTrigger
              value="sales_contributions"
              className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black"
            >
              Sales Contributions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="direct_donation">
            <DirectDonationTable />
          </TabsContent>
          <TabsContent value="sales_contributions">
            <SalesContributionsTable />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
