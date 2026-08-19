import PaginationSection from "@/components/shared/Pagination/PaginationSection"
import GetOrdersBySeller from "@/lib/services/Orders"
import { IMeta, IOrder } from "@/types"
import Empty from "@/components/ui/empty"
import StatusFilterSelect from "../../Order/StatusFilterSelect";
import { SellerProfileProductSorting } from "../../CategoryFilter/SellerProfileProductSorting";
import PurchaseReturnitem from "./PurchaseReturnitem";
import { GetReturnsByBuyer } from "@/lib/services/Returns";

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
                    orders?.length === 0 && <Empty message="No return requests found" className="my-10" />
                }
            </div>


            <PaginationSection className="mt-5" current={Number(page) || 1} total={meta?.total || 1} />
            {/* <ReturnProductModal open={openRequestModal} setOpen={setOpenRequestModal} /> */}
        </div>
    )
}

export default SellReturnContainer