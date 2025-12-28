// All ability IDs
export const ABILITY_IDS = {
  // Branches
  CREATE_BRANCH: 1,
  UPDATE_BRANCH: 2,
  DELETE_BRANCH: 3,
  VIEW_BRANCHES: 4,

  // Employees
  CREATE_EMPLOYEE: 5,
  UPDATE_EMPLOYEE: 6,
  DELETE_EMPLOYEE: 7,
  VIEW_EMPLOYEES: 8,

  // Clients
  CREATE_CLIENT: 9,
  UPDATE_CLIENT: 10,
  DELETE_CLIENT: 11,
  VIEW_CLIENTS: 12,

  // Main Number
  UPDATE_MAIN_NUMBER: 13,

  // Services
  CREATE_SERVICE: 14,
  UPDATE_SERVICE: 15,
  DELETE_SERVICE: 16,
  VIEW_SERVICES: 17,

  // Expenses
  CREATE_EXPENSE: 18,
  UPDATE_EXPENSE: 19,
  DELETE_EXPENSE: 20,
  VIEW_EXPENSES: 21,

  // Discounts
  CREATE_DISCOUNT: 22,
  UPDATE_DISCOUNT: 23,
  DELETE_DISCOUNT: 24,
  VIEW_DISCOUNTS: 25,

  // Orders
  CREATE_ORDER: 26,
  UPDATE_ORDER: 27,
  DELETE_ORDER: 28,
  VIEW_ORDERS: 29,

  // Agents
  CREATE_AGENT: 30,
  VIEW_AGENTS: 31,
  UPDATE_AGENT: 32,
  DELETE_AGENT: 33,

  // Reports
  VIEW_EXECUTIVE_REPORT: 34,
  VIEW_DAILY_DETAILS_REPORT: 35,
  VIEW_DAILY_REPORT: 36,

  // Order Logs
  VIEW_PENDING_ORDERS: 37,
  VIEW_NEW_ORDERS: 38,
  VIEW_PENDING_CERTIFICATES: 39,
  VIEW_NEW_CERTIFICATES: 40,
  VIEW_COLLECTED: 41,
  VIEW_IN_PROGRESS: 42,
  VIEW_COMPLETED_ORDERS: 43,
  VIEW_ORDER_RECEIPT: 44,

  // Fulfillment
  VIEW_CLIENT_FULFILLMENT: 45,
  VIEW_FULFILLMENT: 46,
  VIEW_CERTIFICATE_FULFILLMENT: 47,

  // Custody
  MANAGE_CUSTODY: 48,
  VIEW_STOCK: 49,

  // Dashboard
  VIEW_DASHBOARD: 50,

  // Commissions
  MANAGE_COMMISSIONS: 51,

  // Cash Box
  VIEW_CASH_BOX: 53,
  // Transfers
  VIEW_TRANSFERS: 54,
} as const;

// Check if user has a specific ability
export function can(userAbilities: number[], abilityId: number): boolean {
  return userAbilities.includes(abilityId);
}
