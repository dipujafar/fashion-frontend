"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { buyerCampaigns, getBadgeVariant, sellerCampaigns } from "./data.type";

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
          <Tabs defaultValue="seller" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none  bg-transparent p-8">
              <TabsTrigger
                value="seller"
                className="rounded-none border-transparent data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none py-2 font-medium"
              >
                Seller
              </TabsTrigger>
              <TabsTrigger
                value="buyer"
                className="rounded-none border-transparent data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none py-2 font-medium"
              >
                Buyer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="seller" className="mt-0 p-6">
              <div className="space-y-4">
                {/* Financial Summary */}
                <div className="space-y-3 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Raised</span>
                    <span className="text-muted-foreground">£1,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Direct Donation</span>
                    <span className="text-muted-foreground">£1,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Item Sales Proceeds</span>
                    <span className="text-muted-foreground">£450</span>
                  </div>
                </div>

                {/* Campaign List */}
                <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
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
                          campaign.type === "Direct"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : campaign.type === "Item sale"
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

            <TabsContent value="buyer" className="mt-0 p-6">
              <div className="space-y-4">
                {/* Financial Summary */}
                <div className="space-y-3 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Raised</span>
                    <span className="text-muted-foreground">£1,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Direct Donation</span>
                    <span className="text-muted-foreground">£1,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Purchase Proceeds</span>
                    <span className="text-muted-foreground">£450</span>
                  </div>
                </div>

                {/* Campaign List */}
                <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
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
                            {campaign.amount} • {campaign.time} •{" "}
                            {campaign.item}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={getBadgeVariant(campaign.type)}
                        className={
                          campaign.type === "Direct"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
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
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
