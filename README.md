# 💰 ExpenseFlow — Personal Expense Tracker

A sleek, modern expense tracker that runs entirely in your browser. No backend, no sign-up — just open and go.

## Features
- ➕ Add expenses with category, amount, and description
- 📊 Live summary cards (total, by category, this month)
- 📈 Interactive chart of spending by category
- 🗑️ Delete any entry with one click
- 💾 Auto-saves to localStorage — your data persists between visits
- 📱 Fully responsive — works on phone, tablet, and desktop

## Tech Stack
- HTML5, CSS3, vanilla JavaScript (no frameworks, no dependencies)
- Chart.js (loaded via CDN) for the pie chart
- localStorage for data persistence

## How to Run
1. Clone the repo
2. Open `index.html` in any browser
3. Start tracking your expenses!

Or just visit the [live demo](#) (deploy to GitHub Pages — see below).

## Deploy to GitHub Pages
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Select **main** branch, `/ (root)` folder
4. Save — your app will be live at `https://<your-username>.github.io/<repo-name>/`

## Project Structure
```
ExpenseFlow/
├── index.html       # Main HTML structure
├── style.css        # All styling
├── app.js           # App logic (CRUD, chart, localStorage)
└── README.md        # You are here
```

## License
MIT — free to use, modify, and share.
