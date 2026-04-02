import { Router } from "express";
import { z } from "zod";

import { createExpense, deleteExpense, getAllExpenses } from "../database/expensesRepo";
import { parseExpense } from "../services/ai/parseExpense";

export const expensesRouter = Router();

const AddExpenseBodySchema = z.object({
  input: z.string().min(1),
});

expensesRouter.post("/", async (req, res) => {
  const parsedBody = AddExpenseBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ success: false, error: "Invalid request body" });
  }

  const { input } = parsedBody.data;

  const parsed = await parseExpense(input);
  if ("error" in parsed) {
    return res.status(400).json({ success: false, error: parsed.error });
  }

  try {
    const expense = createExpense({
      amount: parsed.amount,
      currency: parsed.currency,
      category: parsed.category,
      description: parsed.description,
      merchant: parsed.merchant,
      original_input: input,
    });

    return res.status(201).json({ success: true, expense });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Failed to create expense",
    });
  }
});

expensesRouter.get("/", (_req, res) => {
  try {
    const expenses = getAllExpenses();
    return res.status(200).json({ success: true, expenses });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch expenses",
    });
  }
});

const DeleteParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

expensesRouter.delete("/:id", (req, res) => {
  const parsedParams = DeleteParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({ success: false, error: "Invalid expense id" });
  }

  try {
    const ok = deleteExpense(parsedParams.data.id);
    if (!ok) {
      return res.status(404).json({ success: false, error: "Expense not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete expense",
    });
  }
});

