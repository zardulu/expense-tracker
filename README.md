# AI Expense Tracker

A full-stack expense tracking app that uses AI to parse natural language input.

Built by: Anshul Shivgiri  
GitHub: [https://github.com/zardulu/expense-tracker](https://github.com/zardulu/expense-tracker)  
Time to build: ~45 min with Codex + Cursor

## 🎥 Demo

[https://drive.google.com/file/d/1YW_d_VYI4IjuGmbK9qgg4rHr9Ip7BzN2/view?usp=sharing](https://drive.google.com/file/d/1YW_d_VYI4IjuGmbK9qgg4rHr9Ip7BzN2/view?usp=sharing)

## 🛠️ Tech Stack

- **Mobile:** React Native, Expo, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** SQLite
- **AI:** Groq (OpenAI-compatible API)

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- npm
- Expo CLI (optional; `npx expo` works too)
- Groq API key

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add your GROQ_API_KEY to .env
npm run dev
```

### Backend Tests

```bash
cd backend
npm test
```

Notes:

- Tests run with **Vitest** + **Supertest**.
- The AI parser is **mocked** in route tests, so tests don’t call Groq or require `GROQ_API_KEY`.
- SQLite runs in-memory during tests (`SQLITE_PATH=":memory:"`).

Health check:

```bash
curl http://localhost:3000/health
```

### Mobile

```bash
cd mobile
npm install
npm start
```

If testing on a physical device, `http://localhost:3000` won’t resolve from your phone. Update `API_BASE_URL` in `mobile/src/services/api.ts` to your machine’s LAN IP (e.g. `http://192.168.1.10:3000`).

## 📁 Project Structure

- `backend/`: Express API + SQLite + Groq parsing
- `mobile/`: Expo React Native app

## 🤖 AI Prompt Design

System prompt used for expense parsing (from `PROJECT.MD`):

```text
You are an expense parser. Extract expense information from natural language input.

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
}
```

**Why this approach:** Keeping the model output constrained to JSON and a fixed category set makes parsing reliable and reduces edge-case failures in the backend.

## ⏱️ Time Breakdown


| Task             | Time        |
| ---------------- | ----------- |
| Setup            | ~5 min      |
| Backend          | ~10 min     |
| AI Integration   | ~10 min     |
| Mobile App       | ~10 min     |
| Testing & Polish | ~10 min     |
| **Total**        | **~45 min** |


## 🔮 What I'd Add With More Time

- Analytics by category (monthly breakdown)
- Natural language query  - “How much did I spend on food last month?”
- Receipts - photo upload, optional OCR 
- Offline mode

## 📝 AI Tools Used

- Codex: planning + scaffolding
- Cursor: refactoring

Most helpful prompt: "You are an expense parser… RESPOND ONLY WITH VALID JSON…"

## 📜 License

MIT
