import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { initDb } from "./database/db";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());

initDb();

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});

