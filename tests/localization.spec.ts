import { test, expect, Page } from '@playwright/test';

/* ── helpers ──────────────────────────────────────────────── */

/** Switch UI to the given locale and clear any persisted game state. */
async function setLocale(page: Page, lang: string) {
  await page.goto('/');
  await page.evaluate((l) => localStorage.setItem('lacuenta-lang', l), lang);
  await page.goto('/');
}

/** Start a 3-player game so we can verify "running game" strings. */
async function startThreePlayerGame(page: Page) {
  await page.locator('.count-btn[data-count="3"]').click();
  const nameInputs = page.locator('.name-input');
  await nameInputs.nth(0).fill('AAA');
  await nameInputs.nth(1).fill('BBB');
  await nameInputs.nth(2).fill('CCC');
  await page.locator('#start-btn').click();
}

/** Play rounds until game over (one player busts), then verify winner screen. */
async function playUntilGameOver(page: Page) {
  await page.locator('.bill-input[data-player="AAA"]').fill('900');
  await page.locator('.bill-input[data-player="BBB"]').fill('100');
  await page.locator('.bill-input[data-player="CCC"]').fill('200');
  await page.locator('#submit-round').click();
}

/* ── per-language expected strings ────────────────────────── */

interface LangStrings {
  subtitle: string;
  playerCount: string;
  playerNames: string;
  startGame: string;
  faqTitle: string;
  billThisRound: string;
  round1: string;
  undo: string;
  submitRound: string;
  roundHistory: string;
  newGame: string;
  gameOver: string;
  winsFragment: string;
  remainingFragment: string;
  historyRound: string;
  historyTotal: string;
}

const STRINGS: Record<string, LangStrings> = {
  en: {
    subtitle: 'The Bill · Score Tracker',
    playerCount: 'Number of Players',
    playerNames: 'Player Names (3 letters)',
    startGame: 'Start Game',
    faqTitle: 'FAQ · Frequently Asked Questions',
    billThisRound: 'Bill this round',
    round1: 'Round 1',
    undo: '↩ Undo',
    submitRound: 'Submit Round',
    roundHistory: 'Round History',
    newGame: '＋ New Game',
    gameOver: 'Game Over',
    winsFragment: 'wins!',
    remainingFragment: 'remaining',
    historyRound: 'Round',
    historyTotal: 'Total',
  },
  de: {
    subtitle: 'Die Rechnung · Punkte-Tracker',
    playerCount: 'Anzahl der Spieler',
    playerNames: 'Spielernamen (3 Buchstaben)',
    startGame: 'Spiel starten',
    faqTitle: 'FAQ · Häufig gestellte Fragen',
    billThisRound: 'Rechnung dieser Runde',
    round1: 'Runde 1',
    undo: '↩ Rückgängig',
    submitRound: 'Runde absenden',
    roundHistory: 'Rundenverlauf',
    newGame: '＋ Neues Spiel',
    gameOver: 'Spiel vorbei',
    winsFragment: 'gewinnt!',
    remainingFragment: 'verbleibend',
    historyRound: 'Runde',
    historyTotal: 'Gesamt',
  },
  ca: {
    subtitle: 'El Compte · Seguiment de Punts',
    playerCount: 'Nombre de Jugadors',
    playerNames: 'Noms dels Jugadors (3 lletres)',
    startGame: 'Començar Partida',
    faqTitle: 'FAQ · Preguntes Freqüents',
    billThisRound: "Compte d'aquesta ronda",
    round1: 'Ronda 1',
    undo: '↩ Desfer',
    submitRound: 'Enviar Ronda',
    roundHistory: 'Historial de Rondes',
    newGame: '＋ Nova Partida',
    gameOver: 'Fi de la Partida',
    winsFragment: 'guanya!',
    remainingFragment: 'restant',
    historyRound: 'Ronda',
    historyTotal: 'Total',
  },
  es: {
    subtitle: 'La Cuenta · Seguimiento de Puntos',
    playerCount: 'Número de Jugadores',
    playerNames: 'Nombres de Jugadores (3 letras)',
    startGame: 'Iniciar Juego',
    faqTitle: 'FAQ · Preguntas Frecuentes',
    billThisRound: 'Cuenta de esta ronda',
    round1: 'Ronda 1',
    undo: '↩ Deshacer',
    submitRound: 'Enviar Ronda',
    roundHistory: 'Historial de Rondas',
    newGame: '＋ Nuevo Juego',
    gameOver: 'Fin del Juego',
    winsFragment: 'gana!',
    remainingFragment: 'restante',
    historyRound: 'Ronda',
    historyTotal: 'Total',
  },
  fr: {
    subtitle: "L'Addition · Suivi des Points",
    playerCount: 'Nombre de Joueurs',
    playerNames: 'Noms des Joueurs (3 lettres)',
    startGame: 'Commencer la Partie',
    faqTitle: 'FAQ · Questions Fréquentes',
    billThisRound: 'Addition de cette manche',
    round1: 'Manche 1',
    undo: '↩ Annuler',
    submitRound: 'Valider la Manche',
    roundHistory: 'Historique des Manches',
    newGame: '＋ Nouvelle Partie',
    gameOver: 'Fin de la Partie',
    winsFragment: 'gagne',
    remainingFragment: 'restant',
    historyRound: 'Manche',
    historyTotal: 'Total',
  },
};

/* ── tests ────────────────────────────────────────────────── */

for (const lang of Object.keys(STRINGS)) {
  const s = STRINGS[lang];

  test.describe(`Localization – ${lang.toUpperCase()}`, () => {
    test.beforeEach(async ({ page }) => {
      await setLocale(page, lang);
    });

    test('start game screen shows translated strings', async ({ page }) => {
      await expect(page.locator('.app-subtitle')).toHaveText(s.subtitle);
      await expect(page.locator('[data-i18n="setup.playerCount"]')).toHaveText(s.playerCount);
      await expect(page.locator('[data-i18n="faq.title"]')).toHaveText(s.faqTitle);

      // Click a player count to reveal more strings
      await page.locator('.count-btn[data-count="3"]').click();
      await expect(page.locator('[data-i18n="setup.playerNames"]')).toHaveText(s.playerNames);
      await expect(page.locator('#start-btn')).toHaveText(s.startGame);
    });

    test('running game screen shows translated strings', async ({ page }) => {
      await startThreePlayerGame(page);

      await expect(page.locator('#round-label')).toHaveText(s.round1);
      await expect(page.locator('.divider')).toHaveText(s.billThisRound);
      await expect(page.locator('#undo-btn')).toHaveText(s.undo);
      await expect(page.locator('#submit-round')).toHaveText(s.submitRound);
      await expect(page.locator('.history-title')).toHaveText(s.roundHistory);
      await expect(page.locator('#new-game-btn')).toHaveText(s.newGame);

      // Verify history table headers
      await expect(page.locator('#history-head th').first()).toHaveText(s.historyRound);
      await expect(page.locator('#history-body tr.history-total td').first()).toHaveText(s.historyTotal);
    });

    test('game end – winner screen shows translated strings', async ({ page }) => {
      await startThreePlayerGame(page);
      await playUntilGameOver(page);

      await expect(page.locator('#round-label')).toHaveText(s.gameOver);
      const winnerMsg = page.locator('.winner-msg');
      await expect(winnerMsg).toContainText(s.winsFragment);
      await expect(winnerMsg).toContainText(s.remainingFragment);
      await expect(winnerMsg).toContainText('BBB');
    });
  });
}
