"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buyerCampaigns, clothingDonations, directDonations, getBadgeVariant, sellerCampaigns, treeDonationData } from "./data.type";
import { cn } from "@/lib/utils";

export function DonationHistory({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[550px] p-0">
        <div className="relative">
          <div className="mt-0 pt-8 px-6">
            <div className="">
              <div className="flex items-center justify-between border-b pb-0.5">
                <span className="font-medium">Total Raised</span>
                <span className="text-muted-foreground">£1,450</span>
              </div>

              <div className="flex items-center justify-between border-b pb-0.5">
                <span className="font-medium">Item Sales Proceeds</span>
                <span className="text-muted-foreground">£450</span>
              </div>
              <div className="space-y-1 border-b pb-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Purchase Contributions</span>
                  <span className="text-muted-foreground">£450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Extra Donations</span>
                  <span className="text-muted-foreground">£120</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b pb-1">
                <span className="font-medium">Direct Donation</span>
                <span className="text-muted-foreground">£1,450</span>
              </div>
              <div className="flex items-center justify-between border-b pb-1">
                <span className="font-medium">Total Clothing Donated</span>
                <span className="text-muted-foreground">7 items</span>
              </div>
              <div className="space-y-1 border-b pb-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Tree Donated</span>
                  <span className="text-muted-foreground">150</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Amount Raised</span>
                  <span className="text-muted-foreground">£600</span>
                </div>
              </div>


            </div>
          </div>
          <Tabs defaultValue="seller" className="w-full lg:h-[600px] h-[500px] overflow-y-auto scroll-hides ">


            <TabsList className="grid w-full grid-cols-5 rounded-none  bg-transparent p-8">
              <TabsTrigger
                value="seller"
                className="rounded-none border-transparent data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none py-2 font-medium"
              >
                Sold
              </TabsTrigger>
              <TabsTrigger
                value="buyer"
                className="rounded-none border-transparent data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white  data-[state=active]:shadow-none py-2 font-medium"
              >
                Bought
              </TabsTrigger>
              <TabsTrigger
                value="direct"
                className="rounded-none border-transparent data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none py-2 font-medium"
              >
                Direct
              </TabsTrigger>
              <TabsTrigger
                value="clothing"
                className="rounded-none border-transparent data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none py-2 font-medium"
              >
                Clothing
              </TabsTrigger>
              <TabsTrigger
                value="tree"
                className="rounded-none border-transparent data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none py-2 font-medium"
              >
                Trees
              </TabsTrigger>
            </TabsList>

            <TabsContent value="seller" className="mt-0 p-6 lg:h-[600px] h-[500px] overflow-y-auto scroll-hide">
              <div className="space-y-4">


                {/* Campaign List */}
                <div className="space-y-4 pr-2">
                  {sellerCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage
                            src={campaign.avatar || "/placeholder.svg"}
                            alt={campaign.name}
                          />
                          <AvatarFallback>
                            {campaign.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {campaign.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.amount} • {campaign.time} •{" "}
                            {campaign.item}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={getBadgeVariant(campaign.type)}
                        className={
                          campaign.type === "Item sold"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            : "bg-purple-100 text-purple-700 hover:bg-purple-100"
                        }
                      >
                        {campaign.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="buyer" className="mt-0 p-6 lg:h-[600px] h-[500px] overflow-y-auto scroll-hide">
              <div className="space-y-4">
                {/* Financial Summary */}

                {/* Campaign List */}
                <div className="space-y-4 pr-2">
                  {buyerCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage
                            src={campaign.avatar || "/placeholder.svg"}
                            alt={campaign.name}
                          />
                          <AvatarFallback>
                            {campaign.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {campaign.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.amount} <span className={cn("text-orange-700", !campaign?.extraDonation && "hidden" )}> • {campaign?.extraDonation}</span> • {campaign.time} •{" "}
                            {campaign.item}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        {campaign?.extraDonation && <Badge
                          variant={getBadgeVariant(campaign.type)}
                          className={

                            "bg-orange-100 text-orange-700 hover:bg-orange-100"
                          }
                        >
                          Extra Donation
                        </Badge>}
                        <Badge
                          variant={getBadgeVariant(campaign.type)}
                          className={

                            "bg-purple-100 text-purple-700 hover:bg-purple-100"
                          }
                        >
                          {campaign.type}
                        </Badge>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="direct" className="mt-0 p-6 lg:h-[600px] h-[500px] overflow-y-auto scroll-hide">
              <div className="space-y-4">
                <div className=" space-y-4  pr-2">
                  {directDonations.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage
                            src={campaign.avatar || "/placeholder.svg"}
                            alt={campaign.name}
                          />
                          <AvatarFallback>
                            {campaign.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {campaign.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.amount} • {campaign.time}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={getBadgeVariant(campaign.type)}
                        className={
                          "bg-green-100 text-green-700 hover:bg-green-100"

                        }
                      >
                        {campaign.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="clothing" className="mt-0 p-6 lg:h-[600px] h-[500px] overflow-y-auto scroll-hide">
              {/* Clothing Donations List */}
              <div className="space-y-3">
                {clothingDonations.map((donation) => (
                  <div key={donation.id} className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      {donation.avatar ? (
                        <AvatarImage
                          src={donation.avatar || "/placeholder.svg"}
                          alt={donation.name}
                        />
                      ) : null}
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {donation.name === "Anonymous"
                          ? "?"
                          : donation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{donation.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        donated {donation.time}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {donation.items.map((item, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tree" className="mt-0 p-6 lg:h-[600px] h-[500px] overflow-y-auto scroll-hide">
              <div className="space-y-4">
                {/* Campaign List */}
                <div className=" space-y-4 pr-2">
                  <ul className="flex justify-between items-center  font-medium">
                    <li className="flex-1">SL</li>
                    <li className="flex-1 text-center">Quantity</li>
                    <li className="flex-1 text-center">Amount</li>
                  </ul>
                  {treeDonationData?.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between  gap-4"
                    >
                      <span className="flex-1">{donation.id}</span>
                      <span className="flex-1 text-center">{donation.quantity}</span>
                      <span className="flex-1 text-center">{donation.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
