// ====== ExpenseFlow — App Logic (v3: Commas, More Categories, PDF Export) ======

const STORAGE_KEY = 'expenseflow_data';
const THEME_KEY = 'expenseflow_theme';
const CURRENCY_KEY = 'expenseflow_currency';

let expenses = [];
let chart = null;

// ---- Currency definitions ----
const currencies = {
  USD: { symbol: '$', label: 'USD' },
  EUR: { symbol: '€', label: 'EUR' },
  GBP: { symbol: '£', label: 'GBP' },
  ETB: { symbol: 'Br', label: 'ETB' },
  JPY: { symbol: '¥', label: 'JPY' },
  INR: { symbol: '₹', label: 'INR' },
  CNY: { symbol: '¥', label: 'CNY' },
  NGN: { symbol: '₦', label: 'NGN' },
  KES: { symbol: 'KSh', label: 'KES' },
  BRL: { symbol: 'R$', label: 'BRL' },
  CAD: { symbol: 'C$', label: 'CAD' },
  AUD: { symbol: 'A$', label: 'AUD' },
  ZAR: { symbol: 'R', label: 'ZAR' },
  EGP: { symbol: 'E£', label: 'EGP' },
  GHS: { symbol: '₵', label: 'GHS' },
  UGX: { symbol: 'USh', label: 'UGX' },
  TZS: { symbol: 'TSh', label: 'TZS' },
  RWF: { symbol: 'FRw', label: 'RWF' },
  AED: { symbol: 'AED', label: 'AED' },
  SAR: { symbol: 'SAR', label: 'SAR' }
};

let currentCurrency = 'USD';

// ---- Load currency ----
function loadCurrency() {
  const saved = localStorage.getItem(CURRENCY_KEY);
  if (saved && currencies[saved]) {
    currentCurrency = saved;
  }
  document.getElementById('currencySelect').value = currentCurrency;
}

// ---- Save currency ----
function saveCurrency() {
  localStorage.setItem(CURRENCY_KEY, currentCurrency);
}

// ---- Format money with commas ----
function formatMoney(amount) {
  const c = currencies[currentCurrency];
  if (currentCurrency === 'JPY') {
    return c.symbol + Math.round(amount).toLocaleString('en-US');
  }
  return c.symbol + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ---- Theme ----
function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (theme === 'light') {
    icon.textContent = '🌙';
  } else {
    icon.textContent = '☀️';
  }
  if (expenses.length > 0) {
    renderChart();
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}

// ---- Load expenses ----
function loadExpenses() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      expenses = JSON.parse(saved);
    } catch (e) {
      expenses = [];
    }
  }
}

// ---- Save expenses ----
function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// ---- Category emoji map (covers all new categories) ----
const categoryEmoji = {
  'Food': '🍔', 'Groceries': '🛒', 'Restaurants': '🍽️', 'Coffee': '☕',
  'Drinks': '🍺', 'Snacks': '🍫',
  'Transport': '🚗', 'Fuel': '⛽', 'Public Transport': '🚌', 'Taxi/Ride': '🚕',
  'Parking': '🅿️', 'Vehicle Maintenance': '🔧',
  'Shopping': '🛍️', 'Clothing': '👕', 'Electronics': '📱', 'Home': '🏠', 'Gifts': '🎁',
  'Bills': '📄', 'Rent': '🏠', 'Electricity': '⚡', 'Water': '💧', 'Internet': '🌐',
  'Phone': '📱', 'Insurance': '🛡️', 'Subscriptions': '🔁',
  'Entertainment': '🎬', 'Movies': '🎥', 'Music': '🎵', 'Games': '🎮',
  'Sports': '⚽', 'Travel': '✈️', 'Hobbies': '🎨',
  'Health': '🏥', 'Medicine': '💊', 'Doctor': '👨‍⚕️', 'Dental': '🦷',
  'Gym': '💪', 'Mental Health': '🧠',
  'Education': '🎓', 'Tuition': '🏫', 'Books': '📚', 'Courses': '💻',
  'Personal Care': '💄', 'Haircut': '✂️', 'Kids': '🧒', 'Pets': '🐾',
  'Charity': '❤️',
  'Other': '📦', 'Business': '💼', 'Fees': '🏦', 'Taxes': '🏛️'
};

// ---- Chart colors ----
function getChartColors() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  return { legendColor: isLight ? '#64748b' : '#94a3b8' };
}

// ---- Render summary ----
function renderSummary() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById('totalSpent').textContent = formatMoney(total);
  document.getElementById('entryCount').textContent = expenses.length.toLocaleString('en-US');

  const now = new Date();
  const monthTotal = expenses
    .filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);
  document.getElementById('monthSpent').textContent = formatMoney(monthTotal);
}

// ---- Render list ----
function renderList() {
  const ul = document.getElementById('expenseList');
  if (expenses.length === 0) {
    ul.innerHTML = '<li class="empty-state">No expenses yet. Add one above! 👆</li>';
    return;
  }

  ul.innerHTML = expenses.slice().reverse().map(e => `
    <li>
      <div class="expense-info">
        <span class="expense-desc">${categoryEmoji[e.category] || '📦'} ${escapeHtml(e.description)}</span>
        <span class="expense-meta">${e.category} · ${formatDate(e.date)}</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="expense-amount">${formatMoney(e.amount)}</span>
        <button class="btn-delete" onclick="deleteExpense('${e.id}')" title="Delete">✕</button>
      </div>
    </li>
  `).join('');
}

// ---- Render chart ----
function renderChart() {
  const ctx = document.getElementById('categoryChart').getContext('2d');
  const byCategory = {};
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });
  const labels = Object.keys(byCategory);
  const data = Object.values(byCategory);
  const colors = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#a855f7', '#14b8a6', '#f97316', '#8b5cf6', '#06b6d4', '#84cc16'];

  if (chart) chart.destroy();
  if (labels.length === 0) { chart = null; return; }

  const chartColors = getChartColors();
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors.slice(0, labels.length), borderWidth: 0 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: chartColors.legendColor, font: { size: 11 }, padding: 12 } } }
    }
  });
}

// ---- Add expense ----
function addExpense(description, amount, category) {
  const expense = {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
    description, amount: parseFloat(amount), category,
    date: new Date().toISOString()
  };
  expenses.push(expense);
  saveExpenses();
  renderAll();
}

// ---- Delete expense ----
function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  saveExpenses();
  renderAll();
}

// ---- Download PDF ----
function downloadPDF() {
  if (expenses.length === 0) {
    alert('No expenses to download. Add some first! 👆');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const c = currencies[currentCurrency];

  // Title
  doc.setFontSize(20);
  doc.setTextColor(99, 102, 241);
  doc.text('ExpenseFlow — Expense Report', 14, 22);

  // Date generated
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text('Generated: ' + new Date().toLocaleString('en-US'), 14, 30);

  // Summary line
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text(`Total Expenses: ${formatMoney(total)}  |  Entries: ${expenses.length}  |  Currency: ${c.label}`, 14, 40);

  // Table
  const tableData = expenses.slice().reverse().map((e, i) => [
    i + 1,
    e.description,
    e.category,
    formatDate(e.date),
    formatMoney(e.amount)
  ]);

  doc.autoTable({
    head: [['#', 'Description', 'Category', 'Date', 'Amount']],
    body: tableData,
    startY: 48,
    theme: 'striped',
    headStyles: { fillColor: [99, 102, 241], textColor: 255, fontSize: 11 },
    bodyStyles: { fontSize: 10 },
    alternateRowStyles: { fillColor: [241, 245, 249] },
    columnStyles: {
      0: { cellWidth: 12 },
      4: { halign: 'right' }
    }
  });

  // Footer total
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setTextColor(99, 102, 241);
  doc.text(`Total: ${formatMoney(total)}`, 14, finalY);

  // Save
  doc.save(`expenseflow-report-${new Date().toISOString().slice(0, 10)}.pdf`);
}

// ---- Render all ----
function renderAll() {
  renderSummary();
  renderList();
  renderChart();
}

// ---- Helpers ----
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ---- Event Listeners ----
document.getElementById('expenseForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const desc = document.getElementById('description').value.trim();
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  if (!desc || !amount || !category) return;
  addExpense(desc, amount, category);
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('category').value = '';
  document.getElementById('description').focus();
});

document.getElementById('currencySelect').addEventListener('change', function (e) {
  currentCurrency = e.target.value;
  saveCurrency();
  renderAll();
});

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('downloadPdf').addEventListener('click', downloadPDF);

// ---- Init ----
loadTheme();
loadCurrency();
loadExpenses();
renderAll();
