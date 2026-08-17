import PaginationSection from "@/components/shared/Pagination/PaginationSection"
import Image from "next/image"
import GetOrdersBySeller from "@/lib/services/Orders"
import { IMeta, IOrder } from "@/types"

import SellItem from "./SellItem"
import Empty from "@/components/ui/empty"

export default async function SaleProductTable({ ssp }: { ssp: { [key: string]: string | undefined } }) {

  const { page, sortBy: sort, status } = ssp;

  let sortBy = "createdAt";
  let orderBy = "desc"

  if (sort == "newest") {
    orderBy = "desc"
  } else if (sort == "-price") {
    sortBy = "subtotal";
    orderBy = "asc"
  }
  else if (sort == "price") {
    sortBy = "subtotal";
    orderBy = "desc"
  }

  const query: any = { sortBy, sortOrder: orderBy }

  if (page) {
    query.page = page
  }
  if (status && status !== "ALL") {
    query.status = status
  }

  const ordersResponse = await GetOrdersBySeller({ query }) as { data: { data: IOrder[], meta: IMeta } };

  const orders = ordersResponse?.data?.data || [];

  const meta = ordersResponse?.data?.meta || {};

  return (
    <div>


      <div className="">

        {
          orders?.map((order) => (
            <SellItem key={order.id} order={order} />
          ))
        }

        {
          orders?.length === 0 && <Empty message="No orders found" className="my-10" />
        }
      </div>


      <PaginationSection className="mt-5" current={Number(page) || 1} total={meta?.total || 1} />
      {/* <ReturnProductModal open={openRequestModal} setOpen={setOpenRequestModal} /> */}
    </div>
  )
}
