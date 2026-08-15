// ====== ExpenseFlow — App Logic ======

const STORAGE_KEY = 'expenseflow_data';

let expenses = [];
let chart = null;

// ---- Load from localStorage ----
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

// ---- Save to localStorage ----
function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// ---- Format currency ----
function formatMoney(amount) {
  return '$' + amount.toFixed(2);
}

// ---- Get category emoji ----
const categoryEmoji = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍️',
  Bills: '📄',
  Entertainment: '🎬',
  Health: '🏥',
  Other: '📦'
};

// ---- Render summary cards ----
function renderSummary() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById('totalSpent').textContent = formatMoney(total);
  document.getElementById('entryCount').textContent = expenses.length;

  const now = new Date();
  const monthTotal = expenses
    .filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);
  document.getElementById('monthSpent').textContent = formatMoney(monthTotal);
}

// ---- Render expense list ----
function renderList() {
  const ul = document.getElementById('expenseList');
  if (expenses.length === 0) {
    ul.innerHTML = '<li class="empty-state">No expenses yet. Add one above! 👆</li>';
    return;
  }

  ul.innerHTML = expenses
    .slice()
    .reverse()
    .map(e => `
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
    `)
    .join('');
}

// ---- Render chart ----
function renderChart() {
  const ctx = document.getElementById('categoryChart').getContext('2d');

  // Group by category
  const byCategory = {};
  expenses.forEach(e => {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
  });

  const labels = Object.keys(byCategory);
  const data = Object.values(byCategory);

  const colors = [
    '#6366f1', '#22c55e', '#f59e0b', '#ef4444',
    '#3b82f6', '#ec4899', '#a855f7'
  ];

  if (chart) chart.destroy();

  if (labels.length === 0) {
    chart = null;
    return;
  }

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#94a3b8',
            font: { size: 11 },
            padding: 12
          }
        }
      }
    }
  });
}

// ---- Add expense ----
function addExpense(description, amount, category) {
  const expense = {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
    description,
    amount: parseFloat(amount),
    category,
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

// ---- Render everything ----
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
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ---- Form submit ----
document.getElementById('expenseForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const desc = document.getElementById('description').value.trim();
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;

  if (!desc || !amount || !category) return;

  addExpense(desc, amount, category);

  // Reset form
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('category').value = '';
  document.getElementById('description').focus();
});

// ---- Init ----
loadExpenses();
renderAll();
