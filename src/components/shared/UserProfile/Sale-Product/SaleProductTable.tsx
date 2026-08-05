import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PaginationSection from "@/components/shared/Pagination/PaginationSection"
import Image from "next/image"
import GetOrdersBySeller from "@/lib/services/Orders"
import { IMeta, IOrder } from "@/types"
import moment from "moment"
import ItemsModal from "./ItemsModal"
import { defaultImg } from "@/utils/defaultImg"
import { OrderStatusFormat } from "@/utils/EnumFormater"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import SellActions from "./SellActions"
import Empty from "@/components/ui/empty"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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


      <div className="overflow-x-auto">
        <Table className="border border-gray-200">
          <TableHeader>
            <TableRow className="h-[50px]">
              <TableHead className="font-medium text-center">#Serial</TableHead>
              <TableHead className="font-medium">Items</TableHead>
              <TableHead className="font-medium text-center">Buyer Name</TableHead>
              <TableHead className="font-medium text-center">Total Price</TableHead>
              <TableHead className="font-medium text-center">Order Date</TableHead>
              <TableHead className="font-medium text-center">
                Status
              </TableHead>
              <TableHead className="font-medium text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {orders.map((order, indx) => (

              <TableRow key={order?.id} className="hover:bg-gray-50 h-[50px]">





                <TableCell className="font-medium text-center">
                  #{indx + 1}
                </TableCell>

                <TableCell>

                  {order?.items?.length > 0 ? <ItemsModal items={order?.items} finalPrice={order?.subtotal} action={<>
                    {<div className='relative h-14 w-14 cursor-pointer'>
                      <Image
                        height={800}
                        width={1000}
                        src={order?.items[0]?.product?.images[0]?.url || defaultImg?.product}
                        placeholder='blur'
                        blurDataURL={defaultImg?.placeholderImg}
                        alt='item images' className='object-cover h-full w-full rounded' />
                      <div className='bg-black/60 absolute top-0 left-0 h-full w-full flex justify-center items-center'>
                        <p className='text-base text-white font-popin'>{order?.items?.length}</p>
                      </div>
                    </div>}
                  </>} /> : <></>}

                </TableCell>

                <TableCell className="text-center">{order?.user?.fname} {order?.user?.lname}</TableCell>

                <TableCell className="font-medium text-center">${order?.subtotal?.toFixed(2)}</TableCell>

                <TableCell className="table-cell text-center">{moment(order?.createdAt).format("MM/DD/YYYY h:mm a")}</TableCell>

                <TableCell className={cn("font-medium text-center")}>
                  <Badge className={cn(OrderStatusFormat[order?.status]?.color)}>
                    {OrderStatusFormat[order?.status]?.label}
                  </Badge>
                </TableCell>



                <TableCell className="text-center -translate-x-4">

                  <SellActions status={order?.status} sellerGroupId={order?.id} order={order} />

                </TableCell>


              </TableRow>

            ))}
          </TableBody>
        </Table>
        {
          orders?.length === 0 && <Empty message="No orders found" className="my-10" />
        }
      </div>


      <PaginationSection className="mt-5" current={Number(page) || 1} total={meta?.total || 1} />
      {/* <ReturnProductModal open={openRequestModal} setOpen={setOpenRequestModal} /> */}
    </div>
  )
}
