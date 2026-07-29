const { validateOrderPayload } = require("../utils/orderValidation");
const { transitionStatus } = require("../utils/statusTransition");
const { getProducts, findProductById } = require("./productController");

const orders = [];
let runningOrderNumber = 1;

function toCurrencyAmount(value) {
  return Number(value.toFixed(2));
}

function buildOrderItems(items) {
  return items.map((item) => {
    const product = findProductById(item.id);
    const subtotal = product.price * item.quantity;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal
    };
  });
}

function checkout(req, res) {
  const payload = req.body || {};
  const products = getProducts();
  const validation = validateOrderPayload(payload, products);

  if (!validation.isValid) {
    return res.status(400).json({
      message: "Order validation failed.",
      errors: validation.errors
    });
  }

  const items = buildOrderItems(payload.items);
  const totalAmount = toCurrencyAmount(
    items.reduce((total, item) => total + item.subtotal, 0)
  );

  const order = {
    id: `ORD-${String(runningOrderNumber).padStart(4, "0")}`,
    userId: req.user.id,
    customerName: payload.customerName || req.user.name,
    paymentMethod: payload.paymentMethod,
    status: "PENDING",
    items,
    totalAmount,
    createdAt: new Date().toISOString()
  };

  runningOrderNumber += 1;

  // Simulate direct payment capture in this starter app.
  order.status = transitionStatus(order, "PAID");

  orders.push(order);

  return res.status(201).json({
    message: "Checkout successful.",
    data: order
  });
}

function listOrders(req, res) {
  const ownOrders = orders.filter((order) => order.userId === req.user.id);

  return res.json({
    data: ownOrders
  });
}

module.exports = {
  checkout,
  listOrders,
  orders
};
