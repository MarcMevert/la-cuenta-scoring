'use strict';

/* ── constants ────────────────────────────────────────────── */
const STARTING_SAVINGS = { 3: 900, 4: 1000, 5: 1100, 6: 1200, 7: 1300, 8: 1400 };

/* ── state ────────────────────────────────────────────────── */
let state = {
  players: [],   // [{ name, savings, eliminated }]
  round: 0,
  history: []    // [{ bills: [{ name, amount }] }]
};

/* ── helpers ──────────────────────────────────────────────── */
function fmt(n) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

function saveState() {
  localStorage.setItem('lacuenta', JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem('lacuenta');
    if (raw) state = JSON.parse(raw);
  } catch (_) { /* ignore */ }
}

/* ── screens ──────────────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ── SCREEN 1 : setup ─────────────────────────────────────── */
function initSetup() {
  const countBtns = document.querySelectorAll('.count-btn');
  const nameSection = document.getElementById('name-section');
  const nameInputs = document.getElementById('name-inputs');
  const startBtn = document.getElementById('start-btn');

  let selectedCount = null;

  countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      countBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedCount = parseInt(btn.dataset.count, 10);
      renderNameInputs(selectedCount);
      nameSection.classList.remove('hidden');
    });
  });

  function renderNameInputs(n) {
    nameInputs.innerHTML = '';
    for (let i = 1; i <= n; i++) {
      const label = document.createElement('label');
      label.textContent = `Player ${i}`;
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 3;
      input.placeholder = `P${i}`.toUpperCase();
      input.dataset.player = i;
      input.classList.add('name-input');
      input.addEventListener('input', () => {
        input.value = input.value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 3);
      });
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const inputs = nameInputs.querySelectorAll('.name-input');
          const idx = Array.from(inputs).indexOf(input);
          if (idx < inputs.length - 1) inputs[idx + 1].focus();
          else startBtn.focus();
        }
      });
      const wrapper = document.createElement('div');
      wrapper.classList.add('name-row');
      wrapper.appendChild(label);
      wrapper.appendChild(input);
      nameInputs.appendChild(wrapper);
    }
    startBtn.classList.remove('hidden');
  }

  startBtn.addEventListener('click', () => {
    if (!selectedCount) return;
    const inputs = nameInputs.querySelectorAll('.name-input');
    const players = Array.from(inputs).map((inp, i) => {
      const raw = inp.value.trim().toUpperCase();
      return raw.length > 0 ? raw : `P${i + 1}`.toUpperCase();
    });
    startGame(selectedCount, players);
  });
}

/* ── start game ───────────────────────────────────────────── */
function startGame(count, names) {
  const savings = STARTING_SAVINGS[count];
  state = {
    players: names.map(name => ({ name, savings, eliminated: false })),
    round: 0,
    history: []
  };
  saveState();
  renderGame();
  showScreen('screen-game');
}

/* ── SCREEN 2 : game ──────────────────────────────────────── */
function renderGame() {
  renderScoreboard();
  renderRoundForm();
}

function renderScoreboard() {
  const board = document.getElementById('scoreboard');
  board.innerHTML = '';
  state.players.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('player-card');
    if (p.eliminated) card.classList.add('eliminated');

    const bust = p.savings < 0;

    const nameEl = document.createElement('div');
    nameEl.classList.add('player-name');
    nameEl.textContent = p.name;

    const savingsEl = document.createElement('div');
    savingsEl.classList.add('player-savings');
    if (bust) savingsEl.classList.add('bust');
    savingsEl.textContent = fmt(p.savings);

    card.appendChild(nameEl);
    card.appendChild(savingsEl);
    board.appendChild(card);
  });
}

function renderRoundForm() {
  const activePlayers = state.players.filter(p => !p.eliminated);

  const form = document.getElementById('round-form');
  form.innerHTML = '';

  // round label
  const roundLabel = document.getElementById('round-label');
  roundLabel.textContent = `Round ${state.round + 1}`;

  if (activePlayers.length <= 1) {
    renderWinner();
    return;
  }

  activePlayers.forEach(p => {
    const row = document.createElement('div');
    row.classList.add('bill-row');

    const label = document.createElement('label');
    label.textContent = p.name;

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.step = '1';
    input.placeholder = '0';
    input.dataset.player = p.name;
    input.classList.add('bill-input');
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const inputs = form.querySelectorAll('.bill-input');
        const idx = Array.from(inputs).indexOf(input);
        if (idx < inputs.length - 1) inputs[idx + 1].focus();
        else document.getElementById('submit-round').focus();
      }
    });

    row.appendChild(label);
    row.appendChild(input);
    form.appendChild(row);
  });

  // focus first
  const first = form.querySelector('.bill-input');
  if (first) first.focus();
}

function submitRound() {
  const inputs = document.querySelectorAll('.bill-input');
  const bills = [];

  inputs.forEach(inp => {
    const name = inp.dataset.player;
    const amount = parseInt(inp.value, 10) || 0;
    bills.push({ name, amount });
  });

  // apply bills
  bills.forEach(b => {
    const p = state.players.find(p => p.name === b.name);
    if (p) p.savings -= b.amount;
  });

  // mark eliminated (savings < 0 = bust → eliminated)
  state.players.forEach(p => {
    if (!p.eliminated && p.savings < 0) p.eliminated = true;
  });

  state.history.push({ round: state.round + 1, bills });
  state.round += 1;
  saveState();
  renderGame();
  renderHistory();
}

function renderWinner() {
  const form = document.getElementById('round-form');
  const roundLabel = document.getElementById('round-label');
  const submitBtn = document.getElementById('submit-round');
  const undoBtn = document.getElementById('undo-btn');

  const winners = state.players.filter(p => !p.eliminated);
  const winner = winners[0];

  roundLabel.textContent = 'Game Over';
  submitBtn.classList.add('hidden');
  undoBtn.classList.add('hidden');

  const msg = document.createElement('div');
  msg.classList.add('winner-msg');
  msg.innerHTML = `🏆 <strong>${winner ? winner.name : '?'}</strong> wins!<br><span>${winner ? fmt(winner.savings) : ''} remaining</span>`;
  form.appendChild(msg);
}

/* ── undo last round ──────────────────────────────────────── */
function undoRound() {
  if (state.round === 0 || state.history.length === 0) return;

  const last = state.history.pop();

  // restore savings
  last.bills.forEach(b => {
    const p = state.players.find(p => p.name === b.name);
    if (p) p.savings += b.amount;
  });

  // un-eliminate players whose savings are now >= 0
  state.players.forEach(p => {
    if (p.eliminated && p.savings >= 0) p.eliminated = false;
  });

  state.round -= 1;
  saveState();
  renderGame();
  renderHistory();

  // restore submit button visibility in case we were on game-over
  document.getElementById('submit-round').classList.remove('hidden');
  document.getElementById('undo-btn').classList.remove('hidden');
}

/* ── history table ────────────────────────────────────────── */
function renderHistory() {
  const head = document.getElementById('history-head');
  const body = document.getElementById('history-body');
  if (!head || !body) return;

  head.innerHTML = '<th>Round</th>' +
    state.players.map(p => `<th>${p.name}</th>`).join('');

  body.innerHTML = state.history.map(h => {
    const cells = state.players.map(p => {
      const bill = h.bills.find(b => b.name === p.name);
      return `<td>${bill ? fmt(bill.amount) : '–'}</td>`;
    }).join('');
    return `<tr><td>${h.round}</td>${cells}</tr>`;
  }).join('');
}

/* ── new game button ──────────────────────────────────────── */
function newGame() {
  localStorage.removeItem('lacuenta');
  state = { players: [], round: 0, history: [] };
  showScreen('screen-setup');
}

/* ── boot ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  loadState();

  initSetup();

  document.getElementById('submit-round').addEventListener('click', submitRound);
  document.getElementById('undo-btn').addEventListener('click', undoRound);
  document.getElementById('new-game-btn').addEventListener('click', newGame);

  // resume saved game if exists
  if (state.players.length > 0) {
    renderGame();
    renderHistory();
    showScreen('screen-game');
  } else {
    showScreen('screen-setup');
  }
});
