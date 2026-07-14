import SaleProductTable from "@/components/shared/UserProfile/Sale-Product/SaleProductTable";
import SaleStatsCard from "@/components/shared/UserProfile/Sale-Product/SaleStatsCard";
import AddNewProduct from "@/components/shared/UserProfile/UploadProduct/AddNewProduct";
import CommonButton from "@/components/ui/common-button";
import { EaringIcon, TotalSaleIcon } from "@/icons";
import Link from "next/link";
import OrdersContainer from "./_components/OrdersContainer";

const saleState = [
    {
        icon: <TotalSaleIcon />,
        title: "Total Sales",
        value: "25",
    },
    {
        icon: <EaringIcon />,
        title: "Total Earning",
        value: "$2,000",
    },
];

async function SellPage({ searchParams, params }: { searchParams: Promise<{ [key: string]: string | undefined }>, params: Promise<{ username: string }> }) {
    const ssp = await searchParams;

    const { username } = await params;

    return (
        <div className="space-y-5">

            <div className="w-full rounded-xl border border-slate-200 bg-white px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Product Sell Orders
                        </h2>
                        <p className="mt-0.5 text-sm text-slate-500">
                            Track every listing you've put up for sale
                        </p>
                    </div>

                    <Link href={"/professional-seller/dashboard/products-list/add-product"}>
                        <CommonButton className="w-full">ADD NEW PRODUCT</CommonButton>
                    </Link>
                </div>
            </div>

            <SaleStatsCard data={saleState} />
            {/* <SaleProductTable /> */}
            <OrdersContainer ssp={ssp}/>
        </div>
    )
}

export default SellPage