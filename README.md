# 🍽️ La Cuenta – Score Tracker

A mobile-friendly score tracker for the **La Cuenta** (*The Bill*) card game by [2 Tomatoes Games](https://2tomatoesgames.com).

> **Note:** This is a scoring app only. You need the original physical card game to play — this app does not replace it.

---

## About the Game

**La Cuenta** is a card game for **3–8 players** in which everyone starts the game with a modest savings account. Each round, fate deals out restaurant bills — and someone has to pay. Players who spend beyond their means go bankrupt and are eliminated. The last person still solvent wins!

| Players | Starting Savings |
|--------:|-----------------|
| 3       | 900 €           |
| 4       | 1.000 €         |
| 5       | 1.100 €         |
| 6       | 1.200 €         |
| 7       | 1.300 €         |
| 8       | 1.400 €         |

Each round, enter the bill amount each active player must pay. Any player whose savings drop below zero is **eliminated**. Play continues until only one player remains — that player is the winner!

> 🎲 Find the game on BoardGameGeek: [La Cuenta (BGG)](https://boardgamegeek.com/boardgame/437581/la-cuenta)

---

## About This App

This is a **Progressive Web App (PWA)** that replaces pen-and-paper score tracking at the table.

**Features:**
- Enter 3–8 player names (up to 3 letters each)
- Track savings after each round
- Automatic elimination when savings go negative
- Round history table
- Undo last round
- Saves state to `localStorage` — resume a game after closing the browser
- Installable on iOS and Android as a home-screen app

---

## Technical Summary

| Item            | Detail                                      |
|-----------------|---------------------------------------------|
| Stack           | Vanilla HTML · CSS · JavaScript (ES6+)      |
| No dependencies | Zero build step, zero npm packages          |
| PWA             | `manifest.json` + Service Worker (`sw.js`)  |
| State           | `localStorage` (key: `lacuenta`)            |
| Icons           | SVG (192 × 192 and 512 × 512)               |
| Currency format | German locale (`de-DE`), EUR                |

To run locally, simply open `index.html` in any modern browser — no server required.