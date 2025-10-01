import ProductCard from "@/components/shared/Cards/ProductCard";
import { productsData } from "@/data/dummyData.tsx";

const AllUploadedProduct = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4   2xl:grid-cols-5  gap-4 xl:gap-6 ">
      {productsData?.map((user) => (
        <ProductCard data={user} key={user._id} ownProduct={true}></ProductCard>
      ))}
    </div>
  );
};

export default AllUploadedProduct;
