"use client";

import React, { useState } from "react";
import { HeartHandshake, Package, type LucideIcon } from "lucide-react";
import SellDonationTab from "./SellDonationTab";
import DirectMoneyDonationTab from "./DirectMoneyDonationTab";

type ContributionTabKey = "sell" | "direct";

interface TabItem {
  key: ContributionTabKey;
  label: string;
  icon: LucideIcon;
}

const TABS: TabItem[] = [
  { key: "sell", label: "Sell Donation", icon: Package },
  { key: "direct", label: "Direct Money", icon: HeartHandshake },
];

function MoneyDonationTab() {
  const [activeTab, setActiveTab] = useState<ContributionTabKey>("sell");

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex gap-6 border-b border-black/10">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 border-b-2 pb-3 px-1 text-sm sm:text-base cursor-pointer transition-colors ${
                isActive
                  ? "border-black font-medium text-black"
                  : "border-transparent text-black/40 hover:text-black/70"
              }`}
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "sell" ? <SellDonationTab /> : <DirectMoneyDonationTab />}
    </div>
  );
}

export default MoneyDonationTab;
