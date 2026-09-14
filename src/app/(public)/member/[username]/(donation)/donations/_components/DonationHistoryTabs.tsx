import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import SoldDonations from "./Donation/SoldDonations";
import HistoryTab from "./HistoryTab";
import BoughtDonations from "./Donation/BoughtDonations";
import DirectDonations from "./Donation/DirectDonations";
import ClothDonations from "./Donation/ClothDonations";
import TreeDonations from "./Donation/TreeDonations";

const DonationHistoryTabs = ({ defaultTab, username }: { defaultTab: string, username : string }) => {

    return (
        <Tabs
            defaultValue={defaultTab}
            className=""
        >
            <TabsList
                // style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
                className=" bg-white mb-2 h-12 p-0 lg:mb-4 border-b border-gray-200 w-full flex flex-row justify-start rounded-none"
            >
                {["Sold", "Bought", "Direct", "Clothing", "Trees"].map(item => {
                    return <HistoryTab tabName={item} key={item} />
                })}

            </TabsList>

            {["Sold", "Bought", "Direct", "Clothing", "Trees"].map(item => {
                return <TabsContent key={item} value={item}>
                    {
                        defaultTab == "Sold" ? <SoldDonations username={username}/> :
                            defaultTab == "Bought" ? <BoughtDonations username={username}/> :
                                defaultTab == "Direct" ? <DirectDonations username={username}/> :
                                    defaultTab == "Clothing" ? <ClothDonations /> :
                                        defaultTab == "Trees" ? <TreeDonations username={username}/> : <SoldDonations username={username}/>
                    }
                </TabsContent>
            })}

        </Tabs>
    );
};


export default DonationHistoryTabs;