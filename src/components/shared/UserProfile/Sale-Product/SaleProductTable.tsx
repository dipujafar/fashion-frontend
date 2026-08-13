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
import React from "react"

import {
  ChevronDown,
  MessageCircle,
  MoreVertical,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

  const billingDetails = orders?.[0]?.billingDetails;

  const locationParts = [
    billingDetails?.zip_code,
    billingDetails?.state,
    billingDetails?.city,
    billingDetails?.country,
  ].filter(Boolean);

  const locationLine = locationParts.join(", ");

  return (
    <div>


      <div className="">

        {
          orders?.map((order) => (
            <div className="flex flex-col md:flex-row justify-between border border-gray-200 border-b-0 last:border-b rounded-none p-4" key={order.id}>

              {/* Left: customer + items */}
              <div className="order-2 md:order-1 flex-1">

                <div className="text-sm">
                  <p className="text-primary-black text-base font-medium">USD ${order?.itemsTotal.toFixed(2)}</p>
                </div>

                <ul className="mt-4 space-y-3">
                  {order?.items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <Link href={`/shop/${item.product?.id}`}>
                        <Image
                          src={item.product?.images?.[0]?.url || defaultImg?.product}
                          alt={item.product?.title || "Product image"}
                          loading="lazy"
                          width={1000}
                          height={1000}
                          className="size-20 shrink-0 rounded border border-border object-cover"
                        />
                      </Link>
                      <div className="flex-1 space-y-0.5 flex flex-row items-start gap-x-3">

                        <div className="space-y-0.5">
                          <p className="text-base text-gray-800 font-medium">{item?.product?.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Size <span className="font-semibold text-foreground">{item.product?.size?.title}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Price <span className="font-semibold text-foreground">${item.product?.finalPrice}</span>
                          </p>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-7 shrink-0 cursor-pointer"
                            >
                              <MoreVertical className="size-4 text-primary-black" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-32 rounded-none p-0">

                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive flex-row items-center cursor-pointer p-2"
                            // onClick={() => itemAction(item, "Item removed")}
                            >
                              <Trash2 className="size-4 text-destructive" />
                              Cancel Item
                            </DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: shipping details + order actions */}
              <div className="space-y-2 lg:space-y-3 min-w-80 order-1 md:order-2 pb-5 md:pb-0">

                <div className="flex flex-row justify-between items-center">
                  <Badge variant={"outline"} className={cn(OrderStatusFormat[order?.status]?.color, "font-semibold")}>
                    {OrderStatusFormat[order?.status]?.label}
                  </Badge>

                  <div className="flex flex-row items-center gap-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="cursor-pointer"
                    // onClick={() => orderAction("Message drafted")}
                    >
                      <MessageCircle className="size-5 text-muted-foreground" />
                    </Button>

                    <SellActions status={order.status} sellerGroupId={order.id} order={order} />
                  </div>
                </div>

                <p className="text-gray-700 text-sm">Ordered <span className="text-primary-black font-medium">{moment(order.createdAt).format("MM/DD/YYYY, h:mm a")}</span></p>

                <Collapsible>

                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm cursor-pointer"
                    // onClick={() => orderAction("Delivery details opened")}
                    >
                      Deliver to
                      <ChevronDown className="size-3.5" />
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-2">
                    <div className="space-y-0.5 mt-1">
                      {billingDetails && (
                        <>
                          {billingDetails?.full_name && (
                            <h5 className='text-sm font-semibold'>{billingDetails?.full_name}</h5>
                          )}
                          {billingDetails?.contact && (
                            <p className='text-gray-600 text-sm'>{billingDetails?.contact}</p>
                          )}
                          {billingDetails?.address1 && (
                            <p className='text-gray-600 text-sm'>{billingDetails?.address1}</p>
                          )}
                          {locationLine && (
                            <p className='text-gray-600 text-sm'>{locationLine}</p>
                          )}


                        </>
                      )}
                    </div>
                  </CollapsibleContent>

                </Collapsible>

                <Button variant={"default"} className="rounded-none shadow-none cursor-pointer">
                  Get Shipping Label
                </Button>

              </div>
            </div>
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
