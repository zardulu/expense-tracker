import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { closeDbForTestsOnly } from "../database/db";

// Mock AI parsing so tests are deterministic and offline.
vi.mock("../services/ai/parseExpense", () => {
  return {
    parseExpense: vi.fn(async (text: string) => {
      if (text.includes("noamount")) {
        return { error: "Could not parse expense. Please include an amount.", amount: null };
      }
      return {
        amount: 123,
        currency: "INR",
        category: "Other",
        description: "Test expense",
        merchant: null,
      };
    }),
  };
});

describe("expenses routes", () => {
  beforeEach(async () => {
    process.env.SQLITE_PATH = ":memory:";
    // Import after setting env so DB uses :memory:
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  });

  afterEach(() => {
    closeDbForTestsOnly();
    delete process.env.SQLITE_PATH;
  });

  it("POST /api/expenses creates an expense", async () => {
    const { createApp } = await import("../app");
    const app = createApp();

    const res = await request(app)
      .post("/api/expenses")
      .send({ input: "coffee 123" })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.expense).toMatchObject({
      amount: 123,
      currency: "INR",
      category: "Other",
      description: "Test expense",
    });
  });

  it("PUT /api/expenses/:id returns 404 for missing id", async () => {
    const { createApp } = await import("../app");
    const app = createApp();

    const res = await request(app)
      .put("/api/expenses/999")
      .send({ input: "edit 123" })
      .expect(404);

    expect(res.body).toEqual({ success: false, error: "Expense not found" });
  });

  it("GET /api/expenses lists expenses", async () => {
    const { createApp } = await import("../app");
    const app = createApp();

    await request(app).post("/api/expenses").send({ input: "coffee 123" }).expect(201);

    const res = await request(app).get("/api/expenses").expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.expenses).toHaveLength(1);
  });

  it("POST /api/expenses returns 400 on parse error", async () => {
    const { createApp } = await import("../app");
    const app = createApp();

    const res = await request(app)
      .post("/api/expenses")
      .send({ input: "noamount" })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Could not parse expense");
  });
});

