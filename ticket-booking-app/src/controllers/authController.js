const users = [
  {
    id: "user-1",
    name: "Demo User",
    email: "demo@ticketapp.local",
    password: "demo123"
  }
];

const sessions = new Map();

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
  sessions.set(token, {
    id: user.id,
    name: user.name,
    email: user.email
  });

  return res.json({
    message: "Login successful.",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
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

module.exports = {
  login,
  requireAuth,
  getSession
};
