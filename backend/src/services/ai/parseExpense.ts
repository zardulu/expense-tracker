import { z } from "zod";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export interface ParsedExpense {
  amount: number;
  currency: string;
  category: string;
  description: string;
  merchant: string | null;
}

const ParsedExpenseSchema = z.object({
  amount: z.number(),
  currency: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  merchant: z.string().min(1).nullable(),
});

const ParseErrorSchema = z.object({
  error: z.string().min(1),
  amount: z.null(),
});

const AiResponseSchema = z.union([ParsedExpenseSchema, ParseErrorSchema]);

const EXPENSE_PARSER_SYSTEM_PROMPT = `You are an expense parser. Extract expense information from natural language input.

RULES:
1. Extract the amount as a number (no currency symbols)
2. Default currency is INR unless explicitly mentioned (USD, EUR, etc.)
3. Categorize into EXACTLY one of these categories:
   - Food & Dining (restaurants, cafes, food delivery, groceries)
   - Transport (uber, ola, taxi, fuel, parking, metro)
   - Shopping (clothes, electronics, amazon, flipkart)
   - Entertainment (movies, netflix, spotify, games)
   - Bills & Utilities (electricity, water, internet, phone)
   - Health (medicine, doctor, gym, pharmacy)
   - Travel (flights, hotels, trips)
   - Other (anything that doesn't fit above)
4. Description should be a clean summary (not the raw input)
5. Merchant is the company/store name if mentioned, null otherwise

RESPOND ONLY WITH VALID JSON, no other text:
{
  "amount": <number>,
  "currency": "<string>",
  "category": "<string>",
  "description": "<string>",
  "merchant": "<string or null>"
}

If the input is invalid or you cannot extract an amount, respond:
{
  "error": "Could not parse expense. Please include an amount.",
  "amount": null
}`;

function normalizeDefaults(parsed: ParsedExpense): ParsedExpense {
  return {
    amount: parsed.amount,
    currency: parsed.currency?.trim() ? parsed.currency.trim() : "INR",
    category: parsed.category?.trim() ? parsed.category.trim() : "Other",
    description: parsed.description?.trim() ? parsed.description.trim() : "Expense",
    merchant: parsed.merchant ? parsed.merchant.trim() : null,
  };
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function parseExpense(
  text: string,
): Promise<ParsedExpense | { error: string; amount: null }> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { error: "Missing GROQ_API_KEY", amount: null };
  }

  const model = process.env.GROQ_MODEL || "llama-3.1-70b-versatile";

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        messages: [
          { role: "system", content: EXPENSE_PARSER_SYSTEM_PROMPT },
          { role: "user", content: text },
        ],
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return {
        error: `AI request failed (${response.status}): ${body || response.statusText}`,
        amount: null,
      };
    }

    const data = (await response.json()) as any;
    const content = data?.choices?.[0]?.message?.content;

    if (typeof content !== "string") {
      return { error: "AI response missing content", amount: null };
    }

    const parsedJson = safeJsonParse(content);
    const validated = AiResponseSchema.safeParse(parsedJson);

    if (!validated.success) {
      return { error: "AI returned invalid JSON schema", amount: null };
    }

    if ("error" in validated.data) {
      return validated.data;
    }

    return normalizeDefaults(validated.data);
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Unknown AI error",
      amount: null,
    };
  }
}

