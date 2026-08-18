# 💰 ExpenseFlow — Personal Expense Tracker

A sleek, modern expense tracker that runs entirely in your browser. No backend, no sign-up — just open and go.

## Features
- ➕ Add expenses with category, amount, and description
- 📊 Live summary cards (total, by category, this month)
- 📈 Interactive doughnut chart of spending by category
- 🌍 **12 currencies supported** (USD, EUR, GBP, ETB, JPY, INR, CNY, NGN, KES, BRL, CAD, AUD)
- 🌙 **Dark/Light mode toggle** — switch themes with one click, auto-saves your preference
- 🗑️ Delete any entry with one click
- 💾 Auto-saves to localStorage — your data persists between visits
- 📱 Fully responsive — works on phone, tablet, and desktop

## Tech Stack
- HTML5, CSS3, vanilla JavaScript (no frameworks, no dependencies)
- Chart.js (loaded via CDN) for the doughnut chart
- localStorage for data persistence (expenses, theme & currency preferences)

## How to Run
1. Clone the repo
2. Open `index.html` in any browser
3. Start tracking your expenses!

Or just visit the [live demo](https://luelzelalem848-max.github.io/expenseflow/)

## Deploy to GitHub Pages
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Select **main** branch, `/ (root)` folder
4. Save — your app will be live at `https://<your-username>.github.io/<repo-name>/`

## Project Structure
```
ExpenseFlow/
├── index.html       # Main HTML structure
├── style.css        # All styling (dark + light themes)
├── app.js           # App logic (CRUD, chart, currency, theme, localStorage)
└── README.md        # You are here
```

## License
MIT — free to use, modify, and share.
