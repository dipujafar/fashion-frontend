import React from "react";
import ProductsListContainer from "../ProductsList/ProductsListContainer";
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
    <div >
      <ProductsListContainer initialData={prodData?.data?.data} initialMeta={prodData?.data?.meta} query={query} userName={userName} />
    </div>
  );
};

export default ProfileFeatures;
