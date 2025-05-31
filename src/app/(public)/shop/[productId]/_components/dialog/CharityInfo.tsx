import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "@/icons";

export default function CharityInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild className="mt-1">
        <InfoIcon />
      </DialogTrigger>
      <DialogContent className="max-w-4xl md:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className=" text-base font-semibold border-b mt-1.5">
            HOW THE CHARITABLE DONATIONS WORK
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Seller Process */}
          <div className="space-y-2">
            <div className="bg-black text-white text-center py-1 font-semibold">
              Seller
            </div>

            <div className="space-y-1 text-sm">
              <div>
                <h3 className="font-semibold">
                  Charity Process for Sellers:
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
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

          {/* Buyer Process */}
          <div className="space-y-2">
            <div className="bg-black text-white text-center py-1 font-semibold">
              Buyer
            </div>

            <div className="space-y-1 text-sm">
              <div>
                <h3 className="font-semibold ">
                  Charity Process for Buyers:
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Buyers also play an active role in supporting charities when
                  purchasing items. They have the option to choose how the
                  donation percentage set by the seller is distributed among the
                  selected charities.
                </p>
              </div>

              {/* Charity Choice at Checkout */}
              <div>
                <h4 className="font-semibold mb-1">
                  a. Charity Choice at Checkout:
                </h4>
                <div className="ml-3 space-y-2">
                  <div>
                    <span className="font-medium">• Selecting a Charity:</span>
                    <p className="text-xs ml-4">
                      At checkout, the buyer will see the total donation amount
                      (e.g., 20% of the purchase price) and can select which
                      charity or charities they want to donate to from the
                      seller's pre-selected list.
                    </p>
                  </div>
                </div>
              </div>

              {/* How the Percentage Works */}
              <div>
                <h4 className="font-semibold mb-1">
                  b. How the Percentage Works:
                </h4>
                <p className="text-xs ml-3">
                  The buyer can either donate the full percentage (e.g., 20%) to
                  one selected charity or choose to split it across the
                  charities the seller has selected. This is done based on their
                  preferences.
                </p>
                <div className="ml-3 mt-1 text-xs">
                  <span className="font-medium">Example:</span>
                  <p className="ml-4">
                    If the seller donates 20% to charity, the buyer can choose
                    to allocate all 20% to one charity, or split it among
                    multiple charities.
                  </p>
                </div>
              </div>

              {/* Additional Donations */}
              <div>
                <h4 className="font-semibold mb-1">c. Additional Donations:</h4>
                <p className="text-xs ml-3">
                  The buyer may have the option to add additional donations on
                  top of the seller's contribution during checkout (e.g.,
                  donating extra $5 to a selected charity), depending on the
                  platform's settings.
                </p>
              </div>

              {/* Tracking and Transparency */}
              <div>
                <h4 className="font-semibold mb-1">
                  d. Tracking and Transparency:
                </h4>
                <div className="ml-3 space-y-1">
                  <div>
                    <span className="font-medium text-xs">
                      • Donation Breakdown for Buyers:
                    </span>
                    <p className="text-xs ml-4">
                      After completing the purchase, the buyer can view the
                      breakdown of their donation.
                    </p>
                    <p className="text-xs ml-4">
                      How much of their purchase went to each charity:
                    </p>
                    <p className="text-xs ml-8">
                      A receipt or confirmation showing the exact amount
                      donated.
                    </p>
                  </div>
                </div>
              </div>

              {/* Donation History */}
              <div>
                <h4 className="font-semibold mb-1">
                  e. Donation History for Buyers:
                </h4>
                <p className="text-xs ml-3">
                  Buyers will be able to track all charity donations made
                  through the platform. This allows them to see how much they've
                  contributed over time.
                </p>
              </div>

              {/* Charity Impact Reports */}
              <div>
                <h4 className="font-semibold mb-1">
                  f. Charity Impact Reports:
                </h4>
                <div className="ml-3">
                  <span className="font-medium text-xs">
                    • Updates from Charities:
                  </span>
                  <p className="text-xs ml-4">
                    Some platforms provide regular impact updates from the
                    charities that benefit from donations, so buyers can see how
                    their contributions are making a difference.
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
