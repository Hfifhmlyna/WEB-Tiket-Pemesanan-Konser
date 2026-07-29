const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Keep startup log clear and explicit for local development.
  console.log(`Ticket Booking App server is running on http://localhost:${PORT}`);
});
