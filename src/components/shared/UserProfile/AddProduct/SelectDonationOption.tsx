import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon2 } from "@/icons";

export default function SelectDonationOption() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="border-none shadow-none hover:bg-transparent cursor-pointer py-0">
          <InfoIcon2 className="" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl md:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className=" text-base font-semibold border-b mt-1.5">
            Donation
          </DialogTitle>
        </DialogHeader>

        <div>
          {/* Seller Process */}
          <div className="space-y-2">
            <div className="space-y-1 text-sm">
              <div>
                <h3 className="font-semibold">Charity Process for Sellers:</h3>
                <p className="text-base text-muted-foreground mb-3">
                  Sellers on the platform can choose to donate a percentage of
                  their sales to one or more charities. Here's how the charity
                  donation process works for sellers:
                </p>
              </div>

              {/* Setting Up Charity Donations */}
              <div>
                <h4 className="font-semibold mb-1">
                  a. Setting Up Charity Donations:
                </h4>
                <div className="ml-3 space-y-2">
                  <div>
                    <span className="font-medium">• Charity Selection:</span>
                    <p className="text-xs ml-4">
                      The seller selects 1 to 3 charities to support. These
                      charities are pre-approved and listed by the platform.
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">• Donation Percentage:</span>
                    <p className="text-xs ml-4">
                      The seller determines the percentage of the product price
                      they want to donate to charity. The seller can select up
                      to 100% for charity donations, but typically it's a
                      percentage (e.g., 10%, 20%, 50%, etc.). The total donation
                      percentage must be clearly communicated on the product
                      listing.
                    </p>
                    <div className="ml-4 mt-1 text-xs">
                      <span className="font-medium">Example:</span> A seller
                      sets 20% of the sale price to go to charity.
                    </div>
                  </div>
                </div>
              </div>

              {/* Charity Fund Allocation */}
              <div>
                <h4 className="font-semibold mb-1">
                  b. Charity Fund Allocation:
                </h4>
                <div className="ml-3 space-y-2">
                  <div>
                    <span className="font-medium">
                      • How the Percentage Works:
                    </span>
                    <p className="text-xs ml-4">
                      The seller determines how the total percentage is split
                      between the selected charities. The donation amount is
                      calculated based on the final sale price of the item.
                    </p>
                    <div className="ml-4 mt-1 text-xs">
                      <span className="font-medium">Example:</span> If a seller
                      lists an item for $100 and donates 20%, this equals $20.
                    </div>
                    <p className="text-xs ml-4">
                      The seller can choose to split the $20 donation among
                      selected charities (e.g., $10 to Charity A, $10 to Charity
                      B) or give the entire amount to one charity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Multiple Charities Selection */}
              <div>
                <h4 className="font-semibold mb-1">
                  c. Multiple Charities Selection:
                </h4>
                <p className="text-xs ml-3">
                  When the seller selects multiple charities, the donation
                  percentage will be divided equally unless specified otherwise.
                  For example, if the seller donates 20% and selects 3
                  charities, the donation can be split as 6.67% per charity
                  (depending on the buyer's choices).
                </p>
              </div>

              {/* Donation Management */}
              <div>
                <h4 className="font-semibold mb-1">d. Donation Management:</h4>
                <div className="ml-3">
                  <span className="font-medium text-xs">
                    • Donation Tracking:
                  </span>
                  <p className="text-xs ml-4">
                    Sellers can track their donations on their dashboard,
                    showing how much has been raised for each charity. They will
                    also be able to see the total amount donated across all
                    their products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
