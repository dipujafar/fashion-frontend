"use client";

import { setRate } from "@/redux/features/rateSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";

type Props = {
  rates: {
    base: string;
    quote: string;
    rate: number;
  }[];
};

export default function SetRates({ rates }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (rates.length > 0) {
      dispatch(setRate({ rates }));
    }
  }, [dispatch, rates]);

  return null;
}