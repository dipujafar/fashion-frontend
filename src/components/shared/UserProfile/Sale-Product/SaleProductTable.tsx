import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PaginationSection from "@/components/shared/Pagination/PaginationSection"
import Image from "next/image"
import GetOrdersBySeller from "@/lib/services/Orders"
import { IMeta, IOrder, IsellerGroup, OrderStatus } from "@/types"
import moment from "moment"
import ItemsModal from "./ItemsModal"
import { defaultImg } from "@/utils/defaultImg"
import { OrderStatusFormat } from "@/utils/EnumFormater"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import SellActions from "./SellActions"

export default async function SaleProductTable() {

  const ordersResponse = await GetOrdersBySeller({ query: { page: "1", limit: "10" } }) as { data: { data: IOrder[], meta: IMeta } };

  const orders = ordersResponse?.data?.data || [];

  return (
    <div>

      <Card className="hidden md:block py-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black h-[50px]">
                  <TableHead className="text-white font-medium text-center">#Serial</TableHead>
                  <TableHead className="text-white font-medium">Items</TableHead>
                  <TableHead className="text-white font-medium text-center">Buyer Name</TableHead>
                  <TableHead className="text-white font-medium text-center">Total Price</TableHead>
                  <TableHead className="text-white font-medium text-center">Order Date</TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, indx) => (
                  <TableRow key={order?.id} className="hover:bg-gray-50 h-[50px]">

                    <TableCell className="font-medium text-center">
                      #{indx + 1}
                    </TableCell>

                    <TableCell>

                      {order?.sellerGroups[0]?.items?.length > 0 ? <ItemsModal items={order?.sellerGroups[0]?.items} finalPrice={order?.sellerGroups[0]?.subtotal} action={<>
                        {<div className='relative h-14 w-14 cursor-pointer'>
                          <Image
                            height={800}
                            width={1000}
                            src={order?.sellerGroups[0]?.items[0]?.product?.images[0]?.url || defaultImg?.product}
                            placeholder='blur'
                            blurDataURL={defaultImg?.placeholderImg}
                            alt='item images' className='object-cover h-full w-full rounded' />
                          <div className='bg-black/60 absolute top-0 left-0 h-full w-full flex justify-center items-center'>
                            <p className='text-base text-white font-popin'>{order?.sellerGroups[0]?.items?.length}</p>
                          </div>
                        </div>}
                      </>} /> : "N/A"}

                    </TableCell>

                    <TableCell className="text-center">{order?.user?.fname} {order?.user?.lname}</TableCell>

                    <TableCell className="font-medium text-center">${order?.sellerGroups[0]?.subtotal?.toFixed(2)}</TableCell>

                    <TableCell className="hidden sm:table-cell text-center">{moment(order?.createdAt).format("MM/DD/YYYY h:mm a")}</TableCell>

                    <TableCell className={cn("font-medium text-center")}>
                      <Badge className={cn(OrderStatusFormat[order?.sellerGroups[0]?.status]?.color)}>
                        {OrderStatusFormat[order?.sellerGroups[0]?.status]?.label}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center -translate-x-4">

                      <SellActions status={order?.sellerGroups[0]?.status} sellerGroupId={order?.sellerGroups[0]?.id} order={order} />

                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* <div className="md:hidden space-y-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                  <Link href={`/shop/2`}>
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/shop/2`} className="font-semibold text-sm hover:underline block truncate">
                    {item.title}
                  </Link>
                  <p className="text-xs text-gray-600 mt-1">
                    Item: <span className="font-medium">{item.itemNumber}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">${item.salePrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-600">Buyer</p>
                  <p className="font-medium">{item.buyerName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Size</p>
                  <p className="font-medium">UK 10</p>
                </div>
                <div>
                  <p className="text-gray-600">Condition</p>
                  <p className="font-medium">2 months used</p>
                </div>
                <div>
                  <p className="text-gray-600">Sale Date</p>
                  <p className="font-medium">{item.saleDate}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                {item?.status === "Return Request" ? (
                  <Badge
                    className={cn("cursor-pointer w-full justify-center", getStatusBadgeVariant(item.status))}
                  // onClick={() => setOpenRequestModal(true)}
                  >
                    {item.status}
                  </Badge>
                ) : (
                  <Badge className={cn("w-full justify-center", getStatusBadgeVariant(item.status))}>
                    {item.status}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div> */}

      <PaginationSection className="mt-5" current={1} total={50} />
      {/* <ReturnProductModal open={openRequestModal} setOpen={setOpenRequestModal} /> */}
    </div>
  )
}
