import React from "react";
import { HeartHandshake } from "lucide-react";
import DonationRaisedTabs from "./_components/DonationRaisedTabs";

function DirectDonationRaised() {
  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-5 md:mb-6 lg:mb-8">
        <div className="flex items-center gap-2">
          <HeartHandshake className="h-6 w-6 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground">
            Donations Raised
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-700 max-w-2xl">
          View all monetary donations raised for your charity through seller
          listing pledges, direct supporter contributions, and checkout extras.
        </p>
      </div>

      <DonationRaisedTabs />
    </div>
  );
}

export default DirectDonationRaised;
