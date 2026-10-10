# How ExpenseFlow works

This file explains the app in plain words, so anyone (including me in an interview) can follow it.

## The big picture

There are 3 files that matter:

- `index.html` is the **skeleton**: the boxes, buttons and form.
- `style.css` is the **look**: colors, spacing, dark/light mode.
- `app.js` is the **brain**: it keeps the list of expenses, saves them, and draws the numbers and charts.

The app has no server. The list of expenses lives in a JavaScript array called `expenses`, and a copy is saved in the browser's `localStorage`.

## What happens when I add an expense

1. I type a description, an amount and a category, then press **Add**.
2. The form's `submit` listener in `app.js` runs. It reads the three fields.
3. It calls `addExpense()`, which builds an object like this and pushes it into the `expenses` array:

   ```js
   { id: "1791...", description: "Coffee", amount: 4.5,
     currency: "USD", category: "Coffee", date: "2026-10-10T08:00:00.000Z" }
   ```

4. `saveExpenses()` turns the array into text with `JSON.stringify` and stores it in `localStorage` under the key `expenseflow_data`.
5. `renderAll()` runs. It calls four functions that redraw the screen:
   - `renderStats()` updates the numbers (total, average, top category...)
   - `renderInsights()` writes the insight sentences
   - `renderCharts()` draws the 3 charts with Chart.js
   - `renderList()` rebuilds the expense list

So the path is: **button → function → object in the array → localStorage → screen**.

## What happens when I refresh the page

At the bottom of `app.js`, `loadAll()` reads `expenseflow_data` from `localStorage`, turns the text back into an array with `JSON.parse`, and `renderAll()` draws everything again. That is why the data is still there.

## Edit and delete

- **Edit (✏️):** `openEdit(id)` finds the expense with that id and fills the edit window. **Save Changes** calls `saveEdit()`, which updates the object, saves, and redraws.
- **Delete (✕):** `deleteExpense(id)` filters that id out of the array, saves, and redraws.

## Search

Typing in the search box sets `searchQuery` and calls `renderList()`. That function only shows expenses whose description or category contains the text.

## Currencies

Each expense remembers the currency it was added in. When I switch currency, `amt(e)` converts every amount using `cv()` and the `RATES` table. Rates come from `open.er-api.com` (cached for 12 hours). If that request fails, the built-in `FALLBACK_RATES` are used.

## Dark and light mode

The Theme button calls `toggleTheme()`. It sets `data-theme="light"` or `"dark"` on the `<html>` tag. In `style.css`, the colors are CSS variables, and the `[data-theme="light"]` block swaps them. The choice is saved in `localStorage`.

## PDF export

`downloadPDF()` uses jsPDF to build the report: a header, summary numbers, category breakdown, a table of all expenses, and the name from the "Your Name" window as the signature.

## Questions I should be ready to answer

1. Why use `localStorage` and not a database? (No server needed; data stays private; trade-off: only on one browser.)
2. What does `JSON.stringify` / `JSON.parse` do, and why are they needed? (`localStorage` only stores text.)
3. Why does `renderAll()` exist? (One place that redraws everything, so the screen always matches the data.)
4. What does `escapeHtml()` protect against? (Someone typing HTML or a script into the description.)
5. What would I add next? (Budgets per category, export to CSV, a date field in the add form.)
6. Which parts did AI help with, and how did I check it? (AI helped write and clean the code; I tested every feature and can explain each function.)
