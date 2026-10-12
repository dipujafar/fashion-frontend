// useCurrency.ts
import { selectRates, selectUser } from "@/redux/features/rateSlice";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

type CurrencyCode = "GBP" | "EUR" | "USD";

interface FormatOptions {
  /** Override the user's currency */
  currency?: CurrencyCode;
  /** Decimal places (default 2) */
  decimals?: number;
  /** Return only the converted number, no symbol */
  raw?: boolean;
}

export const useCurrency = () => {
  const rates = useSelector(selectRates);
  const user = useSelector(selectUser);

  const code: CurrencyCode = user.rate;
  const symbol = rates[code].currency;

  /** Convert a USD amount to the target currency (number only) */
  const convert = useCallback(
    (usdAmount: number, target: CurrencyCode = code): number => {
      if (target === "USD") return usdAmount;
      return usdAmount * rates[target].rate;
    },
    [rates, code]
  );

  /** Convert and format with symbol: 100 -> "£79.00" */
  const format = useCallback(
    (usdAmount: number, options: FormatOptions = {}): string => {
      const { currency = code, decimals = 2, raw = false } = options;
      const value = convert(usdAmount, currency);

      const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);

      return raw ? formatted : `${rates[currency].currency}${formatted}`;
    },
    [convert, rates, code]
  );

  return useMemo(
    () => ({ convert, format, symbol, code, country: user.country }),
    [convert, format, symbol, code, user.country]
  );
};