import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CharitySupport from "./CharitySupport";
import ProductsListContainer from "./ProductsList/ProductsListContainer";
import CustomerFeedbacks from "./CustomerFeedbacks";

const ProfileFeatures = () => {
  return (
    <div>
      <Tabs defaultValue="charity_support" className="w-full">
        <TabsList
          style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
          className="w-full bg-white lg:mb-4 mb-2"
        >
          <TabsTrigger
            value="charity_support"
            className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none"
          >
            Charity Support
          </TabsTrigger>
          <TabsTrigger
            value="product_listing"
            className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none"
          >
            Product Listing
          </TabsTrigger>
          <TabsTrigger
            value="rating_review"
            className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none"
          >
            Rating & Review
          </TabsTrigger>
        </TabsList>
        <TabsContent value="charity_support">
          <CharitySupport />
        </TabsContent>
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
