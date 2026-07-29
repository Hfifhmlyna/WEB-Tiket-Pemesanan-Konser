const USER_ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer"
};

const users = [
  {
    id: "user-1",
    name: "Demo User",
    email: "demo@ticketapp.local",
    password: "demo123",
    role: USER_ROLES.CUSTOMER
  },
  {
    id: "admin-1",
    name: "Admin Ticket",
    email: "admin@ticketapp.local",
    password: "admin123",
    role: USER_ROLES.ADMIN
  }
];

const sessions = new Map();

function normalizeRole(role) {
  return String(role || "").trim().toLowerCase() === USER_ROLES.ADMIN
    ? USER_ROLES.ADMIN
    : USER_ROLES.CUSTOMER;
}

function mapPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: normalizeRole(user.role)
  };
}

function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required."
    });
  }

  const user = users.find(
    (entry) => entry.email === email && entry.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password."
    });
  }

  const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64url");
  sessions.set(token, mapPublicUser(user));

  return res.json({
    message: "Login successful.",
    token,
    user: mapPublicUser(user)
  });
}

function getSession(token) {
  return sessions.get(token) || null;
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.replace(/^Bearer\s+/i, "").trim();
  const bodyToken = req.body && req.body.token ? String(req.body.token) : "";
  const token = bearerToken || bodyToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized. Missing token."
    });
  }

  const session = getSession(token);
  if (!session) {
    return res.status(401).json({
      message: "Unauthorized. Invalid token."
    });
  }

  req.user = session;
  return next();
}

function requireRole(...roles) {
  const allowedRoles = roles.map((role) => normalizeRole(role));

  return function checkRole(req, res, next) {
    const currentRole = normalizeRole(req.user && req.user.role ? req.user.role : "");

    if (!allowedRoles.includes(currentRole)) {
      return res.status(403).json({
        message: "Forbidden. You do not have access to this resource."
      });
    }

    return next();
  };
}

module.exports = {
  USER_ROLES,
  login,
  requireAuth,
  requireRole,
  getSession
};
