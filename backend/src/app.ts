import cors from "cors";
import express from "express";

import { initDb } from "./database/db";
import { expensesRouter } from "./routes/expenses";

export function createApp() {
  initDb();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/expenses", expensesRouter);
  return app;
}

