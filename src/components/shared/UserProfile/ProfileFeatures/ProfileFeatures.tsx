import React from "react";
import ProductsListContainer from "../ProductsList/ProductsListContainer";
import ChoiceBundleModal from "../Modals/ChoiceBundleModal";
import { GetProductsByMember } from "@/lib/services/Products";

const ProfileFeatures = async ({
  userName,
  searchParams: ssp
}: {
  userName: string;
  searchParams: { [key: string]: string | undefined };
}) => {

  const { category, page, sortBy: sort } = ssp;

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

  const prodData = await GetProductsByMember({ query, userName });

  return (
    <>
      <div className="flex justify-between items-center border border-gray-200 rounded-md lg:py-4 py-2 px-5">
        <div>
          <p className="text-lg font-medium">Shop Bundles</p>
          <p className="text-gray-600 text-sm">Get Discount</p>
        </div>
        <ChoiceBundleModal />
      </div>

      <div className="mt-8">
        <ProductsListContainer initialData={prodData?.data?.data} initialMeta={prodData?.data?.meta} query={query} userName={userName} />
      </div>
    </>
  );
};

export default ProfileFeatures;
