import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
// import ProfileContainerForm from "./ProfileContainerForm";
import CustomerFeedbacks from "@/components/shared/UserProfile/ProfileDashboard/CustomerFeedbacks";
import CharitySupportTable from "@/components/shared/UserProfile/Tables/CharitySupportTable";
import ProfileContainerForm from "./ProfileContainerForm";


const AmbassadorProfileFeatures = () => {
  return (
    <div>
      <Tabs defaultValue="profile_details" className="w-full">
        <TabsList
          style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
          className="w-full bg-white lg:mb-4 mb-2"
        >
          <TabsTrigger
            value="profile_details"
            className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none  text-[#8A8A8A] data-[state=active]:text-black"
          >
            Profile Details
          </TabsTrigger>
          <TabsTrigger
            value="charity_support"
            className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black"
          >
            Charity Support
          </TabsTrigger>
          <TabsTrigger
            value="reviews_ratings"
            className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black"
          >
            Reviews & Ratings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile_details">
          <ProfileContainerForm />
        </TabsContent>
        <TabsContent value="charity_support">
          <CharitySupportTable />
        </TabsContent>
        <TabsContent value="reviews_ratings">
          <CustomerFeedbacks />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AmbassadorProfileFeatures;
