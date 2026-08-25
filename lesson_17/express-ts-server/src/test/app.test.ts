jest.mock("uuid", () => ({
  v7: jest.fn(() => "mock-uuid-v7"),
}));

import request from "supertest";
import buildApp from "../app";

const app = buildApp();

describe("GET /health", () => {
  it("returns 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
  });

  it("returns {status: 'ok'}", async () => {
    const res = await request(app).get("/health");
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("GET /", () => {
  it("returns 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });

  it("returns {message: 'Hello'}", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "Hello" });
  });
});
