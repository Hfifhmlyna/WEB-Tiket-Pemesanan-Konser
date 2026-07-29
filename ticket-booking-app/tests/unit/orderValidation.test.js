const { validateOrderPayload } = require("../../src/utils/orderValidation");

describe("validateOrderPayload", () => {
  const products = [
    { id: "TKT-001", name: "Sample A", stock: 10 },
    { id: "TKT-002", name: "Sample B", stock: 5 }
  ];

  test("returns valid result for a correct payload", () => {
    const payload = {
      paymentMethod: "card",
      items: [
        { id: "TKT-001", quantity: 2 },
        { id: "TKT-002", quantity: 1 }
      ]
    };

    const result = validateOrderPayload(payload, products);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test("returns errors for unknown product and invalid quantity", () => {
    const payload = {
      paymentMethod: "cash",
      items: [
        { id: "TKT-999", quantity: 1 },
        { id: "TKT-001", quantity: 0 }
      ]
    };

    const result = validateOrderPayload(payload, products);

    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
