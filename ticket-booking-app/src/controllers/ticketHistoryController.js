const {
  listTicketHistoryByOwner,
  upsertTicketHistory
} = require("../repositories/ticketHistoryRepository");

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeOrderStatus(status) {
  const normalizedStatus = String(status || "").trim().toUpperCase();

  if (!normalizedStatus || normalizedStatus === "DRAFT") {
    return "PAID";
  }

  return normalizedStatus;
}

function normalizeSeatCategory(value) {
  return String(value || "CAT 1")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

function normalizeItem(item) {
  const id = String(item && item.id ? item.id : "").trim();
  const quantity = Number(item && item.quantity ? item.quantity : 0);

  if (!id || !Number.isFinite(quantity) || quantity <= 0) {
    return null;
  }

  const price = Number(item && item.price ? item.price : 0);
  const subtotal = Number(item && item.subtotal ? item.subtotal : price * quantity);
  const seatCategory = normalizeSeatCategory(item && item.seatCategory ? item.seatCategory : "CAT 1");
  const seatPrefix = String(
    item && item.seatPrefix ? item.seatPrefix : seatCategory === "CAT 2" ? "B" : "A"
  )
    .trim()
    .toUpperCase();
  const seatCategoryStock = Math.max(
    0,
    Number(item && item.seatCategoryStock ? item.seatCategoryStock : 0)
  );
  const assignedSeats = Array.isArray(item && item.assignedSeats)
    ? item.assignedSeats.map((seat) => String(seat || "").trim()).filter((seat) => seat)
    : [];

  return {
    id,
    name: String(item && item.name ? item.name : "Ticket"),
    artist: String(item && item.artist ? item.artist : "Artist"),
    category: String(item && item.category ? item.category : "Konser"),
    date: String(item && item.date ? item.date : "TBA"),
    venue: String(item && item.venue ? item.venue : "Lokasi belum ditentukan"),
    area: String(item && item.area ? item.area : "Indonesia"),
    price: Number.isFinite(price) ? price : 0,
    quantity,
    subtotal: Number.isFinite(subtotal) ? subtotal : 0,
    seatCategory,
    seatPrefix,
    seatCategoryStock,
    assignedSeats
  };
}

function normalizeTicketPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const orderId = String(payload.orderId || "").trim();
  const ownerUsername = normalizeUsername(payload.ownerUsername);
  const items = (Array.isArray(payload.items) ? payload.items : [])
    .map((item) => normalizeItem(item))
    .filter((item) => Boolean(item));

  if (!orderId || !ownerUsername || items.length === 0) {
    return null;
  }

  const rawIssuedAt = String(payload.issuedAt || "").trim();
  const issuedAtTime = new Date(rawIssuedAt).getTime();
  const issuedAt = Number.isNaN(issuedAtTime)
    ? new Date().toISOString()
    : new Date(issuedAtTime).toISOString();

  const computedTotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalAmount = Number(payload.totalAmount || computedTotal);

  return {
    orderId,
    status: normalizeOrderStatus(payload.status),
    issuedAt,
    ownerUsername,
    buyer: {
      recipientName: String(payload.buyer && payload.buyer.recipientName ? payload.buyer.recipientName : "-"),
      address: String(payload.buyer && payload.buyer.address ? payload.buyer.address : "-"),
      phone: String(payload.buyer && payload.buyer.phone ? payload.buyer.phone : "-")
    },
    items,
    totalAmount: Number.isFinite(totalAmount) ? totalAmount : computedTotal
  };
}

async function listTicketHistory(req, res) {
  const ownerUsername = normalizeUsername(req.query.username);

  if (!ownerUsername) {
    return res.status(400).json({
      message: "username query is required."
    });
  }

  try {
    const history = (await listTicketHistoryByOwner(ownerUsername))
      .map((ticket) => normalizeTicketPayload(ticket))
      .filter((ticket) => Boolean(ticket) && normalizeUsername(ticket.ownerUsername) === ownerUsername)
      .sort((ticketA, ticketB) => {
        const timeA = new Date(ticketA.issuedAt || 0).getTime();
        const timeB = new Date(ticketB.issuedAt || 0).getTime();
        return timeB - timeA;
      });

    return res.json({
      data: history
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to load ticket history."
    });
  }
}

async function saveTicketHistory(req, res) {
  const payload = req.body && req.body.ticket ? req.body.ticket : req.body;
  const ticket = normalizeTicketPayload(payload);

  if (!ticket) {
    return res.status(400).json({
      message: "Invalid ticket payload."
    });
  }

  try {
    await upsertTicketHistory(ticket);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save ticket history."
    });
  }

  return res.status(201).json({
    message: "Ticket history saved.",
    data: ticket
  });
}

module.exports = {
  listTicketHistory,
  saveTicketHistory
};
