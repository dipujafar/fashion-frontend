import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense } from "react";
import ProductsListContainer from "../ProductsList/ProductsListContainer";
import CustomerFeedbacks from "../CustomerFeedbacks";
import { Switch } from "@/components/ui/switch";
import CharitySupportCards from "../../Cards/CharitySupportCards";
import AboutCharity from "../../Profile/AboutCharity";
import ChoiceBundleModal from "../Modals/ChoiceBundleModal";
import { GetProductsByMember } from "@/lib/services/Products";
import { ProductGridSkeleton } from "@/components/skeletons/ProductsCardSkeleton";

const ProfileFeatures = async ({
  userRole,
  preview,
  userName,
  searchParams: ssp
}: {
  userRole: string;
  preview?: string;
  userName: string;
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => {

  const { category, page, sortBy: sort } = await ssp;

  let sortBy = "createdAt";
  let orderBy = "desc"

  if (sort == "newest") {
    orderBy = "desc"
  } else if (sort == "-price") {
    sortBy = "finalPrice";
    orderBy = "asc"
  }
  else if (sort == "price") {
    sortBy = "finalPrice";
    orderBy = "desc"
  }

  const query: any = { page, sortBy, sortOrder: orderBy }

  if (page) {
    query.page = page
  }
  if (category) {
    query.category = category
  }

  const prodPromise = GetProductsByMember({ query, userName });

  return (
    <div>
      <Tabs
        defaultValue={
          userRole === "user" ||
            userRole === "eco-friendly-store" ||
            userRole === "professional-seller" ||
            userRole === "celebrity"
            ? "product_listing"
            : "product_listing"
        }
        className=""
      >
        <TabsList
          // style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
          className=" bg-white mb-2 h-12 p-0 lg:mb-4 border-b border-gray-200 w-full flex flex-row justify-start rounded-none"
        >
          <TabsTrigger
            value="product_listing"
            className="flex-none data-[state=active]:shadow-none  data-[state=active]:border-b-2 data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black py-5 w-auto hover:bg-gray-50 duration-200 rounded-none text-xs md:text-sm lg:text-base lg:px-3.5"
          >
            Product Listing
          </TabsTrigger>

          {userRole === "charity store" && (
            <TabsTrigger
              value="about"
              className="data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black w-auto py-4"
            >
              About
            </TabsTrigger>
          )}
          {(userRole === "user" ||
            userRole === "eco-friendly-store" ||
            userRole === "professional-seller" ||
            userRole === "celebrity") && (
              <TabsTrigger
                value="charity_support"
                className="flex-none data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black py-5 w-auto hover:bg-gray-50 duration-200 rounded-none text-xs md:text-sm lg:text-base lg:px-3.5"
              >
                Charity Support
              </TabsTrigger>
            )}

          <TabsTrigger
            value="rating_review"
            className="flex-none data-[state=active]:shadow-none  data-[state=active]:border-b-2   data-[state=active]:border-black cursor-pointer  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:rounded-none text-[#8A8A8A] data-[state=active]:text-black py-5 w-auto hover:bg-gray-50 duration-200 rounded-none text-xs md:text-sm lg:text-base lg:px-3.5"
          >
            Rating & Review
          </TabsTrigger>
        </TabsList>

        {(userRole === "user" ||
          userRole === "eco-friendly-store" ||
          userRole === "professional-seller" ||
          userRole === "celebrity") && (
            <TabsContent value="charity_support">
              {/* ---------------------------------- option to show charity support or not ---------------------------------- */}
              {userRole === "eco-friendly-store" && !preview && (
                <div className="flex justify-between items-center  shadow-md py-4 px-5 rounded-xl mb-5">
                  <span className="text-lg">
                    Show Charitable donation on your profile
                  </span>
                  <Switch className="data-[state=checked]:bg-[#3DB39E] cursor-pointer" />
                </div>
              )}
              <CharitySupportCards />
            </TabsContent>
          )}
        <TabsContent value="product_listing">

          <Suspense fallback={<ProductGridSkeleton />}>
            <>
              <div className="flex justify-between items-center border border-gray-200 rounded-md lg:py-4 py-2 px-5">
                <div>
                  <p className="text-lg font-medium">Shop Bundles</p>
                  <p className="text-gray-600 text-sm">Get Discount</p>
                </div>
                <ChoiceBundleModal />
              </div>

              <ProductsListContainer prodPromise={prodPromise} selectedCat={category} />
            </>
          </Suspense>

        </TabsContent>

        <TabsContent value="rating_review">
          <CustomerFeedbacks />
        </TabsContent>
        <TabsContent value="about">
          <AboutCharity />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileFeatures;
