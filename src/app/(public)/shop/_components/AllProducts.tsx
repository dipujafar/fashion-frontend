import PProductCard from "@/components/shared/Cards/PProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductsCardSkeleton";
import Empty from "@/components/ui/empty";
import { IProduct } from "@/types";

const AllProducts = ({ data, loading }: { data: IProduct[], loading: boolean }) => {
  if (loading) return <ProductGridSkeleton />
  if (data?.length === 0) return <Empty message="No Product Found" />
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4   2xl:grid-cols-5  gap-4 xl:gap-6 ">
      {data?.map((product) => (
        <PProductCard data={product} key={product.id}></PProductCard>
      ))}
    </div>
  );
};

export default AllProducts;
