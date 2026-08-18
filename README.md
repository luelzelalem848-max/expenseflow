# 💰 ExpenseFlow — Personal Expense Tracker

A sleek, modern expense tracker that runs entirely in your browser. No backend, no sign-up — just open and go.

## Features
- ➕ Add expenses with category, amount, and description
- 📊 Live summary cards (total, by category, this month)
- 📈 Interactive doughnut chart of spending by category
- 🌍 **20 currencies supported** (USD, EUR, GBP, ETB, JPY, INR, CNY, NGN, KES, BRL, CAD, AUD, ZAR, EGP, GHS, UGX, TZS, RWF, AED, SAR)
- 🌙 **Dark/Light mode toggle** — switch themes with one click, auto-saves your preference
- 📄 **Download PDF report** — export all your expenses as a clean PDF with table and totals
- 🔢 **Commas in all numbers** — $1,234.56 instead of $1234.56
- 🏷️ **40+ categories** organized into groups: Food & Drinks, Transport, Shopping, Bills, Entertainment, Health, Education, Personal, and more
- 🗑️ Delete any entry with one click
- 💾 Auto-saves to localStorage — your data persists between visits
- 📱 Fully responsive — works on phone, tablet, and desktop

## Tech Stack
- HTML5, CSS3, vanilla JavaScript (no frameworks)
- Chart.js (CDN) for the doughnut chart
- jsPDF + AutoTable (CDN) for PDF export
- localStorage for data persistence

## How to Run
1. Clone the repo
2. Open `index.html` in any browser
3. Start tracking your expenses!

Or visit the [live demo](https://luelzelalem848-max.github.io/expenseflow/)

## Deploy to GitHub Pages
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Select **main** branch, `/ (root)` folder
4. Save — your app will be live

## Project Structure
```
ExpenseFlow/
├── index.html       # Main HTML structure
├── style.css        # All styling (dark + light themes)
├── app.js           # App logic (CRUD, chart, currency, theme, PDF export)
└── README.md        # You are here
```

## License
MIT — free to use, modify, and share.
