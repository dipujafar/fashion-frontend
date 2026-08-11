import { SellerProfileProductSorting } from "@/components/shared/CategoryFilter/SellerProfileProductSorting";
import StatusFilterSelect from "@/components/shared/Order/StatusFilterSelect";
import SaleProductTable from "@/components/shared/UserProfile/Sale-Product/SaleProductTable";


const OrdersContainer = ({ ssp }: { ssp: { [key: string]: string | undefined } }) => {

    return (
        <>
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
                        id: "CONFIRMED",
                        label: "Confirmed"
                    },
                    {
                        id: "SHIPPED",
                        label: "Shipped"
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

            <SaleProductTable ssp={ssp} />
        </>
    );
};


export default OrdersContainer;