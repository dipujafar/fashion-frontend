import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const ProfileFeatures = () => {
  return (
    <div>
      <Tabs defaultValue="charity_support" className="w-full">
        <TabsList style={{boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)"}} className="w-full bg-white">
          <TabsTrigger value="charity_support" className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none">Charity Support</TabsTrigger>
          <TabsTrigger value="product_listing" className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none">Product Listing</TabsTrigger>
          <TabsTrigger value="rating_review" className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none" >Rating & Review</TabsTrigger>
        </TabsList>
        <TabsContent value="charity_support">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="product_listing">Change your password here.</TabsContent>
        <TabsContent value="rating_review">Rating & Review</TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileFeatures;
