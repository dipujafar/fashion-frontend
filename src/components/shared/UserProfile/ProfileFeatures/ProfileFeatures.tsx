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

  const { category, sortBy: sort, brand, priceMin, priceMax, size, color, condition } = ssp;

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

  const query: any = { sortBy, sortOrder: orderBy, limit: 24 }

  if (category) {
    query.category = category
  }

  if (brand) {
    query.brands = brand
  }
  if (priceMin) {
    query.minPrice = priceMin
  }
  if (priceMax) {
    query.maxPrice = priceMax
  }
  if (size) {
    query.sizes = size
  }
  if (color) {
    query.colors = color
  }
  if (condition) {
    query.conditions = condition
  }

  const prodData = await GetProductsByMember({ query, userName });

  return (
    <div >
      <ProductsListContainer initialData={prodData?.data?.data} initialMeta={prodData?.data?.meta} query={query} userName={userName} key={JSON.stringify(query)}/>
    </div>
  );
};

export default ProfileFeatures;
