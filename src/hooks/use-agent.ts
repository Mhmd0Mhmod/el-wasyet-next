"use client";
import { getAgentDetailsById } from "@/data/agents";
import { AgentDetials } from "@/types/agent";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

function useAgent(id: number, startDate?: string, endDate?: string) {
  const fetchFn = useCallback(
    async () =>
      getAgentDetailsById({
        id,
        startDate,
        endDate,
      }),
    [id, startDate, endDate],
  );
  const queryData = useQuery<AgentDetials>({
    queryKey: ["agent", id, startDate, endDate],
    queryFn: fetchFn,
    enabled: !!id,
  });
  return queryData;
}
export default useAgent;
