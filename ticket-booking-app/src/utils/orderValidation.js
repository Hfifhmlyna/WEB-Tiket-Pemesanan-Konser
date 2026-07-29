function validateOrderPayload(payload, products = []) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return {
      isValid: false,
      errors: ["Payload must be an object."]
    };
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    errors.push("items is required and must contain at least one item.");
  }

  if (!payload.paymentMethod) {
    errors.push("paymentMethod is required.");
  }

  const allowedPaymentMethods = ["card", "virtual_account", "ewallet"];
  if (
    payload.paymentMethod &&
    !allowedPaymentMethods.includes(payload.paymentMethod)
  ) {
    errors.push(
      `paymentMethod must be one of: ${allowedPaymentMethods.join(", ")}.`
    );
  }

  if (Array.isArray(payload.items)) {
    payload.items.forEach((item, index) => {
      if (!item || typeof item !== "object") {
        errors.push(`items[${index}] must be an object.`);
        return;
      }

      if (!item.id) {
        errors.push(`items[${index}].id is required.`);
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        errors.push(`items[${index}].quantity must be a positive integer.`);
      }

      const product = products.find((entry) => entry.id === item.id);
      if (!product) {
        errors.push(`items[${index}].id references an unknown product.`);
        return;
      }

      if (item.quantity > product.stock) {
        errors.push(
          `items[${index}] exceeds stock for ${product.name}. Requested ${item.quantity}, available ${product.stock}.`
        );
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateOrderPayload
};
