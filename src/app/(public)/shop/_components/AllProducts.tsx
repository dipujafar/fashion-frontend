import ProductCard from "@/components/shared/Cards/ProductCard";
import { productsData } from "@/data/dummyData.tsx";

const AllProducts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3   2xl:grid-cols-4  gap-4 xl:gap-6 ">
      {productsData?.map((user) => (
        <ProductCard data={user} key={user._id}></ProductCard>
      ))}
    </div>
  );
};

export default AllProducts;
