"use client";
import { getDiscountById } from "@/data/discounts";
import { DiscountDetails } from "@/types/discount";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

function useDiscount(id: number, startDate?: string, endDate?: string) {
  const fetchFn = useCallback(
    async () =>
      getDiscountById({
        id,
        startDate,
        endDate,
      }),
    [id, startDate, endDate],
  );
  const queryData = useQuery<DiscountDetails>({
    queryKey: ["discount", id, startDate, endDate],
    queryFn: fetchFn,
    enabled: !!id,
  });
  return queryData;
}
export default useDiscount;
