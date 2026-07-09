import HistoryTab from "@/app/(public)/member/[username]/@general/donations/_components/HistoryTab";
import { SellerProfileProductSorting } from "@/components/shared/CategoryFilter/SellerProfileProductSorting";
import SaleProductTable from "@/components/shared/UserProfile/Sale-Product/SaleProductTable";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";


const OrdersContainer = ({ defaultTab }: { defaultTab: string }) => {

    return (
        <Tabs
            defaultValue={defaultTab}
            className=""
        >
            <div className="flex flex-row justify-between items-center">
                <TabsList
                    // style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
                    className=" bg-white h-12 p-0 lg:mb-4 border-b border-gray-200 flex flex-row justify-start rounded-none"
                >
                    {["Orders", "Returns"].map(item => {
                        return <HistoryTab tabName={item} key={item} />
                    })}

                </TabsList>
                <div >
                    <SellerProfileProductSorting />
                </div>
            </div>


            {["Orders", "Returns"].map(item => {
                return <TabsContent key={item} value={item}>
                    {
                        defaultTab == "Orders" ? <SaleProductTable /> :
                            <>
                            </>

                    }
                </TabsContent>
            })}

        </Tabs>
    );
};


export default OrdersContainer;