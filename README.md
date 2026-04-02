# AI Expense Tracker

A full-stack expense tracking app that uses AI to parse natural language input.

Built by: Ansh  
GitHub: (add your link)  
Time to build: (fill in)

## 🎥 Demo

(add your screen recording link)

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

| Task | Time |
|------|------|
| Setup | (fill in) |
| Backend | (fill in) |
| AI Integration | (fill in) |
| Mobile App | (fill in) |
| Testing & Polish | (fill in) |
| **Total** | **(fill in)** |

## 🔮 What I'd Add With More Time

- [ ] Persist API base URL via env/config for device testing
- [ ] Edit expense functionality
- [ ] Basic analytics by category (monthly breakdown)

## 📝 AI Tools Used

- Cursor: scaffolding + iteration
- LLM-assisted prompts from `PROJECT.MD`

Most helpful prompt: "You are an expense parser… RESPOND ONLY WITH VALID JSON…"

## 📜 License

MIT

