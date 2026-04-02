import { Expense } from "../types/expense";

export const API_BASE_URL = "http://localhost:3000";

const TIMEOUT_MS = 10_000;

type ApiSuccess<T> = { success: true } & T;
type ApiError = { success: false; error: string };

async function fetchWithTimeout(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function parseApiError(res: Response): Promise<string> {
  const text = await res.text().catch(() => "");
  try {
    const json = JSON.parse(text);
    if (json && typeof json.error === "string") return json.error;
  } catch {
    // ignore
  }
  return text || `Request failed (${res.status})`;
}

export async function addExpense(input: string): Promise<Expense> {
  const res = await fetchWithTimeout(`${API_BASE_URL}/api/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });

  if (!res.ok) throw new Error(await parseApiError(res));
  const json = (await res.json()) as ApiSuccess<{ expense: Expense }> | ApiError;

  if (!json.success) throw new Error(json.error);
  return json.expense;
}

export async function getExpenses(): Promise<Expense[]> {
  const res = await fetchWithTimeout(`${API_BASE_URL}/api/expenses`);
  if (!res.ok) throw new Error(await parseApiError(res));

  const json = (await res.json()) as ApiSuccess<{ expenses: Expense[] }> | ApiError;
  if (!json.success) throw new Error(json.error);
  return json.expenses;
}

export async function deleteExpense(id: number): Promise<void> {
  const res = await fetchWithTimeout(`${API_BASE_URL}/api/expenses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(await parseApiError(res));

  const json = (await res.json()) as ApiSuccess<{ message: string }> | ApiError;
  if (!json.success) throw new Error(json.error);
}

