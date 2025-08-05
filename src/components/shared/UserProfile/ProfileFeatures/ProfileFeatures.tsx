import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CharitySupport from "../../../../app/(users)/users/profile/_components/CharitySupport";
import ProductsListContainer from "../ProductsList/ProductsListContainer";
import CustomerFeedbacks from "../CustomerFeedbacks";
import { Switch } from "@/components/ui/switch";

const ProfileFeatures = ({ userRole }: { userRole: string }) => {
  return (
    <div>
      <Tabs
        defaultValue={
          userRole === "user" || userRole === "eco-friendly-store"
            ? "charity_support"
            : "product_listing"
        }
        className="w-full"
      >
        <TabsList
          style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
          className="w-full bg-white lg:mb-4 mb-2"
        >
          {userRole === "user" ||
            (userRole === "eco-friendly-store" && (
              <TabsTrigger
                value="charity_support"
                className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black"
              >
                Charity Support
              </TabsTrigger>
            ))}
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
        {userRole === "user" ||
          (userRole === "eco-friendly-store" && (
            <TabsContent value="charity_support">
              {/* ---------------------------------- option to show charity support or not ---------------------------------- */}
              {userRole === "eco-friendly-store" && (
                <div className="flex justify-between items-center  shadow-md py-4 px-5 rounded-xl mb-5">
                  <span className="text-lg">Show Charitable donation on your profile</span>
                  <Switch
                    className="data-[state=checked]:bg-[#3DB39E] cursor-pointer"
                  />
                </div>
              )}
              <CharitySupport />
            </TabsContent>
          ))}
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
