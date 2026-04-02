import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { closeDbForTestsOnly, initDb } from "./db";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
} from "./expensesRepo";

describe("expensesRepo", () => {
  beforeEach(() => {
    process.env.SQLITE_PATH = ":memory:";
    initDb();
  });

  afterEach(() => {
    closeDbForTestsOnly();
    delete process.env.SQLITE_PATH;
  });

  it("creates and lists expenses (newest first)", () => {
    const a = createExpense({
      amount: 100,
      category: "Other",
      description: "A",
      merchant: null,
      original_input: "A 100",
    });
    const b = createExpense({
      amount: 200,
      category: "Food & Dining",
      description: "B",
      merchant: "Cafe",
      original_input: "B 200",
    });

    const all = getAllExpenses();
    expect(all.length).toBe(2);
    expect(all[0].id).toBe(b.id);
    expect(all[1].id).toBe(a.id);
  });

  it("updates an expense and returns the updated row", () => {
    const created = createExpense({
      amount: 100,
      category: "Other",
      description: "A",
      merchant: null,
      original_input: "A 100",
    });

    const updated = updateExpense(created.id, {
      amount: 999,
      currency: "INR",
      category: "Transport",
      description: "Uber",
      merchant: "Uber",
      original_input: "uber 999",
    });

    expect(updated).not.toBeNull();
    expect(updated?.id).toBe(created.id);
    expect(updated?.amount).toBe(999);
    expect(updated?.category).toBe("Transport");
    expect(updated?.original_input).toBe("uber 999");
  });

  it("returns null when updating a missing expense", () => {
    const updated = updateExpense(12345, {
      amount: 1,
      category: "Other",
      description: "X",
      merchant: null,
      original_input: "x 1",
    });
    expect(updated).toBeNull();
  });

  it("deletes an expense", () => {
    const created = createExpense({
      amount: 10,
      category: "Other",
      description: "A",
      merchant: null,
      original_input: "A 10",
    });

    expect(deleteExpense(created.id)).toBe(true);
    expect(deleteExpense(created.id)).toBe(false);
    expect(getAllExpenses()).toHaveLength(0);
  });
});

