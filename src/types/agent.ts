import { Agent } from "./order";

export interface AgentDetials extends Agent {
  transactions: AgentTransaction[];
  totalCommission: number;
}
export type AgentTransaction = {
  id: number;
  agentId: number;
  agentName: string;
  orderId: number;
  orderCode: string;
  commissionAmount: number;
  transactionDate: string;
};
