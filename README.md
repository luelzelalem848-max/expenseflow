# 💸 ExpenseFlow

A personal expense tracker that runs fully in your browser. No account, no server, no database. Your data stays on your device.

**Live demo:** https://luelzelalem848-max.github.io/expenseflow/

> Built with AI assistance. I (Luel) directed the project, tested it, and cleaned it up so I can explain every part. See [EXPLAIN.md](EXPLAIN.md).

## What it does

- Add an expense with a description, an amount and a category (44 categories)
- Edit or delete any expense, and search by description or category
- Summary numbers: total spent, this month, active days, number of entries, average per entry, daily average, biggest expense, top category
- 3 charts: spending by category, the last 7 days, and a category breakdown
- Spending insights written in plain sentences (biggest category, this month vs last month, and more)
- 10 currencies: USD, EUR, GBP, ETB, JPY, INR, KES, NGN, AED, SAR
- Live exchange rates from `open.er-api.com`, with built-in backup rates if the internet fails
- Dark and light mode (your choice is remembered)
- Export a PDF report with your name as the signature
- Everything is saved in your browser's `localStorage`

## Files

| File | What it is |
|------|------------|
| `index.html` | The one page: a short intro on top, the app below |
| `style.css` | All the styling (colors, layout, mobile) |
| `app.js` | All the logic (data, charts, PDF, buttons), with beginner comments |
| `EXPLAIN.md` | A walk-through of how the app works |
| `LICENSE` | MIT |

## Built with

- HTML, CSS and plain JavaScript (no framework, no build step)
- [Chart.js](https://www.chartjs.org/) for the charts (loaded from a CDN)
- [jsPDF](https://github.com/parallax/jsPDF) + AutoTable for the PDF (loaded from a CDN)

Because the libraries load from a CDN, you need an internet connection the first time you open it.

## Run it yourself

1. Download or clone this repo
2. Open `index.html` in your browser

That's it. There is nothing to install.

## Known limits

- Data lives only in one browser on one device. Clearing browser data deletes it.
- Exchange rates are for display only and are not financial advice.
