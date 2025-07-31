import Container from "@/components/shared/Container";
import SaleStatsCard from "@/components/shared/UserProfile/Sale-Product/SaleStatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EaringIcon } from "@/icons";

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
  return (
    <Container>
      <SaleStatsCard data={statData} />

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

          <TabsContent value="product_listing">
            {/* <ProductsListContainer /> */}
          </TabsContent>
          <TabsContent value="rating_review">
            {/* <CustomerFeedbacks /> */}
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
