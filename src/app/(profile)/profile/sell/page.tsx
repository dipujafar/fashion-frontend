import SaleProductTable from "@/components/shared/UserProfile/Sale-Product/SaleProductTable";
import SaleStatsCard from "@/components/shared/UserProfile/Sale-Product/SaleStatsCard";
import AddNewProduct from "@/components/shared/UserProfile/UploadProduct/AddNewProduct";
import { EaringIcon, TotalSaleIcon } from "@/icons";

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

function SellPage() {
    return (
        <div className="space-y-5">
            <AddNewProduct link="/professional-seller/dashboard/products-list/add-product" />
            
            <SaleStatsCard data={saleState} />
            <SaleProductTable />
        </div>
    )
}

export default SellPage