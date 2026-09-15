"use client";
import React, { useState, type ReactNode } from "react";
import {
  Wallet,
  Banknote,
  Store,
  Gift,
  Package,
  HeartHandshake,
  Download,
  type LucideIcon,
} from "lucide-react";
import { SellerEarningPanel } from "./Earnings";
import SellDonationPanel, { DirectDonationPanel } from "./Donation";
import Payouts from "./Payouts";

interface TabItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface RowData {
  left: string;
  mid: string;
  right: number;
}

const money = (n: number): string => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/* ---------------------------------------------------------------
   Shared row — used by every leaf panel's list
--------------------------------------------------------------- */

function Row({ left, mid, right }: RowData) {
  return (
    <div className="flex items-center justify-between border-b border-black/10 py-3.5 last:border-0">
      <div>
        <p className="text-sm font-medium text-black">{left}</p>
        <p className="text-xs text-black/50">{mid}</p>
      </div>
      <p className="text-sm font-semibold tabular-nums text-black">
        {money(right)}
      </p>
    </div>
  );
}

interface PanelHeadingProps {
  children: ReactNode;
  action?: ReactNode;
}

function PanelHeading({ children, action }: PanelHeadingProps) {
  return (
    <div className="mb-1 flex items-center justify-between">
      <p className="text-sm font-medium text-black">{children}</p>
      {action}
    </div>
  );
}

/* ---------------------------------------------------------------
   Level 3 tab bar — Sell donation / Direct donation
   Indented and connected under "Donation" to read as a sub-branch.
--------------------------------------------------------------- */

type DonationTabKey = "sell" | "direct";

function DonationView() {
  const [active, setActive] = useState<DonationTabKey>("sell");

  const tabs: TabItem[] = [
    { key: "sell", label: "Sell donation", icon: Package },
    { key: "direct", label: "Direct donation", icon: HeartHandshake },
  ];

  return (
    <div className="ml-4 border-l border-black/15 pl-4">
      <div className="mb-4 flex gap-5">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key as DonationTabKey)}
              className={`flex items-center gap-1.5 border-b-2 pb-2 cursor-pointer px-1 text-sm transition-colors ${isActive
                ? "border-black font-medium text-black"
                : "border-transparent text-black/40 hover:text-black/70"
                }`}
            >
              <Icon size={15} strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </div>
      {active === "sell" ? <SellDonationPanel /> : <DirectDonationPanel />}
    </div>
  );
}

type EarningsTabKey = "seller" | "donation";

function EarningsView({ showPanel }: { showPanel?: EarningsTabKey }) {
  const [active, setActive] = useState<EarningsTabKey>(showPanel ?? "seller");

  const tabs: TabItem[] = [
    { key: "seller", label: "Sells Earnings", icon: Store },
    { key: "donation", label: "Donation", icon: Gift },
  ];

  return (
    <div>
      {!showPanel && <div className="mb-5 inline-flex gap-3 rounded">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key as EarningsTabKey)}
              className={`flex items-center gap-1.5 rounded-full px-3 cursor-pointer py-1.5 text-sm transition-colors border border-black/15 ${isActive
                ? "bg-black font-medium text-white border-black"
                : "text-black/50 hover:text-black"
                }`}
            >
              <Icon size={15} strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </div>}
      {active === "seller" ? <SellerEarningPanel /> : <DonationView />}
    </div>
  );
}

/* ---------------------------------------------------------------
   Level 1 tab bar — Earnings / Payouts (root)
--------------------------------------------------------------- */

type RootTabKey = "earnings" | "payouts";

export default function EarningsPayoutsTabs({ showPanel }: { showPanel?: EarningsTabKey }) {
  const [active, setActive] = useState<RootTabKey>("earnings");

  const tabs: TabItem[] = [
    { key: "earnings", label: "Earnings", icon: Wallet },
    { key: "payouts", label: "Payouts", icon: Banknote },
  ];

  return (
    <div className="">
      <h1 className="mb-5 text-lg font-semibold text-black">
        Earnings &amp; Payouts
      </h1>

      <div className="mb-6 flex gap-8 border-b border-black/10">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key as RootTabKey)}
              className={`flex items-center gap-1.5 border-b-2 pb-3 px-1 text-base cursor-pointer transition-colors ${isActive
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

      {active === "earnings" ? (
        <EarningsView showPanel={showPanel} />
      ) : (
        <Payouts />
      )}
    </div>
  );
}