"use client";

import React from "react";
import { HeartHandshake } from "lucide-react";
import ContributionStats from "./_components/ContributionStats";
import MoneyDonationTab from "./_components/MoneyDonationTab";

function DonationContribution() {
  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-5 md:mb-6 lg:mb-8">
        <div className="flex items-center gap-2">
          <HeartHandshake className="h-6 w-6 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground">
            Donation Contributions
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-700 max-w-2xl">
          Track the donations you have contributed to charities through your
          listing sales and direct monetary support.
        </p>
      </div>

      {/* Contribution Stats */}
      <ContributionStats />

      {/* Tabs & Lists */}
      <MoneyDonationTab />
    </div>
  );
}

export default DonationContribution;
