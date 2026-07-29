const ORDER_STATUS_FLOW = {
  PENDING: ["PAID", "CANCELLED"],
  PAID: ["ISSUED", "REFUNDED"],
  ISSUED: ["COMPLETED", "REFUNDED"],
  COMPLETED: [],
  CANCELLED: [],
  REFUNDED: []
};

function canTransitionStatus(currentStatus, nextStatus) {
  if (!ORDER_STATUS_FLOW[currentStatus]) {
    return false;
  }

  return ORDER_STATUS_FLOW[currentStatus].includes(nextStatus);
}

function transitionStatus(order, nextStatus) {
  if (!order || !order.status) {
    throw new Error("Order payload is invalid.");
  }

  if (!canTransitionStatus(order.status, nextStatus)) {
    throw new Error(
      `Invalid status transition from ${order.status} to ${nextStatus}.`
    );
  }

  return nextStatus;
}

module.exports = {
  ORDER_STATUS_FLOW,
  canTransitionStatus,
  transitionStatus
};
