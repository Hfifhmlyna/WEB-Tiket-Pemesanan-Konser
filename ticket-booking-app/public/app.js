const STORAGE_KEYS = {
  session: "ticketApp.session",
  cart: "ticketApp.cart",
  orderSequence: "ticketApp.orderSequence",
  users: "ticketApp.users",
  lastTicket: "ticketApp.lastTicket",
  ticketHistory: "ticketApp.ticketHistory",
  seatProgress: "ticketApp.seatProgress"
};

const DEMO_CUSTOMER_USER = {
  username: "user@mail.com",
  password: "password123",
  displayName: "user@mail.com",
  role: "customer"
};

const ADMIN_USER = {
  username: "admin@ticketapp.local",
  password: "admin123",
  displayName: "Admin Ticket",
  role: "admin"
};

const USER_ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer"
};

const ORDER_STATUS = "PAID";

const CATEGORY_LABELS = {
  KPOP: "KPOP",
  TPOP: "TPOP",
  Concert: "Konser",
  Conference: "Seminar",
  Festival: "Festival",
  Theater: "Teater",
  Sport: "Olahraga",
  Convention: "Konvensi",
  Exhibition: "Pameran",
  Expo: "Expo",
  Family: "Keluarga",
  Cultural: "Budaya",
  Lifestyle: "Gaya Hidup"
};

const DEFAULT_ARTIST_IMAGE =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80";

const FALLBACK_TICKETS = [
  {
    id: "TKT-001",
    name: "NCT Neo City Jakarta",
    artist: "NCT",
    category: "KPOP",
    date: "2026-08-15",
    price: 1350000,
    stock: 18,
    venue: "Indonesia Arena",
    area: "Senayan, Jakarta",
    artistImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "TKT-002",
    name: "NCT DREAMS The Future Surabaya",
    artist: "NCT DREAMS",
    category: "KPOP",
    date: "2026-08-22",
    price: 1200000,
    stock: 22,
    venue: "Jatim Expo Hall",
    area: "Wonocolo, Surabaya",
    artistImage:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "TKT-003",
    name: "EXO Elysium Reunion Bandung",
    artist: "EXO",
    category: "KPOP",
    date: "2026-09-05",
    price: 1280000,
    stock: 16,
    venue: "GBLA Indoor Dome",
    area: "Gedebage, Bandung",
    artistImage:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "TKT-004",
    name: "ATLAS Live in Yogyakarta",
    artist: "ATLAS",
    category: "TPOP",
    date: "2026-09-12",
    price: 640000,
    stock: 24,
    venue: "Jogja Expo Center",
    area: "Banguntapan, Bantul",
    artistImage:
      "https://images.unsplash.com/photo-1464375117522-1311dd6a6cd7?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "TKT-005",
    name: "LYKN First Impact Medan",
    artist: "LYKN",
    category: "TPOP",
    date: "2026-09-26",
    price: 690000,
    stock: 14,
    venue: "Santika Convention Hall",
    area: "Medan Petisah, Medan",
    artistImage:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "TKT-006",
    name: "JASPER Citylight Show Makassar",
    artist: "JASPER",
    category: "TPOP",
    date: "2026-10-03",
    price: 560000,
    stock: 26,
    venue: "Celebes Convention Center",
    area: "Panakkukang, Makassar",
    artistImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "TKT-007",
    name: "NCT DREAMS Encore Jakarta",
    artist: "NCT DREAMS",
    category: "KPOP",
    date: "2026-10-10",
    price: 1180000,
    stock: 17,
    venue: "ICE BSD Hall 5",
    area: "Pagedangan, Tangerang",
    artistImage:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "TKT-008",
    name: "JASPER x ATLAS Year End Show",
    artist: "JASPER x ATLAS",
    category: "TPOP",
    date: "2026-10-17",
    price: 730000,
    stock: 19,
    venue: "Sentul International Convention Center",
    area: "Babakan Madang, Bogor",
    artistImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80"
  }
];

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function showAlert(alertElement, type, message) {
  if (!alertElement) {
    return;
  }

  alertElement.classList.remove("d-none", "alert-success", "alert-danger", "alert-warning", "alert-info");
  alertElement.classList.add(`alert-${type}`);
  alertElement.textContent = message;
}

function hideAlert(alertElement) {
  if (!alertElement) {
    return;
  }

  alertElement.classList.add("d-none");
  alertElement.textContent = "";
}

function redirectTo(path) {
  window.location.href = path;
}

function getSession() {
  return readJSON(STORAGE_KEYS.session, null);
}

function setSession(session) {
  writeJSON(STORAGE_KEYS.session, session);
}

function normalizeUsername(username) {
  return String(username || "").trim().toLowerCase();
}

function normalizeUserRole(role) {
  return String(role || "").trim().toLowerCase() === USER_ROLES.ADMIN
    ? USER_ROLES.ADMIN
    : USER_ROLES.CUSTOMER;
}

function getRoleLabel(role) {
  return normalizeUserRole(role) === USER_ROLES.ADMIN ? "Admin" : "Pemesan";
}

function resolveLandingPageByRole(role) {
  return normalizeUserRole(role) === USER_ROLES.ADMIN
    ? "./admin.html"
    : "./products.html";
}

function isAdminSession(session = getSession()) {
  return normalizeUserRole(session && session.role ? session.role : "") === USER_ROLES.ADMIN;
}

function ensureCustomerAccess() {
  const session = getSession();

  if (!session) {
    redirectTo("./index.html");
    return false;
  }

  if (isAdminSession(session)) {
    redirectTo("./admin.html");
    return false;
  }

  return true;
}

function ensureAdminAccess() {
  const session = getSession();

  if (!session) {
    redirectTo("./index.html");
    return false;
  }

  if (!isAdminSession(session)) {
    redirectTo("./products.html");
    return false;
  }

  return true;
}

function buildDefaultUsers() {
  return [
    {
      username: DEMO_CUSTOMER_USER.username,
      password: DEMO_CUSTOMER_USER.password,
      displayName: DEMO_CUSTOMER_USER.displayName,
      role: USER_ROLES.CUSTOMER
    },
    {
      username: ADMIN_USER.username,
      password: ADMIN_USER.password,
      displayName: ADMIN_USER.displayName,
      role: USER_ROLES.ADMIN
    }
  ];
}

function getUsers() {
  const existingUsers = readJSON(STORAGE_KEYS.users, []);
  const normalizedUsers = [];
  const seenUsernames = new Set();
  const adminUsername = normalizeUsername(ADMIN_USER.username);

  if (Array.isArray(existingUsers)) {
    existingUsers.forEach((entry) => {
      const username = normalizeUsername(entry && entry.username ? entry.username : "");
      const password = String(entry && entry.password ? entry.password : "").trim();

      if (!username || !password || seenUsernames.has(username)) {
        return;
      }

      seenUsernames.add(username);
      normalizedUsers.push({
        username,
        password,
        displayName: String(
          entry && entry.displayName ? entry.displayName : username
        ),
        role: username === adminUsername
          ? USER_ROLES.ADMIN
          : normalizeUserRole(entry && entry.role ? entry.role : USER_ROLES.CUSTOMER)
      });
    });
  }

  buildDefaultUsers().forEach((defaultUser) => {
    const username = normalizeUsername(defaultUser.username);
    if (seenUsernames.has(username)) {
      return;
    }

    seenUsernames.add(username);
    normalizedUsers.push({
      username,
      password: defaultUser.password,
      displayName: defaultUser.displayName,
      role: normalizeUserRole(defaultUser.role)
    });
  });

  saveUsers(normalizedUsers);
  return normalizedUsers;
}

function saveUsers(users) {
  writeJSON(STORAGE_KEYS.users, users);
}

function findUserByUsername(username) {
  const normalized = normalizeUsername(username);
  return getUsers().find((user) => normalizeUsername(user.username) === normalized) || null;
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

function isLoggedIn() {
  return Boolean(getSession());
}

function ensureLoggedIn() {
  if (!isLoggedIn()) {
    redirectTo("./index.html");
    return false;
  }

  return true;
}

function normalizeSeatCategoryCode(rawCode) {
  return String(rawCode || "CAT 1")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

function buildSeatLabel(prefix, seatNumber) {
  const safePrefix = String(prefix || "A").trim().toUpperCase() || "A";
  const safeSeatNumber = Math.max(1, Number(seatNumber || 1));
  return `${safePrefix}${safeSeatNumber}`;
}

function buildSeatRangeLabel(seatCategory) {
  return `${buildSeatLabel(seatCategory.prefix, 1)}-${buildSeatLabel(
    seatCategory.prefix,
    seatCategory.stock
  )}`;
}

function buildSeatCategories(totalStock) {
  const safeStock = Math.max(1, Number(totalStock || 0));
  const cat1Stock = safeStock === 1 ? 1 : Math.max(1, Math.ceil(safeStock * 0.55));
  const cat2Stock = Math.max(0, safeStock - cat1Stock);
  const categories = [
    {
      code: "CAT 1",
      label: "CAT 1",
      prefix: "A",
      stock: cat1Stock
    }
  ];

  if (cat2Stock > 0) {
    categories.push({
      code: "CAT 2",
      label: "CAT 2",
      prefix: "B",
      stock: cat2Stock
    });
  }

  return categories;
}

function normalizeSeatCategories(rawSeatCategories, totalStock) {
  if (!Array.isArray(rawSeatCategories) || rawSeatCategories.length === 0) {
    return buildSeatCategories(totalStock);
  }

  const normalized = rawSeatCategories
    .map((entry, index) => {
      const code = normalizeSeatCategoryCode(entry.code || entry.label || `CAT ${index + 1}`);
      const prefix = String(entry.prefix || String.fromCharCode(65 + index)).trim().toUpperCase();
      const stock = Math.max(0, Number(entry.stock || 0));

      if (!code || !prefix || stock <= 0) {
        return null;
      }

      return {
        code,
        label: code,
        prefix,
        stock
      };
    })
    .filter((entry) => Boolean(entry));

  return normalized.length > 0 ? normalized : buildSeatCategories(totalStock);
}

function getSeatCategory(ticket, seatCategoryCode) {
  const normalizedCode = normalizeSeatCategoryCode(seatCategoryCode);
  const seatCategories = Array.isArray(ticket?.seatCategories) ? ticket.seatCategories : [];
  return seatCategories.find((entry) => normalizeSeatCategoryCode(entry.code) === normalizedCode) || null;
}

function buildCartItemKey(ticketId, seatCategoryCode) {
  return `${String(ticketId || "")}|${normalizeSeatCategoryCode(seatCategoryCode)}`;
}

function normalizeCartItem(cartItem) {
  if (!cartItem || typeof cartItem !== "object") {
    return null;
  }

  const id = String(cartItem.id || "").trim();
  const quantity = Number(cartItem.quantity || 0);
  if (!id || !Number.isInteger(quantity) || quantity <= 0) {
    return null;
  }

  const seatCategory = normalizeSeatCategoryCode(cartItem.seatCategory || "CAT 1");
  const seatPrefix = String(
    cartItem.seatPrefix || (seatCategory === "CAT 2" ? "B" : "A")
  )
    .trim()
    .toUpperCase();
  const seatCategoryStock = Math.max(
    0,
    Number(cartItem.seatCategoryStock || cartItem.stock || quantity)
  );

  return {
    id,
    name: String(cartItem.name || "Ticket"),
    artist: String(cartItem.artist || "Artist"),
    category: String(cartItem.category || "Konser"),
    date: String(cartItem.date || "TBA"),
    venue: String(cartItem.venue || "Lokasi belum ditentukan"),
    area: String(cartItem.area || "Indonesia"),
    artistImage: String(cartItem.artistImage || DEFAULT_ARTIST_IMAGE),
    price: Number(cartItem.price || 0),
    stock: Math.max(0, Number(cartItem.stock || seatCategoryStock)),
    quantity,
    seatCategory,
    seatPrefix,
    seatCategoryStock,
    assignedSeats: Array.isArray(cartItem.assignedSeats)
      ? cartItem.assignedSeats.map((seat) => String(seat || "").trim()).filter((seat) => seat)
      : []
  };
}

function getSeatProgress() {
  const rawProgress = readJSON(STORAGE_KEYS.seatProgress, {});
  return rawProgress && typeof rawProgress === "object" && !Array.isArray(rawProgress)
    ? rawProgress
    : {};
}

function setSeatProgress(progressData) {
  writeJSON(STORAGE_KEYS.seatProgress, progressData || {});
}

function getSoldSeatCount(ticketId, seatCategoryCode) {
  const seatProgress = getSeatProgress();
  const ticketProgress = seatProgress[String(ticketId || "")] || {};
  return Math.max(0, Number(ticketProgress[normalizeSeatCategoryCode(seatCategoryCode)] || 0));
}

function getReservedSeatCountInCart(cartItems, ticketId, seatCategoryCode, excludeCartKey = "") {
  const normalizedTicketId = String(ticketId || "");
  const normalizedSeatCategory = normalizeSeatCategoryCode(seatCategoryCode);

  return (Array.isArray(cartItems) ? cartItems : []).reduce((total, rawItem) => {
    const item = normalizeCartItem(rawItem);
    if (!item) {
      return total;
    }

    const cartKey = buildCartItemKey(item.id, item.seatCategory);
    if (excludeCartKey && cartKey === excludeCartKey) {
      return total;
    }

    if (item.id === normalizedTicketId && item.seatCategory === normalizedSeatCategory) {
      return total + item.quantity;
    }

    return total;
  }, 0);
}

function getRemainingSeatCountForCategory(
  ticket,
  seatCategoryCode,
  cartItems = getCart(),
  excludeCartKey = ""
) {
  const seatCategory = getSeatCategory(ticket, seatCategoryCode);
  if (!seatCategory) {
    return 0;
  }

  const soldSeats = getSoldSeatCount(ticket.id, seatCategory.code);
  const reservedSeats = getReservedSeatCountInCart(
    cartItems,
    ticket.id,
    seatCategory.code,
    excludeCartKey
  );

  return Math.max(0, seatCategory.stock - soldSeats - reservedSeats);
}

function buildAssignedSeats(prefix, startSeatNumber, quantity) {
  return Array.from({ length: quantity }, (_, index) =>
    buildSeatLabel(prefix, startSeatNumber + index)
  );
}

function allocateSeatsForCart(cartItems) {
  const seatProgress = getSeatProgress();
  const nextSeatProgress = JSON.parse(JSON.stringify(seatProgress));
  const allocatedItems = [];

  for (const rawItem of cartItems) {
    const item = normalizeCartItem(rawItem);
    if (!item) {
      return {
        ok: false,
        message: "Data kursi pada keranjang tidak valid."
      };
    }

    if (!nextSeatProgress[item.id]) {
      nextSeatProgress[item.id] = {};
    }

    const soldSeats = Math.max(0, Number(nextSeatProgress[item.id][item.seatCategory] || 0));
    const nextSoldSeats = soldSeats + item.quantity;

    if (nextSoldSeats > item.seatCategoryStock) {
      return {
        ok: false,
        message: `Kursi ${item.seatCategory} untuk ${item.name} tersisa ${Math.max(
          item.seatCategoryStock - soldSeats,
          0
        )}.`
      };
    }

    const assignedSeats = buildAssignedSeats(item.seatPrefix, soldSeats + 1, item.quantity);
    nextSeatProgress[item.id][item.seatCategory] = nextSoldSeats;
    allocatedItems.push({
      ...item,
      assignedSeats
    });
  }

  return {
    ok: true,
    items: allocatedItems,
    nextSeatProgress
  };
}

function getCart() {
  const rawCart = readJSON(STORAGE_KEYS.cart, []);
  if (!Array.isArray(rawCart)) {
    return [];
  }

  return rawCart
    .map((item) => normalizeCartItem(item))
    .filter((item) => Boolean(item));
}

function setCart(cart) {
  writeJSON(STORAGE_KEYS.cart, cart);
}

function clearCart() {
  setCart([]);
}

function setLastTicket(ticketData) {
  writeJSON(STORAGE_KEYS.lastTicket, ticketData);
}

function getLastTicket() {
  return readJSON(STORAGE_KEYS.lastTicket, null);
}

function getTicketHistory() {
  const history = readJSON(STORAGE_KEYS.ticketHistory, []);
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .map((ticket) => normalizeHistoryTicket(ticket))
    .filter((ticket) => Boolean(ticket));
}

function setTicketHistory(history) {
  writeJSON(STORAGE_KEYS.ticketHistory, history);
}

function appendTicketHistory(ticketData) {
  const normalizedTicket = normalizeHistoryTicket(ticketData);
  if (!normalizedTicket) {
    return;
  }

  const history = getTicketHistory();
  const nextHistory = [normalizedTicket, ...history];
  const deduplicated = [];
  const seenKeys = new Set();

  nextHistory.forEach((ticket) => {
    const key = `${normalizeUsername(ticket.ownerUsername || "")}|${ticket.orderId || ""}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      deduplicated.push(ticket);
    }
  });

  setTicketHistory(deduplicated.slice(0, 100));
}

function getUserTicketHistory(username) {
  const normalizedUser = normalizeUsername(username);
  return getTicketHistory().filter(
    (ticket) => normalizeUsername(ticket.ownerUsername || "") === normalizedUser
  );
}

async function syncUserTicketHistoryFromBackend(username) {
  const backendTickets = await fetchUserTicketHistoryFromBackend(username);
  backendTickets.forEach((ticket) => {
    appendTicketHistory(ticket);
  });

  return sortTicketsByIssuedAtDesc(getUserTicketHistory(username));
}

function buildTicketQrPayload(ticket) {
  const owner = normalizeUsername(ticket.ownerUsername || "guest");
  const issuedAt = String(ticket.issuedAt || "");
  const totalAmount = Number(ticket.totalAmount || 0);
  return `ETICKET|${ticket.orderId || "-"}|${owner}|${issuedAt}|${totalAmount}`;
}

function buildTicketQrUrl(ticket) {
  const payload = encodeURIComponent(buildTicketQrPayload(ticket));
  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=0&data=${payload}`;
}

function getStatusBadgeClass(status) {
  const normalizedStatus = normalizeOrderStatus(status);

  if (["PAID", "ISSUED", "COMPLETED"].includes(normalizedStatus)) {
    return "text-bg-success";
  }

  if (normalizedStatus === "PENDING") {
    return "text-bg-warning text-dark";
  }

  if (["CANCELLED", "REFUNDED"].includes(normalizedStatus)) {
    return "text-bg-danger";
  }

  return "text-bg-secondary";
}

function normalizeOrderStatus(status) {
  const normalizedStatus = String(status || "").trim().toUpperCase();

  if (!normalizedStatus || normalizedStatus === "DRAFT") {
    return ORDER_STATUS;
  }

  return normalizedStatus;
}

function normalizeHistoryTicket(ticketData) {
  if (!ticketData || typeof ticketData !== "object") {
    return null;
  }

  const orderId = String(ticketData.orderId || "").trim();
  const ownerUsername = normalizeUsername(ticketData.ownerUsername || "");
  const rawItems = Array.isArray(ticketData.items) ? ticketData.items : [];

  const items = rawItems
    .map((item) => ({
      id: String(item.id || ""),
      name: String(item.name || "Ticket"),
      artist: String(item.artist || "Artist"),
      category: String(item.category || "Konser"),
      date: String(item.date || "TBA"),
      venue: String(item.venue || "Lokasi belum ditentukan"),
      area: String(item.area || "Indonesia"),
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 0),
      subtotal: Number(item.subtotal || Number(item.price || 0) * Number(item.quantity || 0)),
      seatCategory: normalizeSeatCategoryCode(item.seatCategory || "CAT 1"),
      seatPrefix: String(
        item.seatPrefix ||
          (normalizeSeatCategoryCode(item.seatCategory || "CAT 1") === "CAT 2" ? "B" : "A")
      )
        .trim()
        .toUpperCase(),
      seatCategoryStock: Math.max(0, Number(item.seatCategoryStock || 0)),
      assignedSeats: Array.isArray(item.assignedSeats)
        ? item.assignedSeats.map((seat) => String(seat || "").trim()).filter((seat) => seat)
        : []
    }))
    .filter((item) => item.id && item.quantity > 0);

  if (!orderId || !ownerUsername || items.length === 0) {
    return null;
  }

  const issuedAtRaw = String(ticketData.issuedAt || "").trim();
  const issuedAtTime = new Date(issuedAtRaw).getTime();
  const issuedAt = Number.isNaN(issuedAtTime) ? new Date().toISOString() : new Date(issuedAtTime).toISOString();
  const totalAmount = Number(ticketData.totalAmount || items.reduce((sum, item) => sum + item.subtotal, 0));

  return {
    orderId,
    status: normalizeOrderStatus(ticketData.status),
    issuedAt,
    ownerUsername,
    buyer: {
      recipientName: String(ticketData.buyer?.recipientName || "-"),
      address: String(ticketData.buyer?.address || "-"),
      phone: String(ticketData.buyer?.phone || "-")
    },
    items,
    totalAmount
  };
}

async function persistTicketToBackend(ticketData) {
  const normalizedTicket = normalizeHistoryTicket(ticketData);
  if (!normalizedTicket) {
    return false;
  }

  const response = await fetch("/api/tickets/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ticket: normalizedTicket
    })
  });

  if (!response.ok) {
    throw new Error("Gagal menyimpan tiket ke backend.");
  }

  return true;
}

async function fetchUserTicketHistoryFromBackend(username) {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) {
    return [];
  }

  const response = await fetch(
    `/api/tickets/history?username=${encodeURIComponent(normalizedUsername)}`
  );

  if (!response.ok) {
    throw new Error("Gagal memuat riwayat tiket dari backend.");
  }

  const result = await response.json();
  if (!Array.isArray(result.data)) {
    return [];
  }

  return result.data
    .map((ticket) => normalizeHistoryTicket(ticket))
    .filter((ticket) => Boolean(ticket));
}

function getCartItemCount() {
  return getCart().reduce((total, item) => total + Number(item.quantity || 0), 0);
}

function getCartGrandTotal() {
  return getCart().reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
}

function syncCartCounter() {
  const count = getCartItemCount();
  const counterElements = document.querySelectorAll("#cartCounter");

  counterElements.forEach((element) => {
    element.textContent = String(count);
  });
}

function syncLoginStatus() {
  const statusElement = document.getElementById("loginStatus");
  if (!statusElement) {
    return;
  }

  const session = getSession();
  statusElement.textContent = session
    ? `Login: ${session.displayName} (${getRoleLabel(session.role)})`
    : "Belum login";
}

function attachLogoutHandler() {
  const logoutButton = document.getElementById("btnLogout");
  if (!logoutButton) {
    return;
  }

  logoutButton.addEventListener("click", () => {
    clearSession();
    clearCart();
    redirectTo("./index.html");
  });
}

function normalizeTicket(item) {
  const rawCategory = String(item.category || "Umum");
  const stock = Number(item.stock || 0);

  return {
    id: String(item.id || ""),
    name: String(item.name || "Ticket"),
    artist: String(item.artist || "Artist"),
    category: CATEGORY_LABELS[rawCategory] || rawCategory,
    date: String(item.date || "TBA"),
    venue: String(item.venue || "Lokasi belum ditentukan"),
    area: String(item.area || "Indonesia"),
    artistImage: String(item.artistImage || DEFAULT_ARTIST_IMAGE),
    price: Number(item.price || 0),
    stock,
    seatCategories: normalizeSeatCategories(item.seatCategories, stock)
  };
}

async function loadTickets() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Produk gagal dimuat");
    }

    const result = await response.json();
    if (Array.isArray(result.data) && result.data.length > 0) {
      return result.data.map(normalizeTicket);
    }
  } catch (error) {
    return FALLBACK_TICKETS;
  }

  return FALLBACK_TICKETS;
}

function validateQuantityValue(rawValue, stock) {
  const qty = Number(rawValue);

  if (!Number.isFinite(qty) || !Number.isInteger(qty)) {
    return {
      isValid: false,
      message: "Jumlah beli harus berupa bilangan bulat."
    };
  }

  if (qty < 1) {
    return {
      isValid: false,
      message: "Jumlah beli minimal 1 tiket."
    };
  }

  if (qty > 10) {
    return {
      isValid: false,
      message: "Jumlah beli maksimal 10 tiket per item."
    };
  }

  if (qty > stock) {
    return {
      isValid: false,
      message: "Jumlah beli melebihi stok tiket yang tersedia."
    };
  }

  return {
    isValid: true,
    value: qty
  };
}

function addTicketToCart(ticket, quantity, seatCategoryCode) {
  const cart = getCart();
  const seatCategory = getSeatCategory(ticket, seatCategoryCode);

  if (!seatCategory) {
    return {
      ok: false,
      message: "Kategori kursi tidak valid. Pilih CAT 1 atau CAT 2."
    };
  }

  const cartKey = buildCartItemKey(ticket.id, seatCategory.code);
  const existingItem = cart.find(
    (item) => buildCartItemKey(item.id, item.seatCategory) === cartKey
  );

  const remainingSeats = getRemainingSeatCountForCategory(
    ticket,
    seatCategory.code,
    cart,
    cartKey
  );
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const nextQuantity = currentQuantity + quantity;
  const maxQtyForLine = remainingSeats;
  const validation = validateQuantityValue(nextQuantity, maxQtyForLine);

  if (!validation.isValid) {
    return {
      ok: false,
      message: `${validation.message} (Sisa ${seatCategory.code}: ${remainingSeats} kursi)`
    };
  }

  if (existingItem) {
    existingItem.quantity = validation.value;
    existingItem.seatCategoryStock = seatCategory.stock;
    existingItem.seatPrefix = seatCategory.prefix;
  } else {
    cart.push({
      id: ticket.id,
      name: ticket.name,
      artist: ticket.artist,
      category: ticket.category,
      date: ticket.date,
      venue: ticket.venue,
      area: ticket.area,
      artistImage: ticket.artistImage,
      price: ticket.price,
      stock: ticket.stock,
      seatCategory: seatCategory.code,
      seatPrefix: seatCategory.prefix,
      seatCategoryStock: seatCategory.stock,
      quantity: validation.value
    });
  }

  setCart(cart);
  return {
    ok: true,
    seatCategory: seatCategory.code
  };
}

function renderProducts(products, gridElement) {
  const cartItems = getCart();

  gridElement.innerHTML = products
    .map((ticket) => {
      const seatOptions = ticket.seatCategories.map((seatCategory) => {
        const remainingSeats = getRemainingSeatCountForCategory(
          ticket,
          seatCategory.code,
          cartItems
        );

        return {
          ...seatCategory,
          remainingSeats
        };
      });

      const availableOption =
        seatOptions.find((option) => option.remainingSeats > 0) || seatOptions[0];
      const hasSeatAvailability = seatOptions.some((option) => option.remainingSeats > 0);

      const seatCategoryOptions = seatOptions
        .map(
          (option) => `
                <option value="${option.code}" ${
            availableOption && option.code === availableOption.code ? "selected" : ""
          } ${option.remainingSeats === 0 ? "disabled" : ""}>
                  ${option.label} | Sisa ${option.remainingSeats} kursi
                </option>
              `
        )
        .join("");

      const seatLegend = seatOptions
        .map(
          (option) =>
            `${option.label}: ${buildSeatRangeLabel(option)} (Sisa ${option.remainingSeats})`
        )
        .join("<br />");

      return `
      <div class="col-12 col-md-6 col-xl-4" id="ticket-${ticket.id}">
        <article class="card ticket-card h-100">
          <div
            class="artist-photo-bg"
            style="background-image: url('${ticket.artistImage}');"
            aria-hidden="true"
          ></div>
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-2 gap-2">
              <span class="badge text-bg-primary" id="ticketCategory-${ticket.id}">${ticket.category}</span>
              <span class="badge text-bg-warning text-dark" id="ticketStock-${ticket.id}">Stok: ${ticket.stock}</span>
            </div>

            <p class="small fw-semibold mb-1" id="ticketArtist-${ticket.id}">Artis: ${ticket.artist}</p>

            <h3 class="h5 fw-bold mb-1" id="ticketName-${ticket.id}">${ticket.name}</h3>
            <p class="small text-secondary mb-2">Tanggal event: ${ticket.date}</p>
            <p class="small text-secondary mb-1" id="ticketVenue-${ticket.id}">Lokasi: ${ticket.venue}</p>
            <p class="small text-secondary mb-2" id="ticketArea-${ticket.id}">Daerah: ${ticket.area}</p>
            <p class="fw-bold fs-5 ticket-price mb-3" id="ticketPrice-${ticket.id}">${formatRupiah(ticket.price)}</p>

            <div class="mt-auto">
              <label for="seatCat-${ticket.id}" class="form-label small fw-semibold mb-1">
                Kategori Kursi
              </label>
              <select
                id="seatCat-${ticket.id}"
                class="form-select form-select-sm mb-2 seat-category-input"
                data-ticket-id="${ticket.id}"
              >
                ${seatCategoryOptions}
              </select>

              <div id="seatInfo-${ticket.id}" class="small text-secondary mb-2">${seatLegend}</div>

              <label for="qty-${ticket.id}" class="form-label small fw-semibold">Jumlah Beli</label>
              <div class="d-flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  value="1"
                  id="qty-${ticket.id}"
                  class="form-control form-control-sm input-quantity"
                  data-ticket-id="${ticket.id}"
                />
                <button
                  type="button"
                  id="btnAdd-${ticket.id}"
                  class="btn btn-gradient text-white btn-sm btn-add-to-cart"
                  data-ticket-id="${ticket.id}"
                  ${hasSeatAvailability ? "" : "disabled"}
                >
                  ${hasSeatAvailability ? "Tambah ke Keranjang" : "Kursi Habis"}
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    `;
    })
    .join("");
}

function generateOrderId() {
  const current = Number(localStorage.getItem(STORAGE_KEYS.orderSequence) || "0");
  const next = current + 1;
  localStorage.setItem(STORAGE_KEYS.orderSequence, String(next));
  return `ORD-${next}`;
}

function buildIssuedTicket(orderId, buyer, cartItems, ownerUsername = "") {
  const issuedAt = new Date().toISOString();
  const items = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    artist: item.artist || "Artist",
    category: item.category,
    date: item.date || "TBA",
    venue: item.venue || "Lokasi belum ditentukan",
    area: item.area || "Indonesia",
    price: Number(item.price || 0),
    quantity: Number(item.quantity || 0),
    subtotal: Number(item.price || 0) * Number(item.quantity || 0),
    seatCategory: normalizeSeatCategoryCode(item.seatCategory || "CAT 1"),
    seatPrefix: String(item.seatPrefix || "A").trim().toUpperCase(),
    seatCategoryStock: Math.max(0, Number(item.seatCategoryStock || 0)),
    assignedSeats: Array.isArray(item.assignedSeats)
      ? item.assignedSeats.map((seat) => String(seat || "").trim()).filter((seat) => seat)
      : []
  }));

  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    orderId,
    status: ORDER_STATUS,
    issuedAt,
    ownerUsername,
    buyer,
    items,
    totalAmount
  };
}

function showOrderModal(orderId, orderStatus = ORDER_STATUS) {
  const normalizedStatus = normalizeOrderStatus(orderStatus);
  const orderIdElement = document.getElementById("orderIdValue");
  const statusElement = document.getElementById("orderStatusValue");
  const modalElement = document.getElementById("orderModal");

  if (orderIdElement) {
    orderIdElement.textContent = orderId;
  }

  if (statusElement) {
    statusElement.innerHTML = `<span class="badge ${getStatusBadgeClass(normalizedStatus)}">${normalizedStatus}</span>`;
  }

  if (window.bootstrap && modalElement) {
    const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalElement);
    modalInstance.show();
    return;
  }

  window.alert(`Pesanan berhasil dibuat: ${orderId} (${normalizedStatus})`);
}

function renderCheckoutSummary(cart) {
  const summaryBody = document.getElementById("checkoutSummaryBody");
  const totalElement = document.getElementById("checkoutGrandTotal");

  if (!summaryBody || !totalElement) {
    return;
  }

  if (cart.length === 0) {
    summaryBody.innerHTML =
      '<tr><td colspan="3" class="text-center text-secondary py-4">Keranjang kosong</td></tr>';
    totalElement.textContent = formatRupiah(0);
    return;
  }

  summaryBody.innerHTML = cart
    .map(
      (item) => `
      <tr id="checkoutRow-${buildCartItemKey(item.id, item.seatCategory).replace(/[^a-zA-Z0-9_-]/g, "-")}">
        <td>
          <div class="fw-semibold">${item.name}</div>
          <div class="small text-secondary">Kategori Kursi: ${item.seatCategory}</div>
        </td>
        <td>${item.quantity}</td>
        <td>${formatRupiah(item.price * item.quantity)}</td>
      </tr>
    `
    )
    .join("");

  totalElement.textContent = formatRupiah(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
}

function initLoginPage() {
  if (isLoggedIn()) {
    redirectTo(resolveLandingPageByRole(getSession()?.role || USER_ROLES.CUSTOMER));
    return;
  }

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const alertBox = document.getElementById("alert");
  const btnShowRegister = document.getElementById("btnShowRegister");
  const registerPanel = document.getElementById("registerPanel");
  const registerForm = document.getElementById("registerForm");
  const registerUsernameInput = document.getElementById("registerUsername");
  const registerPasswordInput = document.getElementById("registerPassword");
  const registerConfirmPasswordInput = document.getElementById("registerConfirmPassword");
  const registerAlert = document.getElementById("registerAlert");

  if (
    !loginForm ||
    !usernameInput ||
    !passwordInput ||
    !alertBox ||
    !btnShowRegister ||
    !registerPanel ||
    !registerForm ||
    !registerUsernameInput ||
    !registerPasswordInput ||
    !registerConfirmPasswordInput ||
    !registerAlert
  ) {
    return;
  }

  getUsers();

  btnShowRegister.addEventListener("click", () => {
    const isHidden = registerPanel.classList.contains("d-none");
    registerPanel.classList.toggle("d-none", !isHidden);
    btnShowRegister.textContent = isHidden
      ? "Tutup Form Buat Akun"
      : "Belum punya akun? Buat Akun";

    if (isHidden) {
      registerUsernameInput.focus();
    }
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = normalizeUsername(usernameInput.value);
    const password = String(passwordInput.value || "").trim();

    if (!username || !password) {
      showAlert(alertBox, "danger", "Email/username dan password wajib diisi.");
      return;
    }

    const user = findUserByUsername(username);
    if (!user || user.password !== password) {
      showAlert(alertBox, "danger", "Password salah atau akun tidak ditemukan.");
      return;
    }

    setSession({
      username: user.username,
      displayName: user.displayName || user.username,
      role: normalizeUserRole(user.role),
      loginAt: new Date().toISOString()
    });

    showAlert(
      alertBox,
      "success",
      `Login berhasil sebagai ${getRoleLabel(user.role)}. Mengarahkan...`
    );
    window.setTimeout(() => {
      redirectTo(resolveLandingPageByRole(user.role));
    }, 700);
  });

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = normalizeUsername(registerUsernameInput.value);
    const password = String(registerPasswordInput.value || "").trim();
    const confirmPassword = String(registerConfirmPasswordInput.value || "").trim();

    if (!username || !password || !confirmPassword) {
      showAlert(registerAlert, "danger", "Semua field pendaftaran wajib diisi.");
      return;
    }

    if (password.length < 6) {
      showAlert(registerAlert, "danger", "Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      showAlert(registerAlert, "danger", "Konfirmasi password tidak sama.");
      return;
    }

    const usernamePattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[a-zA-Z0-9._-]{4,}$/;
    if (!usernamePattern.test(username)) {
      showAlert(
        registerAlert,
        "danger",
        "Format username/email tidak valid. Gunakan email atau minimal 4 karakter."
      );
      return;
    }

    if (findUserByUsername(username)) {
      showAlert(registerAlert, "danger", "Akun sudah terdaftar. Silakan login.");
      return;
    }

    const users = getUsers();
    users.push({
      username,
      password,
      displayName: username,
      role: USER_ROLES.CUSTOMER
    });
    saveUsers(users);

    registerForm.reset();
    showAlert(registerAlert, "success", "Akun berhasil dibuat. Silakan login dengan akun baru.");
    usernameInput.value = username;
    passwordInput.value = "";
    hideAlert(alertBox);
  });
}

async function initProductsPage() {
  if (!ensureLoggedIn() || !ensureCustomerAccess()) {
    return;
  }

  attachLogoutHandler();
  syncLoginStatus();
  syncCartCounter();

  const productGrid = document.getElementById("productGrid");
  const productAlert = document.getElementById("productAlert");

  if (!productGrid || !productAlert) {
    return;
  }

  const tickets = await loadTickets();
  const ticketMap = new Map(tickets.map((ticket) => [ticket.id, ticket]));

  renderProducts(tickets, productGrid);

  productGrid.addEventListener("click", (event) => {
    const addButton = event.target.closest(".btn-add-to-cart");
    if (!addButton) {
      return;
    }

    const ticketId = String(addButton.dataset.ticketId || "");
    const ticket = ticketMap.get(ticketId);
    const qtyInput = document.getElementById(`qty-${ticketId}`);
    const seatCategoryInput = document.getElementById(`seatCat-${ticketId}`);

    if (!ticket || !qtyInput || !seatCategoryInput) {
      showAlert(productAlert, "danger", "Data tiket tidak ditemukan.");
      return;
    }

    const validation = validateQuantityValue(qtyInput.value, ticket.stock);
    if (!validation.isValid) {
      showAlert(productAlert, "danger", validation.message);
      return;
    }

    const selectedSeatCategory = normalizeSeatCategoryCode(seatCategoryInput.value);
    const result = addTicketToCart(ticket, validation.value, selectedSeatCategory);
    if (!result.ok) {
      showAlert(productAlert, "danger", result.message);
      return;
    }

    syncCartCounter();
    renderProducts(tickets, productGrid);
    showAlert(
      productAlert,
      "success",
      `${ticket.name} (${result.seatCategory}) berhasil ditambahkan ke keranjang.`
    );
  });
}

function initCartPage() {
  if (!ensureLoggedIn() || !ensureCustomerAccess()) {
    return;
  }

  attachLogoutHandler();
  syncLoginStatus();

  const alertBox = document.getElementById("cartAlert");
  const tableBody = document.getElementById("cartTableBody");
  const tableWrapper = document.getElementById("cartTableWrapper");
  const emptyState = document.getElementById("emptyCartState");
  const totalElement = document.getElementById("grandTotal");
  const checkoutButton = document.getElementById("btnCheckout");

  if (
    !alertBox ||
    !tableBody ||
    !tableWrapper ||
    !emptyState ||
    !totalElement ||
    !checkoutButton
  ) {
    return;
  }

  function renderCartTable() {
    const cart = getCart();
    syncCartCounter();

    if (cart.length === 0) {
      tableWrapper.classList.add("d-none");
      emptyState.classList.remove("d-none");
      totalElement.textContent = formatRupiah(0);
      checkoutButton.disabled = true;
      return;
    }

    tableWrapper.classList.remove("d-none");
    emptyState.classList.add("d-none");
    checkoutButton.disabled = false;

    tableBody.innerHTML = cart
      .map((item) => {
        const cartKey = buildCartItemKey(item.id, item.seatCategory);
        const domKey = cartKey.replace(/[^a-zA-Z0-9_-]/g, "-");
        const availableSeatsOutsideThisLine = getRemainingSeatCountForCategory(
          {
            id: item.id,
            seatCategories: [
              {
                code: item.seatCategory,
                label: item.seatCategory,
                prefix: item.seatPrefix,
                stock: item.seatCategoryStock
              }
            ]
          },
          item.seatCategory,
          cart,
          cartKey
        );
        const maxQtyBySeatCategory = availableSeatsOutsideThisLine;

        return `
        <tr id="cartRow-${domKey}">
          <td class="fw-semibold">${item.name}</td>
          <td>
            <span class="badge text-bg-secondary">${item.category}</span>
            <div class="small text-secondary mt-1">${item.seatCategory} (${buildSeatRangeLabel({
              prefix: item.seatPrefix,
              stock: item.seatCategoryStock
            })})</div>
          </td>
          <td>${formatRupiah(item.price)}</td>
          <td>
            <input
              id="cartQty-${domKey}"
              type="number"
              class="form-control form-control-sm cart-qty-input"
              data-cart-key="${cartKey}"
              value="${item.quantity}"
              min="1"
              max="10"
              step="1"
            />
            <div class="small text-secondary mt-1">Maks 10 | Stok kursi ${item.seatCategory}: ${maxQtyBySeatCategory}</div>
          </td>
          <td id="subtotal-${domKey}" class="fw-semibold">${formatRupiah(
          item.price * item.quantity
        )}</td>
          <td class="text-end">
            <button
              type="button"
              id="btnRemove-${domKey}"
              class="btn btn-outline-danger btn-sm btn-remove-item"
              data-cart-key="${cartKey}"
            >
              Hapus
            </button>
          </td>
        </tr>
      `;
      })
      .join("");

    totalElement.textContent = formatRupiah(getCartGrandTotal());
  }

  tableBody.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".btn-remove-item");
    if (!removeButton) {
      return;
    }

    const cartKey = String(removeButton.dataset.cartKey || "");
    const nextCart = getCart().filter(
      (item) => buildCartItemKey(item.id, item.seatCategory) !== cartKey
    );
    setCart(nextCart);
    showAlert(alertBox, "success", "Item berhasil dihapus dari keranjang.");
    renderCartTable();
  });

  tableBody.addEventListener("change", (event) => {
    const qtyInput = event.target.closest(".cart-qty-input");
    if (!qtyInput) {
      return;
    }

    const cartKey = String(qtyInput.dataset.cartKey || "");
    const cart = getCart();
    const item = cart.find(
      (entry) => buildCartItemKey(entry.id, entry.seatCategory) === cartKey
    );

    if (!item) {
      return;
    }

    const availableSeatsOutsideThisLine = getRemainingSeatCountForCategory(
      {
        id: item.id,
        seatCategories: [
          {
            code: item.seatCategory,
            label: item.seatCategory,
            prefix: item.seatPrefix,
            stock: item.seatCategoryStock
          }
        ]
      },
      item.seatCategory,
      cart,
      cartKey
    );
    const maxQtyBySeatCategory = availableSeatsOutsideThisLine;
    const validation = validateQuantityValue(qtyInput.value, maxQtyBySeatCategory);
    if (!validation.isValid) {
      showAlert(
        alertBox,
        "danger",
        `${validation.message} (Sisa ${item.seatCategory}: ${maxQtyBySeatCategory} kursi)`
      );
      qtyInput.value = String(item.quantity);
      return;
    }

    item.quantity = validation.value;
    setCart(cart);
    hideAlert(alertBox);
    renderCartTable();
  });

  checkoutButton.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) {
      showAlert(alertBox, "warning", "Keranjang kosong. Tambahkan tiket terlebih dahulu.");
      return;
    }

    redirectTo("./checkout.html");
  });

  renderCartTable();
}

function initCheckoutPage() {
  if (!ensureLoggedIn() || !ensureCustomerAccess()) {
    return;
  }

  attachLogoutHandler();
  syncLoginStatus();
  syncCartCounter();

  const checkoutAlert = document.getElementById("checkoutAlert");
  const checkoutForm = document.getElementById("checkoutForm");
  const recipientName = document.getElementById("recipientName");
  const address = document.getElementById("address");
  const phone = document.getElementById("phone");
  const submitButton = document.getElementById("btnSubmitOrder");

  if (
    !checkoutAlert ||
    !checkoutForm ||
    !recipientName ||
    !address ||
    !phone ||
    !submitButton
  ) {
    return;
  }

  const session = getSession();
  if (session && !recipientName.value) {
    recipientName.value = session.displayName;
  }

  function syncCheckoutState() {
    const cart = getCart();
    renderCheckoutSummary(cart);
    submitButton.disabled = cart.length === 0;

    if (cart.length === 0) {
      showAlert(
        checkoutAlert,
        "warning",
        "Keranjang kosong. Silakan kembali ke katalog untuk memilih tiket."
      );
    } else {
      hideAlert(checkoutAlert);
    }
  }

  checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      showAlert(checkoutAlert, "warning", "Keranjang kosong. Tidak ada pesanan untuk diproses.");
      return;
    }

    const nameValue = String(recipientName.value || "").trim();
    const addressValue = String(address.value || "").trim();
    const phoneValue = String(phone.value || "").trim();

    if (!nameValue || !addressValue || !phoneValue) {
      showAlert(checkoutAlert, "danger", "Semua data penerima wajib diisi.");
      return;
    }

    const phonePattern = /^[0-9+\-\s]{8,20}$/;
    if (!phonePattern.test(phoneValue)) {
      showAlert(checkoutAlert, "danger", "Format nomor telepon tidak valid.");
      return;
    }

    const seatAllocation = allocateSeatsForCart(cart);
    if (!seatAllocation.ok) {
      showAlert(checkoutAlert, "danger", seatAllocation.message);
      return;
    }

    const orderId = generateOrderId();
    const issuedTicket = buildIssuedTicket(
      orderId,
      {
        recipientName: nameValue,
        address: addressValue,
        phone: phoneValue
      },
      seatAllocation.items,
      getSession()?.username || ""
    );

    setSeatProgress(seatAllocation.nextSeatProgress);

    setLastTicket(issuedTicket);
    appendTicketHistory(issuedTicket);

    let backendSyncFailed = false;
    try {
      await persistTicketToBackend(issuedTicket);
    } catch (error) {
      backendSyncFailed = true;
    }

    clearCart();
    syncCartCounter();
    syncCheckoutState();

    if (backendSyncFailed) {
      showAlert(
        checkoutAlert,
        "warning",
        "Pembayaran berhasil, tetapi sinkronisasi tiket ke backend gagal. Tiket tetap tersimpan lokal."
      );
    }

    showOrderModal(orderId, issuedTicket.status);
  });

  syncCheckoutState();
}

function formatIssuedDate(isoDate, compact = false) {
  if (!isoDate) {
    return "-";
  }

  const dateObj = new Date(isoDate);
  if (Number.isNaN(dateObj.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: compact ? "medium" : "full",
    timeStyle: "short"
  }).format(dateObj);
}

function sortTicketsByIssuedAtDesc(tickets) {
  return [...tickets].sort((ticketA, ticketB) => {
    const timeA = new Date(ticketA.issuedAt || 0).getTime();
    const timeB = new Date(ticketB.issuedAt || 0).getTime();
    return timeB - timeA;
  });
}

function renderTicketHistoryList(ticketHistory, activeOrderId, historyListElement, historyCountElement) {
  historyCountElement.textContent = `${ticketHistory.length} tiket`;

  historyListElement.innerHTML = ticketHistory
    .map(
      (ticket) => `
      <button
        type="button"
        class="list-group-item list-group-item-action ticket-history-item ${
          ticket.orderId === activeOrderId ? "active" : ""
        }"
        data-order-id="${ticket.orderId}"
      >
        <div class="d-flex justify-content-between align-items-start gap-2">
          <span class="fw-semibold">${ticket.orderId}</span>
          <span class="small">${formatIssuedDate(ticket.issuedAt, true)}</span>
        </div>
        <div class="small mt-1">${ticket.items.length} item . ${formatRupiah(ticket.totalAmount || 0)}</div>
      </button>
    `
    )
    .join("");
}

function renderTicketDetail(ticket, viewElements) {
  const {
    orderIdElement,
    statusElement,
    issuedAtElement,
    recipientElement,
    addressElement,
    phoneElement,
    tableBody,
    totalElement,
    qrImage,
    qrValueElement
  } = viewElements;

  orderIdElement.textContent = ticket.orderId || "-";
  statusElement.innerHTML = `<span class="badge ${getStatusBadgeClass(ticket.status)}">${
    ticket.status || "-"
  }</span>`;
  issuedAtElement.textContent = formatIssuedDate(ticket.issuedAt);
  recipientElement.textContent = ticket.buyer?.recipientName || "-";
  addressElement.textContent = ticket.buyer?.address || "-";
  phoneElement.textContent = ticket.buyer?.phone || "-";

  tableBody.innerHTML = ticket.items
    .map((item, index) => {
      const rowKey = buildCartItemKey(item.id, item.seatCategory || "CAT 1").replace(
        /[^a-zA-Z0-9_-]/g,
        "-"
      );

      return `
      <tr id="ticketItem-${rowKey}-${index}">
        <td>
          <div class="fw-semibold">${item.name}</div>
          <div class="small text-secondary">Artis: ${item.artist}</div>
          <div class="small text-secondary">Kategori Kursi: ${item.seatCategory || "CAT 1"}</div>
        </td>
        <td>
          <div>${item.venue}</div>
          <div class="small text-secondary">${item.area}</div>
          <div class="small text-secondary">Tanggal: ${item.date || "TBA"}</div>
          <div class="small text-secondary">Kursi: ${
            Array.isArray(item.assignedSeats) && item.assignedSeats.length > 0
              ? item.assignedSeats.join(", ")
              : "Belum dialokasikan"
          }</div>
        </td>
        <td>${item.quantity}</td>
        <td>${formatRupiah(item.subtotal)}</td>
      </tr>
    `;
    })
    .join("");

  totalElement.textContent = formatRupiah(ticket.totalAmount || 0);
  qrImage.src = buildTicketQrUrl(ticket);
  qrImage.alt = `QR ${ticket.orderId || "ticket"}`;
  qrValueElement.textContent = buildTicketQrPayload(ticket);
}

function buildTicketPdfFilename(orderId) {
  const safeOrderId = String(orderId || "ticket")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/^_+|_+$/g, "");

  return `e-ticket-${safeOrderId || "ticket"}.pdf`;
}

function downloadTicketPdf(ticket) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    window.alert("Fitur download PDF belum tersedia di browser ini.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  const left = 44;
  const pageBottom = 780;
  let y = 52;

  const ensureSpace = (height) => {
    if (y + height > pageBottom) {
      doc.addPage();
      y = 52;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("E-Ticket Konser Indonesia", left, y);
  y += 26;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const headerLines = [
    `Order ID: ${ticket.orderId || "-"}`,
    `Status: ${ticket.status || "-"}`,
    `Waktu Checkout: ${formatIssuedDate(ticket.issuedAt)}`,
    `Pemesan: ${ticket.buyer?.recipientName || "-"}`,
    `Kontak: ${ticket.buyer?.phone || "-"}`,
    `Alamat/Email: ${ticket.buyer?.address || "-"}`
  ];

  headerLines.forEach((line) => {
    ensureSpace(18);
    doc.text(line, left, y);
    y += 18;
  });

  y += 8;
  ensureSpace(24);
  doc.setFont("helvetica", "bold");
  doc.text("Detail Tiket", left, y);
  y += 18;
  doc.setFont("helvetica", "normal");

  ticket.items.forEach((item, index) => {
    const seatText =
      Array.isArray(item.assignedSeats) && item.assignedSeats.length > 0
        ? item.assignedSeats.join(", ")
        : "Belum dialokasikan";

    const itemLines = [
      `${index + 1}. ${item.name} (${item.artist})`,
      `   Lokasi: ${item.venue} - ${item.area}`,
      `   Tanggal: ${item.date || "TBA"}`,
      `   Kategori Kursi: ${item.seatCategory || "CAT 1"} | Nomor: ${seatText}`,
      `   Qty x Harga: ${item.quantity} x ${formatRupiah(item.price)} = ${formatRupiah(item.subtotal)}`
    ];

    itemLines.forEach((line) => {
      ensureSpace(17);
      doc.text(line, left, y);
      y += 17;
    });

    y += 6;
  });

  ensureSpace(34);
  doc.setFont("helvetica", "bold");
  doc.text(`Total Pembayaran: ${formatRupiah(ticket.totalAmount || 0)}`, left, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  const qrPayload = `Kode Validasi QR: ${buildTicketQrPayload(ticket)}`;
  const wrappedQrPayload = doc.splitTextToSize(qrPayload, 510);
  ensureSpace(18 * wrappedQrPayload.length);
  doc.text(wrappedQrPayload, left, y);

  doc.save(buildTicketPdfFilename(ticket.orderId));
}

async function initTicketPage() {
  if (!ensureLoggedIn() || !ensureCustomerAccess()) {
    return;
  }

  attachLogoutHandler();
  syncLoginStatus();
  syncCartCounter();

  const ticketAlert = document.getElementById("ticketAlert");
  const ticketCard = document.getElementById("ticketCard");
  const emptyTicketState = document.getElementById("emptyTicketState");
  const orderIdElement = document.getElementById("ticketOrderId");
  const statusElement = document.getElementById("ticketStatus");
  const issuedAtElement = document.getElementById("ticketIssuedAt");
  const recipientElement = document.getElementById("ticketRecipient");
  const addressElement = document.getElementById("ticketAddress");
  const phoneElement = document.getElementById("ticketPhone");
  const tableBody = document.getElementById("ticketItemsBody");
  const totalElement = document.getElementById("ticketGrandTotal");
  const printButton = document.getElementById("btnPrintTicket");
  const downloadPdfButton = document.getElementById("btnDownloadTicketPdf");
  const historyList = document.getElementById("ticketHistoryList");
  const historyCount = document.getElementById("ticketHistoryCount");
  const qrImage = document.getElementById("ticketQrImage");
  const qrValueElement = document.getElementById("ticketQrValue");

  if (
    !ticketAlert ||
    !ticketCard ||
    !emptyTicketState ||
    !orderIdElement ||
    !statusElement ||
    !issuedAtElement ||
    !recipientElement ||
    !addressElement ||
    !phoneElement ||
    !tableBody ||
    !totalElement ||
    !printButton ||
    !downloadPdfButton ||
    !historyList ||
    !historyCount ||
    !qrImage ||
    !qrValueElement
  ) {
    return;
  }

  const session = getSession();
  const currentUsername = normalizeUsername(session?.username || "");
  let ticketHistory = sortTicketsByIssuedAtDesc(getUserTicketHistory(currentUsername));

  try {
    ticketHistory = await syncUserTicketHistoryFromBackend(currentUsername);
  } catch (error) {
    // Keep local history as fallback when backend is unavailable.
  }

  const legacyTicket = getLastTicket();

  if (
    ticketHistory.length === 0 &&
    legacyTicket &&
    Array.isArray(legacyTicket.items) &&
    legacyTicket.items.length > 0
  ) {
    const legacyOwner = normalizeUsername(legacyTicket.ownerUsername || "");
    if (!legacyOwner || legacyOwner === currentUsername) {
      const migratedTicket = {
        ...legacyTicket,
        ownerUsername: legacyOwner || currentUsername
      };

      setLastTicket(migratedTicket);
      appendTicketHistory(migratedTicket);
      ticketHistory = sortTicketsByIssuedAtDesc(getUserTicketHistory(currentUsername));
    }
  }

  if (ticketHistory.length === 0) {
    ticketCard.classList.add("d-none");
    emptyTicketState.classList.remove("d-none");
    const hasDifferentOwnerLegacyTicket =
      legacyTicket &&
      normalizeUsername(legacyTicket.ownerUsername || "") &&
      normalizeUsername(legacyTicket.ownerUsername || "") !== currentUsername;

    showAlert(
      ticketAlert,
      "warning",
      hasDifferentOwnerLegacyTicket
        ? "Belum ada tiket untuk akun yang sedang login."
        : "Belum ada tiket yang berhasil dibeli."
    );
    return;
  }

  hideAlert(ticketAlert);
  ticketCard.classList.remove("d-none");
  emptyTicketState.classList.add("d-none");

  let selectedTicket = ticketHistory[0];

  function renderTicketPageState() {
    renderTicketDetail(selectedTicket, {
      orderIdElement,
      statusElement,
      issuedAtElement,
      recipientElement,
      addressElement,
      phoneElement,
      tableBody,
      totalElement,
      qrImage,
      qrValueElement
    });

    renderTicketHistoryList(ticketHistory, selectedTicket.orderId, historyList, historyCount);
  }

  historyList.addEventListener("click", (event) => {
    const button = event.target.closest(".ticket-history-item");
    if (!button) {
      return;
    }

    const orderId = String(button.dataset.orderId || "");
    const ticket = ticketHistory.find((entry) => String(entry.orderId || "") === orderId);
    if (!ticket) {
      return;
    }

    selectedTicket = ticket;
    renderTicketPageState();
  });

  renderTicketPageState();

  printButton.addEventListener("click", () => {
    window.print();
  });

  downloadPdfButton.addEventListener("click", () => {
    downloadTicketPdf(selectedTicket);
  });
}

function buildAdminItemsSummary(items) {
  const safeItems = Array.isArray(items) ? items : [];
  if (safeItems.length === 0) {
    return "-";
  }

  return safeItems
    .map((item) => {
      const seatCategory = item.seatCategory || "CAT 1";
      return `${item.name} (${item.quantity} . ${seatCategory})`;
    })
    .join("; ");
}

async function syncAllCustomerTicketHistoryForAdmin() {
  const customerUsers = getUsers().filter(
    (user) => normalizeUserRole(user.role) === USER_ROLES.CUSTOMER
  );

  await Promise.all(
    customerUsers.map(async (user) => {
      try {
        const backendTickets = await fetchUserTicketHistoryFromBackend(user.username);
        backendTickets.forEach((ticket) => {
          appendTicketHistory(ticket);
        });
      } catch (error) {
        // Keep local data when backend sync is unavailable.
      }
    })
  );

  return sortTicketsByIssuedAtDesc(getTicketHistory());
}

async function initAdminPage() {
  if (!ensureLoggedIn() || !ensureAdminAccess()) {
    return;
  }

  attachLogoutHandler();
  syncLoginStatus();

  const adminAlert = document.getElementById("adminAlert");
  const tableBody = document.getElementById("adminOrdersBody");
  const filterInput = document.getElementById("adminFilterUsername");
  const applyFilterButton = document.getElementById("btnApplyAdminFilter");
  const resetFilterButton = document.getElementById("btnResetAdminFilter");
  const refreshButton = document.getElementById("btnRefreshAdminData");
  const totalOrdersElement = document.getElementById("adminTotalOrders");
  const totalCustomersElement = document.getElementById("adminTotalCustomers");
  const totalRevenueElement = document.getElementById("adminTotalRevenue");
  const latestIssuedElement = document.getElementById("adminLatestIssued");

  if (
    !adminAlert ||
    !tableBody ||
    !filterInput ||
    !applyFilterButton ||
    !resetFilterButton ||
    !refreshButton ||
    !totalOrdersElement ||
    !totalCustomersElement ||
    !totalRevenueElement ||
    !latestIssuedElement
  ) {
    return;
  }

  let allTickets = sortTicketsByIssuedAtDesc(getTicketHistory());

  const render = () => {
    const keyword = normalizeUsername(filterInput.value || "");
    const filteredTickets = keyword
      ? allTickets.filter(
          (ticket) =>
            normalizeUsername(ticket.ownerUsername).includes(keyword) ||
            String(ticket.orderId || "").toLowerCase().includes(keyword)
        )
      : allTickets;

    const uniqueCustomers = new Set(
      filteredTickets.map((ticket) => normalizeUsername(ticket.ownerUsername || ""))
    );

    totalOrdersElement.textContent = String(filteredTickets.length);
    totalCustomersElement.textContent = String(uniqueCustomers.size);
    totalRevenueElement.textContent = formatRupiah(
      filteredTickets.reduce((sum, ticket) => sum + Number(ticket.totalAmount || 0), 0)
    );
    latestIssuedElement.textContent = filteredTickets[0]
      ? formatIssuedDate(filteredTickets[0].issuedAt, true)
      : "-";

    if (filteredTickets.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="8" class="text-center text-secondary py-4">Belum ada data tiket untuk ditampilkan.</td></tr>';
      showAlert(adminAlert, "warning", "Belum ada tiket dari pemesan.");
      return;
    }

    hideAlert(adminAlert);
    tableBody.innerHTML = filteredTickets
      .map(
        (ticket, index) => `
        <tr id="adminTicketRow-${index}">
          <td>${ticket.orderId || "-"}</td>
          <td>${ticket.ownerUsername || "-"}</td>
          <td>${ticket.buyer?.recipientName || "-"}</td>
          <td>${ticket.status || ORDER_STATUS}</td>
          <td>${formatIssuedDate(ticket.issuedAt, true)}</td>
          <td>${ticket.items.length}</td>
          <td>${formatRupiah(ticket.totalAmount || 0)}</td>
          <td class="small">${buildAdminItemsSummary(ticket.items)}</td>
        </tr>
      `
      )
      .join("");
  };

  const refreshData = async () => {
    showAlert(adminAlert, "info", "Menyinkronkan data tiket dari backend...");
    allTickets = await syncAllCustomerTicketHistoryForAdmin();
    render();
  };

  applyFilterButton.addEventListener("click", () => {
    render();
  });

  resetFilterButton.addEventListener("click", () => {
    filterInput.value = "";
    render();
  });

  filterInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      render();
    }
  });

  refreshButton.addEventListener("click", async () => {
    await refreshData();
  });

  render();
  await refreshData();
}

function boot() {
  const page = document.body.dataset.page;

  if (page === "login") {
    initLoginPage();
    return;
  }

  if (page === "products") {
    initProductsPage();
    return;
  }

  if (page === "cart") {
    initCartPage();
    return;
  }

  if (page === "checkout") {
    initCheckoutPage();
    return;
  }

  if (page === "ticket") {
    initTicketPage();
    return;
  }

  if (page === "admin") {
    initAdminPage();
  }
}

document.addEventListener("DOMContentLoaded", boot);
