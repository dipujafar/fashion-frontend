import PProductCard from "@/components/shared/Cards/PProductCard";
import Empty from "@/components/ui/empty";
import { IProduct } from "@/types";

const AllProducts = ({ data }: { data: IProduct[] }) => {
  if (data?.length === 0) return <Empty message="No Product Found" />
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {data?.map((product) => (
        <PProductCard data={product} key={product.id}></PProductCard>
      ))}
    </div>
  );
};

export default AllProducts;
