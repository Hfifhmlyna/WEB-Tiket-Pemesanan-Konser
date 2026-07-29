const { Given, When, Then } = require("@cucumber/cucumber");
const request = require("supertest");
const assert = require("assert");

const app = require("../../../src/app");

let loginPayload;
let loginResponse;
let checkoutResponse;

Given("a valid login payload", function () {
  loginPayload = {
    email: "demo@ticketapp.local",
    password: "demo123"
  };
});

When("I submit login request", async function () {
  loginResponse = await request(app).post("/api/auth/login").send(loginPayload);
});

When("I submit checkout request with one ticket", async function () {
  const token = loginResponse.body.token;

  checkoutResponse = await request(app)
    .post("/api/orders/checkout")
    .set("Authorization", `Bearer ${token}`)
    .send({
      customerName: "BDD User",
      paymentMethod: "virtual_account",
      items: [{ id: "TKT-001", quantity: 1 }]
    });
});

Then("checkout response should be successful", function () {
  assert.strictEqual(loginResponse.statusCode, 200);
  assert.strictEqual(checkoutResponse.statusCode, 201);
  assert.strictEqual(checkoutResponse.body.data.status, "PAID");
});
