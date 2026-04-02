Welcome, AI-Native Developer! 🤖
This assessment is designed for developers who build with AI, not despite it.
We want to see how effectively you can leverage AI coding assistants (Claude, Cursor, Copilot, ChatGPT) to build a complete, working feature. The faster and smarter you use AI, the better.
Our philosophy: The best developers in 2025 aren't those who memorize syntax — they're those who can direct AI to build exactly what they envision, debug intelligently, and ship fast.

⏱️ Time Estimate (With AI Assistance)
TaskWithout AIWith AIYou Should TargetProject Setup20 min5 min5 minDatabase Schema15 min5 min5 minBackend API45 min15 min15 minAI Integration30 min10 min10 minReact Native App60 min25 min25 minConnect & Test20 min10 min10 minPolish & README20 min10 min10 minTOTAL3.5 hours1.5 hours~1.5-2 hours
If you're spending more than 2.5 hours, you're not using AI effectively enough.

🎁 What's In It For You?
This isn't free work for us — this is YOUR portfolio piece.
You Own This Completely

The code is 100% yours
Publish it as an open-source project
Add it to your portfolio
Launch it as a free app for the finance community

We'll Help You Promote It
If you choose to publish your expense tracker app, Grade's marketing team will promote it across our developer networks and social channels. This is a genuine personal branding opportunity — your name, your app, our amplification.
You'll Learn
Even if this role isn't the right fit, you'll walk away with:

AI-assisted full-stack development experience
A working app you built in under 2 hours
Prompt templates you can reuse forever


📋 The Challenge: AI Expense Tracker
Build a mini expense tracker where users can add expenses using natural language, and AI automatically categorizes them.
The User Experience
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   💰 AI Expense Tracker                                     │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  "Spent 850 on lunch with client at Taj"      [Add] │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│        ↓ AI automatically extracts & categorizes ↓         │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  ✅ Added Successfully!                              │   │
│   │                                                     │   │
│   │  Amount: ₹850                                       │   │
│   │  Category: 🍔 Food & Dining                         │   │
│   │  Description: Lunch with client                     │   │
│   │  Merchant: Taj                                      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   Recent Expenses                                           │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ 🍔 Food & Dining                         ₹850       │   │
│   │    Lunch with client at Taj                         │   │
│   │    2 minutes ago                          [Delete]  │   │
│   ├─────────────────────────────────────────────────────┤   │
│   │ 🚗 Transport                             ₹450       │   │
│   │    Uber to airport                                  │   │
│   │    1 hour ago                             [Delete]  │   │
│   ├─────────────────────────────────────────────────────┤   │
│   │ 📺 Entertainment                         ₹649       │   │
│   │    Netflix subscription                             │   │
│   │    Yesterday                              [Delete]  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

🏗️ System Architecture
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  USER: "uber to office 350 rupees"                              │
│                          │                                       │
│                          ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                 📱 REACT NATIVE APP                         │ │
│  │                                                            │ │
│  │  • Text input for natural language                         │ │
│  │  • Submit button with loading state                        │ │
│  │  • Success/error feedback                                  │ │
│  │  • List of expenses with pull-to-refresh                   │ │
│  │  • Delete functionality                                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          │                                       │
│                          │ HTTP Request                          │
│                          ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                 🖥️ NODE.JS BACKEND                          │ │
│  │                                                            │ │
│  │  POST /api/expenses     ← Add new expense                  │ │
│  │    1. Receive natural language input                       │ │
│  │    2. Call AI API to parse                                 │ │
│  │    3. Validate AI response                                 │ │
│  │    4. Save to database                                     │ │
│  │    5. Return structured expense                            │ │
│  │                                                            │ │
│  │  GET /api/expenses      ← Get all expenses                 │ │
│  │  DELETE /api/expenses/:id ← Delete expense                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          │                                       │
│            ┌─────────────┴─────────────┐                        │
│            ▼                           ▼                        │
│  ┌──────────────────┐       ┌──────────────────────┐           │
│  │   🤖 AI API      │       │   🗄️ DATABASE        │           │
│  │                  │       │                      │           │
│  │  Groq / OpenAI / │       │  SQLite / PostgreSQL │           │
│  │  Gemini / Claude │       │                      │           │
│  │                  │       │  expenses table:     │           │
│  │  Input: text     │       │  - id                │           │
│  │  Output: {       │       │  - amount            │           │
│  │    amount,       │       │  - currency          │           │
│  │    category,     │       │  - category          │           │
│  │    description,  │       │  - description       │           │
│  │    merchant      │       │  - merchant          │           │
│  │  }               │       │  - original_input    │           │
│  └──────────────────┘       │  - created_at        │           │
│                             └──────────────────────┘           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

📝 Step-by-Step Instructions
STEP 1: Project Setup (5 minutes with AI)
What to do:
Create a monorepo or two separate folders for backend and mobile app.
Folder Structure:
ai-expense-tracker/
├── backend/
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── src/
│       ├── index.js (or index.ts)
│       ├── routes/
│       ├── services/
│       └── database/
│
├── mobile/
│   ├── package.json
│   ├── App.tsx
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   └── types/
│   └── ...
│
└── README.md
🤖 AI Prompt to Use:
Create the folder structure and initial setup for a full-stack project with:

1. Backend: Node.js with Express and TypeScript
   - Setup express server on port 3000
   - Add cors middleware
   - Add JSON body parser
   - Create a basic health check endpoint GET /health

2. Mobile: React Native with Expo and TypeScript
   - Initialize with expo
   - Setup basic navigation structure
   
Give me the terminal commands and initial file contents.

STEP 2: Database Setup (5 minutes with AI)
What to do:
Create a SQLite database with an expenses table.
Database Schema:
ColumnTypeDescriptionidINTEGERPrimary key, auto-incrementamountDECIMAL(10,2)Expense amountcurrencyVARCHAR(3)Currency code (INR, USD, etc.)categoryVARCHAR(50)Category namedescriptionTEXTWhat the expense was formerchantVARCHAR(100)Where the money was spent (nullable)original_inputTEXTThe original text user enteredcreated_atTIMESTAMPWhen the expense was added
Categories to Support:

🍔 Food & Dining
🚗 Transport
🛒 Shopping
📺 Entertainment
📄 Bills & Utilities
💊 Health
✈️ Travel
📦 Other

🤖 AI Prompt to Use:
Create a SQLite database setup for a Node.js Express app with TypeScript.

I need:
1. Database connection using better-sqlite3
2. An expenses table with these columns:
   - id (auto-increment primary key)
   - amount (decimal)
   - currency (string, default 'INR')
   - category (string)
   - description (text)
   - merchant (string, nullable)
   - original_input (text)
   - created_at (timestamp, default now)

3. A function to initialize the database and create table if not exists
4. Basic CRUD functions: createExpense, getAllExpenses, deleteExpense

Use TypeScript interfaces for type safety.

STEP 3: AI Integration Service (10 minutes with AI)
What to do:
Create a service that calls an AI API to parse natural language expense input.
Input: "Spent 850 on lunch with client at Taj Hotel"
Expected Output:
json{
  "amount": 850,
  "currency": "INR",
  "category": "Food & Dining",
  "description": "Lunch with client",
  "merchant": "Taj Hotel"
}
🤖 AI Prompt to Use for Creating the Service:
Create a TypeScript service for Node.js that calls an AI API to parse expense text.

Requirements:
1. Use Groq API (or OpenAI-compatible API)
2. Function: parseExpense(text: string) => Promise<ParsedExpense>
3. Handle API errors gracefully
4. Validate AI response matches expected schema
5. Default to 'INR' if no currency mentioned
6. Default to 'Other' if category can't be determined
7. Return null for merchant if not mentioned

Interface:
interface ParsedExpense {
  amount: number;
  currency: string;
  category: string;
  description: string;
  merchant: string | null;
}

Use environment variable for API key.
🤖 AI System Prompt for Expense Parsing (Use This in Your App):
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
Test Inputs to Verify Your AI Integration:
InputExpected Output"Spent 850 on lunch at Taj"amount: 850, category: Food & Dining, merchant: Taj"uber to airport 450"amount: 450, category: Transport, merchant: Uber"Netflix 649"amount: 649, category: Entertainment, merchant: Netflix"bought shoes 4500"amount: 4500, category: Shopping, merchant: null"electricity bill 2300"amount: 2300, category: Bills & Utilities"coffee"error response (no amount)"asdfghjkl"error response (unparseable)

STEP 4: Backend API Endpoints (15 minutes with AI)
What to do:
Create three REST API endpoints.
Endpoint 1: Add Expense
POST /api/expenses

Request Body:
{
  "input": "Spent 850 on lunch at Taj Hotel"
}

Success Response (201):
{
  "success": true,
  "expense": {
    "id": 1,
    "amount": 850,
    "currency": "INR",
    "category": "Food & Dining",
    "description": "Lunch at Taj Hotel",
    "merchant": "Taj Hotel",
    "original_input": "Spent 850 on lunch at Taj Hotel",
    "created_at": "2025-01-20T10:30:00Z"
  }
}

Error Response (400):
{
  "success": false,
  "error": "Could not parse expense. Please include an amount."
}
Endpoint 2: Get All Expenses
GET /api/expenses

Success Response (200):
{
  "success": true,
  "expenses": [
    {
      "id": 2,
      "amount": 450,
      "currency": "INR",
      "category": "Transport",
      "description": "Uber to airport",
      "merchant": "Uber",
      "original_input": "uber to airport 450",
      "created_at": "2025-01-20T10:00:00Z"
    },
    {
      "id": 1,
      "amount": 850,
      "currency": "INR",
      "category": "Food & Dining",
      "description": "Lunch at Taj Hotel",
      "merchant": "Taj Hotel",
      "original_input": "Spent 850 on lunch at Taj Hotel",
      "created_at": "2025-01-20T09:30:00Z"
    }
  ]
}
Endpoint 3: Delete Expense
DELETE /api/expenses/:id

Success Response (200):
{
  "success": true,
  "message": "Expense deleted successfully"
}

Error Response (404):
{
  "success": false,
  "error": "Expense not found"
}
🤖 AI Prompt to Use:
Create Express.js routes in TypeScript for an expense tracker API.

I have these existing services:
- parseExpense(text: string): Promise<ParsedExpense> - calls AI to parse text
- createExpense(expense: ExpenseInput): Expense - saves to SQLite
- getAllExpenses(): Expense[] - returns all expenses, newest first
- deleteExpense(id: number): boolean - deletes expense, returns success

Create these endpoints:

1. POST /api/expenses
   - Receives { input: string }
   - Calls parseExpense to get structured data
   - If parsing fails, return 400 with error message
   - If success, save to database and return 201 with expense

2. GET /api/expenses
   - Returns all expenses from database
   - Newest first

3. DELETE /api/expenses/:id
   - Deletes expense by ID
   - Returns 404 if not found
   - Returns 200 on success

Include:
- Input validation
- Try-catch error handling
- Proper HTTP status codes
- Consistent response format: { success: boolean, data/error: ... }

STEP 5: React Native App (25 minutes with AI)
What to do:
Build a single-screen app with input, list, and delete functionality.
Component Breakdown:
App.tsx
└── ExpenseTrackerScreen
    ├── Header ("AI Expense Tracker" title)
    ├── ExpenseInput
    │   ├── TextInput
    │   ├── AddButton
    │   └── LoadingIndicator
    ├── SuccessCard (shown after adding)
    │   └── Parsed expense details
    └── ExpenseList
        ├── Pull-to-refresh
        └── ExpenseItem (multiple)
            ├── Category icon + name
            ├── Amount
            ├── Description
            ├── Time ago
            └── DeleteButton
🤖 AI Prompt for Main Screen:
Create a React Native screen with TypeScript for an AI expense tracker.

The screen should have:

1. HEADER
   - Title: "AI Expense Tracker"
   - Subtitle: "Add expenses in plain English"

2. INPUT SECTION
   - TextInput with placeholder "e.g., Spent 500 on groceries at BigBazaar"
   - Add button (disabled when empty or loading)
   - Show loading spinner on button while submitting

3. SUCCESS FEEDBACK (show for 3 seconds after adding)
   - Green card showing parsed expense details
   - Amount, category, description, merchant

4. EXPENSE LIST
   - FlatList of expenses
   - Pull-to-refresh to reload
   - Each item shows:
     - Category emoji + name (left)
     - Amount in ₹ (right, bold)
     - Description (below, gray)
     - Relative time "2 hours ago" (below)
     - Delete icon button (right side)
   - Empty state: "No expenses yet. Add your first one!"

5. ERROR HANDLING
   - Show error toast/alert if API fails
   - Show error message if expense couldn't be parsed

Use these category emojis:
- Food & Dining: 🍔
- Transport: 🚗
- Shopping: 🛒
- Entertainment: 📺
- Bills & Utilities: 📄
- Health: 💊
- Travel: ✈️
- Other: 📦

API Base URL should be configurable (use environment variable or constant).

Style with a clean, modern look. White background, subtle shadows on cards.
🤖 AI Prompt for API Service:
Create a TypeScript API service for React Native to connect to my expense tracker backend.

Backend URL: http://localhost:3000 (make configurable)

Functions needed:

1. addExpense(input: string): Promise<Expense>
   - POST /api/expenses with { input }
   - Returns the created expense
   - Throws error with message if failed

2. getExpenses(): Promise<Expense[]>
   - GET /api/expenses
   - Returns array of expenses

3. deleteExpense(id: number): Promise<void>
   - DELETE /api/expenses/:id
   - Throws error if failed

Types:
interface Expense {
  id: number;
  amount: number;
  currency: string;
  category: string;
  description: string;
  merchant: string | null;
  original_input: string;
  created_at: string;
}

Include:
- Proper error handling
- Timeout handling (10 second timeout)
- Type safety
🤖 AI Prompt for Delete Confirmation:
Add delete functionality to my expense list item in React Native.

When user taps delete button:
1. Show confirmation alert: "Delete this expense?"
2. If confirmed, call deleteExpense(id) API
3. Show loading state on that item while deleting
4. On success, remove from list (optimistic update or refetch)
5. On error, show error toast and restore item

Use React Native's Alert.alert for confirmation.

STEP 6: Connect & Test (10 minutes)
Testing Checklist:
Test CaseExpected Result✓Add "spent 500 on coffee"Expense added, shows in listAdd "uber 350"Categorized as TransportAdd "netflix subscription 649"Categorized as Entertainment, merchant: NetflixAdd "coffee" (no amount)Shows error messageAdd random text "asdfgh"Shows error messagePull down on listList refreshesTap delete on expenseConfirmation shownConfirm deleteExpense removed from listCancel deleteExpense stays in listKill app, reopenPrevious expenses still there
🤖 AI Prompt for Debugging:
I'm getting this error in my React Native app:

[PASTE ERROR HERE]

Here's the relevant code:

[PASTE CODE HERE]

What's wrong and how do I fix it?

STEP 7: Polish & Documentation (10 minutes)
README.md Template:
markdown# AI Expense Tracker

A full-stack expense tracking app that uses AI to parse natural language input.

Built by: [YOUR NAME]
GitHub: [YOUR GITHUB]
Time to build: [X hours] (with AI assistance)

## 🎥 Demo

[Link to your screen recording]

## 🛠️ Tech Stack

- **Mobile:** React Native, Expo, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** SQLite
- **AI:** [Groq/OpenAI/Gemini] API

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- [AI Service] API key

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your AI API key to .env
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npm start
# Scan QR code with Expo Go app
```

## 📁 Project Structure

[Brief explanation]

## 🤖 AI Prompt Design

I used this system prompt for expense parsing:
[Your prompt here]

**Why this approach:**
[1-2 sentences explaining your prompt design choices]

## ⏱️ Time Breakdown

| Task | Time |
|------|------|
| Setup | X min |
| Backend | X min |
| AI Integration | X min |
| Mobile App | X min |
| Testing & Polish | X min |
| **Total** | **X hours** |

## 🔮 What I'd Add With More Time

- [ ] Improvement 1
- [ ] Improvement 2
- [ ] Improvement 3

## 📝 AI Tools Used

- [Tool 1]: Used for [what]
- [Tool 2]: Used for [what]

Most helpful prompt: "[Your most useful prompt]"

## 📜 License

MIT - Feel free to use this for your own projects!

🆓 Free AI APIs
ProviderFree TierSignupRecommended ModelGroq ⭐30 req/min freeconsole.groq.comllama-3.1-70b-versatileGoogle Gemini60 req/min freemakersuite.google.comgemini-1.5-flashOpenAI$5 creditplatform.openai.comgpt-4o-miniAnthropicFree tierconsole.anthropic.comclaude-3-haiku
We recommend Groq — It's fast, free, and has a generous rate limit.

✅ Submission Checklist
Required:

 GitHub repository (public or invite us)
 Backend code runs with npm start
 Mobile app runs with expo start
 .env.example file (never commit real API keys!)
 README with setup instructions
 2-3 minute screen recording showing:

 Adding an expense with natural language
 AI correctly parsing and categorizing
 Expense appearing in list
 Deleting an expense
 Handling invalid input (error case)



Bonus (Optional):

 Particularly clean code organization
 Thoughtful error handling
 Beautiful UI polish
 Unit tests
 Offline support
 Edit expense functionality


🏆 Evaluation Criteria
CriteriaWeightWhat We Look ForIt Works30%Does the full flow work end-to-end?AI Usage Efficiency25%Did you use AI smartly? Good prompts? Fast execution?Code Quality20%Clean, readable, well-organized codeAI Integration15%Good system prompt, handles edge casesUX Polish10%Loading states, error handling, smooth experience
We specifically value:

Clever use of AI to write code faster
Evidence of AI assistance in your workflow (mention in README)
Clean prompts that get good results
Knowing when to guide AI vs. let it generate


💡 Pro Tips

Start with backend — Get AI parsing working first, test with curl or Postman
Let AI write boilerplate — Setup code, types, basic components
Be specific in prompts — "Create a React Native FlatList" > "Create a list"
Iterate fast — Don't perfect one thing, get everything working first
Commit often — We look at git history to see your process
Time-box yourself — If stuck for 15+ min, ask AI differently or skip
Test edge cases — Empty input, API failure, weird text