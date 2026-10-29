"use client";

import React, { useState } from "react";
import {
  Gift,
  HeartHandshake,
  Package,
  type LucideIcon,
} from "lucide-react";
import SellDonationRaisedTab from "./SellDonationRaisedTab";
import DirectDonationRaisedTab from "./DirectDonationRaisedTab";
import ExtraDonationRaisedTab from "./ExtraDonationRaisedTab";

type RaisedTabKey = "sell" | "direct" | "extra";

interface TabItem {
  key: RaisedTabKey;
  label: string;
  icon: LucideIcon;
}

const TABS: TabItem[] = [
  { key: "sell", label: "Sell Donation", icon: Package },
  { key: "direct", label: "Direct Donation", icon: HeartHandshake },
  { key: "extra", label: "Extra", icon: Gift },
];

function DonationRaisedTabs() {
  const [activeTab, setActiveTab] = useState<RaisedTabKey>("sell");

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex flex-wrap gap-6 border-b border-black/10">
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
      {activeTab === "sell" && <SellDonationRaisedTab />}
      {activeTab === "direct" && <DirectDonationRaisedTab />}
      {activeTab === "extra" && <ExtraDonationRaisedTab />}
    </div>
  );
}

export default DonationRaisedTabs;

