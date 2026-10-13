"use client";

import { useCurrency } from "@/hooks/useCurrency";

interface FormatCurrencyProps {
  amount?: number | string | null;
  decimals?: number;
  className?: string;
}

export default function FormatCurrency({
  amount,
  decimals = 2,
  className,
}: FormatCurrencyProps) {
  const { format } = useCurrency();
  const formatted = format(amount, { decimals });

  if (className) {
    return <span className={className}>{formatted}</span>;
  }

  return <>{formatted}</>;
}

