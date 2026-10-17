import PaginationSection from "@/components/shared/Pagination/PaginationSection"
import { IMeta, IOrder } from "@/types"
import StatusFilterSelect from "../../Order/StatusFilterSelect";
import { SellerProfileProductSorting } from "../../CategoryFilter/SellerProfileProductSorting";
import PurchaseReturnitem from "./PurchaseReturnitem";
import { GetReturnsByBuyer } from "@/lib/services/Returns";
import Image from "next/image";
import returnbox from "@/assets/images/return-box.jpg"

async function SellReturnContainer({ ssp }: { ssp: { [key: string]: string | undefined } }) {

    const { page, sortBy: sort, status } = ssp;

    let sortBy = "createdAt";
    let orderBy = "desc"

    // if (sort == "newest") {
    //     orderBy = "desc"
    // } else if (sort == "-price") {
    //     sortBy = "subtotal";
    //     orderBy = "asc"
    // }
    // else if (sort == "price") {
    //     sortBy = "subtotal";
    //     orderBy = "desc"
    // }

    const query: any = { sortBy, sortOrder: orderBy }

    if (page) {
        query.page = page
    }
    if (status && status !== "ALL") {
        query.status = status
    }

    const ordersResponse = await GetReturnsByBuyer({ query }) as { data: { data: IOrder[], meta: IMeta } };

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
                        id: "REQUESTED",
                        label: "Requested"
                    },
                    {
                        id: "APPROVED",
                        label: "Approved"
                    },
                    {
                        id: "DECLINED",
                        label: "Declined"
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
                        <PurchaseReturnitem key={order?.id}
                        //  order={order}
                        />
                    ))
                }

                {
                    orders?.length === 0 && <div className="py-20 md:py-24 lg:py-28 max-w-xs mx-auto">
                        <Image src={returnbox} unoptimized alt="empty-cart" className="h-20 lg:h-28 w-auto mx-auto" height={500} width={500} />
                        <p className="text-center text-gray-900 text-base font-semibold lg:text-lg my-0.5">No return requests found</p>
                        <p className="text-center text-gray-500 text-sm">No return requests submitted yet. When buyers request a return, they'll appear here.</p>
                    </div>
                }
            </div>


            <PaginationSection className="mt-5" current={Number(page) || 1} total={meta?.total || 1} />
            {/* <ReturnProductModal open={openRequestModal} setOpen={setOpenRequestModal} /> */}
        </div>
    )
}

export default SellReturnContainer