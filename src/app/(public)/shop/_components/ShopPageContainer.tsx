import { IMeta, IProduct } from "@/types";
import AllProducts from "./AllProducts";

const ShopPageContainer = async ({ prodsPromise, query }: { prodsPromise: Promise<{ data: { data: IProduct[], meta: IMeta } }>, query: { [key: string]: string | undefined } }) => {

  const products = await prodsPromise;

  return (
    <>
      {/* ========================= all products ========================== */}
      <AllProducts initialData={products?.data?.data} initialMeta={products?.data?.meta} query={query} key={JSON.stringify(query)}></AllProducts>
    </>
  );
};

export default ShopPageContainer;
