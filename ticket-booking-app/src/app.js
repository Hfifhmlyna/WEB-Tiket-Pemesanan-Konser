const express = require("express");
const path = require("path");
const cors = require("cors");

const {
  USER_ROLES,
  login,
  requireAuth,
  requireRole
} = require("./controllers/authController");
const { listProducts } = require("./controllers/productController");
const { checkout, listOrders, listAllOrders } = require("./controllers/orderController");
const {
  listTicketHistory,
  saveTicketHistory
} = require("./controllers/ticketHistoryController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ticket-booking-app",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/auth/login", login);
app.get("/api/products", listProducts);
app.get("/api/orders", requireAuth, requireRole(USER_ROLES.CUSTOMER), listOrders);
app.post(
  "/api/orders/checkout",
  requireAuth,
  requireRole(USER_ROLES.CUSTOMER),
  checkout
);
app.get("/api/admin/orders", requireAuth, requireRole(USER_ROLES.ADMIN), listAllOrders);
app.get("/api/tickets/history", listTicketHistory);
app.post("/api/tickets/history", saveTicketHistory);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found."
  });
});

module.exports = app;
