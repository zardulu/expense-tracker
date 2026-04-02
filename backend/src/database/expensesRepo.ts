import { getDb } from "./db";

export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Health",
  "Travel",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
  id: number;
  amount: number;
  currency: string;
  category: ExpenseCategory | string;
  description: string;
  merchant: string | null;
  original_input: string;
  created_at: string;
}

export interface ExpenseInput {
  amount: number;
  currency?: string;
  category: ExpenseCategory | string;
  description: string;
  merchant?: string | null;
  original_input: string;
}

export function createExpense(input: ExpenseInput): Expense {
  const db = getDb();

  const stmt = db.prepare(`
    INSERT INTO expenses (amount, currency, category, description, merchant, original_input)
    VALUES (@amount, @currency, @category, @description, @merchant, @original_input)
  `);

  const result = stmt.run({
    amount: input.amount,
    currency: input.currency ?? "INR",
    category: input.category,
    description: input.description,
    merchant: input.merchant ?? null,
    original_input: input.original_input,
  });

  const row = db
    .prepare(
      `SELECT id, amount, currency, category, description, merchant, original_input, created_at
       FROM expenses
       WHERE id = ?`,
    )
    .get(result.lastInsertRowid) as Expense | undefined;

  if (!row) {
    throw new Error("Failed to create expense");
  }

  return row;
}

export function getAllExpenses(): Expense[] {
  const db = getDb();

  const rows = db
    .prepare(
      `SELECT id, amount, currency, category, description, merchant, original_input, created_at
       FROM expenses
       ORDER BY datetime(created_at) DESC, id DESC`,
    )
    .all() as Expense[];

  return rows;
}

export function deleteExpense(id: number): boolean {
  const db = getDb();

  const result = db.prepare(`DELETE FROM expenses WHERE id = ?`).run(id);
  return result.changes > 0;
}

