import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { InfoIcon2 } from "@/icons";


export default function CharityInfo() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <InfoIcon2 />
      </DialogTrigger>
      <DialogContent className="max-w-4xl md:max-w-3xl max-h-[80vh] overflow-y-auto scroll-hide">
        <DialogHeader className="md:px-5 md:pt-8  space-y-1">
          <DialogTitle className="lg:text-2xl md:text-xl text-lg  font-semibold text-balance">
            How Charitable Donations Work on FASHI-ON
          </DialogTitle>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            Every purchase makes an impact. Here's how it works:
          </p>
        </DialogHeader>

        <div className="md:px-5 md:pb-8">
          <div className="grid md:grid-cols-2 md:gap-6 gap-2">
            {/* Seller Section */}
            <Card className="md:p-4 p-2 md:space-y-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground text-2xl">
                  👩‍💼
                </div>
                <h3 className="text-xl font-semibold">For Sellers</h3>
              </div>

              <div className="md:space-y-4 space-y-0.5">
                <div className="md:space-y-2 space-x-1">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Choose Charities (1–3):</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                    Pick up to three approved charities you want to support.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Set Your Donation Percentage:</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                    Decide what % of each sale you'll give (e.g., 10%, 20%,
                    50%+). This is shown on your product listing.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>How It's Split:</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                    If you select more than one charity, the buyer can decide
                    how the donation is shared between them.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Profile Recognition:</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                    Donations raised through your sales appear on your profile
                    and on the charity's profile. You can also choose to remain
                    anonymous.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Track Your Impact:</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                    Use your dashboard to see how much you've raised for each
                    charity.
                  </p>
                </div>
              </div>
            </Card>

            {/* Buyer Section */}
            <Card className="md:p-4 p-2 md:space-y-5 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary text-secondary-foreground text-2xl">
                  🛍️
                </div>
                <h3 className="text-xl font-semibold">For Buyers</h3>
              </div>

              <div className="md:space-y-4">
                <div className="md:space-y-2 space-x-1">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>Donation at Checkout:</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                    Sellers pledge a % of each sale to charity. At checkout, you
                    choose how that donation is split across the charities
                    they've selected.
                  </p>
                  <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-black">◦</span>
                      <span>
                        If there's 1 charity, the donation goes there
                        automatically.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-black">◦</span>
                      <span>
                        If there are 2–3 charities, you decide how to divide it.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>Optional Extra Giving:</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                    Add your own top-up donation at checkout if you'd like. This
                    extra amount will also show on the charity's profile.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>Profile Recognition:</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                    Your donations appear on your profile as part of your giving
                    history. (The main seller donation shows on the charity's
                    profile under the seller's contribution, not the buyer's —
                    but any extra you add will appear for the charity as well.)
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>Transparency & Updates:</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                    See a clear breakdown of your donation after purchase, plus
                    occasional updates from charities on the impact.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
