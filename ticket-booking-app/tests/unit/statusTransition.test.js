const {
  canTransitionStatus,
  transitionStatus
} = require("../../src/utils/statusTransition");

describe("statusTransition", () => {
  test("allows valid transition from PENDING to PAID", () => {
    expect(canTransitionStatus("PENDING", "PAID")).toBe(true);
  });

  test("rejects invalid transition from PENDING to COMPLETED", () => {
    expect(canTransitionStatus("PENDING", "COMPLETED")).toBe(false);
  });

  test("throws when transition is invalid", () => {
    const order = { status: "PENDING" };

    expect(() => transitionStatus(order, "ISSUED")).toThrow(
      "Invalid status transition from PENDING to ISSUED."
    );
  });
});
