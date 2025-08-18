import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ResellProductDescription() {
  return (
    <div className="md:space-y-7 space-y-5">
      {/* Main Description */}
      <div>
        <div style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}>
          <CardTitle className="text-lg text-center font-medium">
            Description
          </CardTitle>
        </div>
        <div className="space-y-4">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            The Heart Ruffled Sweatshirt is a perfect blend of comfort, style,
            and personality. Crafted from a soft cotton blend, this cozy
            sweatshirt is designed to keep you feeling warm and stylish, whether
            you're lounging at home or out and about. The standout feature of
            this sweatshirt is the playful ruffled heart design on the front,
            which adds a charming and feminine touch to an otherwise classic and
            versatile piece.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div>
        <div>
          <p>Key Features:</p>
        </div>
        <div className="space-y-3">
          <div className="space-y-3 text-sm md:text-base">
            <div>
              <span>Material:</span>
              <span className="text-muted-foreground ml-2">
                Made with a high-quality cotton blend, this sweatshirt provides
                a perfect balance of warmth, breathability, and durability,
                ensuring you stay cozy all day.
              </span>
            </div>
            <div>
              <span>Unique Design:</span>
              <span className="text-muted-foreground ml-2">
                The ruffled heart detail on the chest gives this sweatshirt a
                modern and fun twist. It's perfect for those who want to add a
                bit of whimsy to their everyday wardrobe without being too bold
                or flashy.
              </span>
            </div>
            <div>
              <span>Fit:</span>
              <span className="text-muted-foreground ml-2">
                Designed in a relaxed fit with long sleeves and a crew neckline,
                it offers a flattering and easy- going silhouette. Whether
                you're lounging at home or wearing it on its own, this
                sweatshirt ensures comfort throughout the day.
              </span>
            </div>
            <div>
              <span>Versatile Style:</span>
              <span className="text-muted-foreground ml-2">
                Available in a dark gray shade, this piece can easily be paired
                with jeans, leggings, or skirts for a casual, chic look. Dress
                it up with your favorite accessories or keep it casual for a
                laid-back, comfy vibe.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Care Instructions */}
      <div>
        <div>
          <p>Care Instructions</p>
        </div>
        <div className="space-y-2 text-sm md:text-base">
          <p>
            <span>Machine wash cold</span> to maintain fabric quality.
          </p>
          <p>
            <span>Tumble dry low or hang to dry</span> to preserve the shape and
            ruffle details.
          </p>
          <p>
            <span>Do not bleach</span> to maintain the color integrity.
          </p>
        </div>
      </div>

      {/* Shipping & Returns */}
      <div>
        <div style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}>
          <CardTitle className="text-lg text-center font-medium mb-2">
            Shipping & Returns
          </CardTitle>
        </div>
        <div className="space-y-4 text-sm md:text-base">
          <div>
            <div className="space-y-1 text-muted-foreground">
              <p>
                All orders are processed within 5 - 7 business days and shipped
                via trusted carriers including USPS, FedEx, and UPS to ensure
                your order is handled with care and delivered on time.
              </p>
              <p>
                <span className=" text-foreground">
                  Shipping Methods & Costs:
                </span>
              </p>
              <p>
                Standard Shipping: We currently ship to Canada, UK, and select
                European countries starting at $15.
              </p>
              <p>
                <span className=" text-foreground">Free Shipping:</span> More
                than one orders over $50 within the US.
              </p>
              <p>
                <span className=" text-foreground">
                  International Shipping:
                </span>{" "}
                We currently ship to Canada, UK, and select European countries.
                Shipping fees will be calculated at checkout.
              </p>
              <p>
                <span className=" text-foreground">Track Your Order:</span> Once
                shipped, a tracking number will be emailed to you for tracking
                your order.
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className=" mb-2">Returns:</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>
                We accept returns within 30 days of purchase. To return an item:
              </p>
              <p>Contact support@[brand].com to initiate the return.</p>
              <p>Provide your order number and reason for return.</p>
              <p>We will send you a prepaid return shipping label.</p>
              <p>Pack the item securely and attach the return label.</p>
              <p>
                Once we receive the item, we'll process a refund to your
                original payment method.
              </p>
              <p>
                <span className=" text-foreground">Exchange:</span> You can
                exchange items for a different size or color if available.
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className=" mb-2">Refunds & Shipping Costs:</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>
                Refunds will be issued to the original payment method within 5-7
                business days after we receive the returned item.
              </p>
              <p>
                You are responsible for the cost of return shipping, unless the
                item is defective or incorrect.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Policy */}
      <div>
        <div style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}>
          <CardTitle className="text-lg text-center font-medium mb-2">
            Delivery Policy
          </CardTitle>
        </div>
        <div className="space-y-2 text-sm md:text-base text-muted-foreground">
          <p>
            Orders are processed within 1-2 business days and delivered within
            5-7 business days via shipping.
          </p>
          <p>
            <span className=" text-foreground">Delivery Address:</span>
          </p>
          <p>
            Please ensure that your delivery address is correct and complete at
            the time of checkout. FASHION ON POINT will not be held responsible
            for lost or delayed shipments due to incorrect or incomplete
            addresses.
          </p>
          <p>
            If you need to update your address after placing the order, please
            contact customer support as soon as possible, and we will do our
            best to accommodate the change before shipping.
          </p>
        </div>
      </div>
    </div>
  );
}
