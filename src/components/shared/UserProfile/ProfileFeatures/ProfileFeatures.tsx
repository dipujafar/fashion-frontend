import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CharitySupport from "../../../../app/(users)/users/profile/_components/CharitySupport";
import ProductsListContainer from "../ProductsList/ProductsListContainer";
import CustomerFeedbacks from "../CustomerFeedbacks";

const ProfileFeatures = ({userRole}: {userRole: string}) => {
  return (
    <div>
      <Tabs defaultValue={userRole === "user" ? "charity_support" : "product_listing"} className="w-full">
        <TabsList
          style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
          className="w-full bg-white lg:mb-4 mb-2"
        >
          {userRole === "user" && <TabsTrigger
            value="charity_support"
            className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black"
          >
            Charity Support
          </TabsTrigger>}
          <TabsTrigger
            value="product_listing"
            className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black"
          >
            Product Listing
          </TabsTrigger>
          <TabsTrigger
            value="rating_review"
            className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black"
          >
            Rating & Review
          </TabsTrigger>
        </TabsList>
     { userRole === "user" &&   <TabsContent value="charity_support">
          <CharitySupport />
        </TabsContent>}
        <TabsContent value="product_listing">
          <ProductsListContainer />
        </TabsContent>
        <TabsContent value="rating_review">
          <CustomerFeedbacks />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileFeatures;
