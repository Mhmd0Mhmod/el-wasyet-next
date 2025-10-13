enum OrderAction {
  // Pending Orders Actions
  NEW_ORDER = "new order",
  CANCEL = "cancel",
  REFUND = "refund",

  // New Orders Actions
  ASK_EXPENSES = "ask expenses",

  // Collection Done Actions
  UNDER_PROCESSING = "under processing",
  STEFA_CLIENT = "stefa client",
  STEFA_CERTIFICATE = "stefa certificate",
  RETURN = "return",

  // Under Processing Actions
  COMPLETED = "completed",
  STEFA_SGL = "stefa sgl",

  // Completed Orders Actions
  CONTACTED = "contacted",

  // Receiving Orders Actions
  SEND_CODE = "send code",
  WRITE_CODE = "write code",
  RECEIVING_DONE = "receiving done",

  // SGL Actions
  COLLECTION_DONE = "collection done",
}

export { OrderAction };
