import PaginationSection from "@/components/shared/Pagination/PaginationSection"
import GetOrdersBySeller, { GetOrdersByBuyer } from "@/lib/services/Orders"
import { IMeta, IOrder } from "@/types"
import Empty from "@/components/ui/empty"
import PurchaseItem from "./PurchaseItem";
import StatusFilterSelect from "../../Order/StatusFilterSelect";
import { SellerProfileProductSorting } from "../../CategoryFilter/SellerProfileProductSorting";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function PurchaseProductContainer({ ssp }: { ssp: { [key: string]: string | undefined } }) {

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

    const ordersResponse = await GetOrdersByBuyer({ query }) as { data: { data: IOrder[], meta: IMeta } };

    const orders = ordersResponse?.data?.data || [];

    const meta = ordersResponse?.data?.meta || {};

    return (
        <div className="space-y-5">

            <div className="flex flex-row gap-x-1 md:gap-x-3 items-center">
                <StatusFilterSelect options={[
                    {
                        id: "ALL",
                        label: "All"
                    },
                    {
                        id: "PENDING",
                        label: "Pending"
                    },
                    {
                        id: "SHIPPED",
                        label: "Shipped"
                    },
                    {
                        id: "OUT_FOR_DELIVERY",
                        label: "Out for Delivery"
                    },
                    {
                        id: "DELIVERED",
                        label: "Delivered"
                    },
                    {
                        id: "COMPLETED",
                        label: "Completed"
                    },
                    {
                        id: "CANCELLED",
                        label: "Cancelled"
                    }
                ]} searchParamsKey="status" defaultValue={"ALL"} label="Status" />
                <SellerProfileProductSorting />
            </div>


            <div className="">

                {
                    orders?.map((order) => (
                        <PurchaseItem key={order?.id} order={order} />
                    ))
                }

                {
                    orders?.length === 0 && <div className="py-20 md:py-24 lg:py-28">
                        <Image src={"/emty-box.png"} unoptimized alt="empty-cart" className="h-16 lg:h-24 w-auto mx-auto" height={500} width={500} />
                        <p className="text-center text-gray-700 text-sm lg:text-lg">No orders available</p>
                        <center>
                            <Link href={"/shop"}>
                                <Button variant={"default"} className="rounded-none cursor-pointer mx-auto mt-2">Order an Item</Button>
                            </Link>
                        </center>
                    </div>
                }
            </div>


            <PaginationSection className="mt-5" current={Number(page) || 1} total={meta?.total || 1} />
            {/* <ReturnProductModal open={openRequestModal} setOpen={setOpenRequestModal} /> */}
        </div>
    )
}

export default PurchaseProductContainer