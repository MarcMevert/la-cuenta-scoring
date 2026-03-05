'use strict';

/* ── i18n · vanilla internationalisation ─────────────────── */
/* No external libraries – plain JS translation dictionary.  */

const I18N_TRANSLATIONS = {
  en: {
    'app.subtitle':              'The Bill · Score Tracker',
    'setup.playerCount':         'Number of Players',
    'setup.playerNames':         'Player Names (3 letters)',
    'setup.startGame':           'Start Game',
    'setup.playerLabel':         'Player {n}',
    'faq.title':                 'FAQ · Frequently Asked Questions',
    'faq.q1':                    'Is this a game to play?',
    'faq.a1':                    'This is not the full game. It helps you keep score while you play <strong>La Cuenta</strong> with the real cards.',
    'faq.q2':                    'Is it free to use?',
    'faq.a2':                    'Yes, it is completely free.',
    'faq.q3':                    'Is my data or scoring sent to someone?',
    'faq.a3':                    'No. Your scores stay on your own device and are not shared by this app.',
    'faq.q4':                    'Can I use it offline without internet?',
    'faq.a4':                    'Yes. Open it once with internet, then you can use it later without internet.',
    'faq.q5':                    'Can I install this as an app?',
    'faq.a5':                    'Yes. You can add it to your phone, tablet, or computer home screen and open it like a normal app.',
    'game.billThisRound':        'Bill this round',
    'game.round':                'Round {n}',
    'game.undo':                 '↩ Undo',
    'game.submitRound':          'Submit Round',
    'game.roundHistory':         'Round History',
    'game.newGame':              '＋ New Game',
    'game.gameOver':             'Game Over',
    'game.winnerMsg':            '🏆 <strong>{name}</strong> wins!',
    'game.remaining':            '{amount} remaining',
    'game.historyRound':         'Round',
    'game.historyTotal':         'Total',
    'validation.onlyWholeNumbers': 'Only whole numbers',
    'validation.max':            'Max {amount}'
  },

  de: {
    'app.subtitle':              'Die Rechnung · Punkte-Tracker',
    'setup.playerCount':         'Anzahl der Spieler',
    'setup.playerNames':         'Spielernamen (3 Buchstaben)',
    'setup.startGame':           'Spiel starten',
    'setup.playerLabel':         'Spieler {n}',
    'faq.title':                 'FAQ · Häufig gestellte Fragen',
    'faq.q1':                    'Ist das ein Spiel zum Spielen?',
    'faq.a1':                    'Dies ist nicht das vollständige Spiel. Es hilft dir, den Punktestand zu verfolgen, während du <strong>La Cuenta</strong> mit den echten Karten spielst.',
    'faq.q2':                    'Ist es kostenlos?',
    'faq.a2':                    'Ja, es ist völlig kostenlos.',
    'faq.q3':                    'Werden meine Daten oder Punkte an jemanden gesendet?',
    'faq.a3':                    'Nein. Deine Punkte bleiben auf deinem eigenen Gerät und werden von dieser App nicht geteilt.',
    'faq.q4':                    'Kann ich es offline ohne Internet nutzen?',
    'faq.a4':                    'Ja. Öffne es einmal mit Internet, dann kannst du es später ohne Internet nutzen.',
    'faq.q5':                    'Kann ich es als App installieren?',
    'faq.a5':                    'Ja. Du kannst es auf deinem Handy, Tablet oder Computer zum Startbildschirm hinzufügen und wie eine normale App öffnen.',
    'game.billThisRound':        'Rechnung dieser Runde',
    'game.round':                'Runde {n}',
    'game.undo':                 '↩ Rückgängig',
    'game.submitRound':          'Runde absenden',
    'game.roundHistory':         'Rundenverlauf',
    'game.newGame':              '＋ Neues Spiel',
    'game.gameOver':             'Spiel vorbei',
    'game.winnerMsg':            '🏆 <strong>{name}</strong> gewinnt!',
    'game.remaining':            '{amount} verbleibend',
    'game.historyRound':         'Runde',
    'game.historyTotal':         'Gesamt',
    'validation.onlyWholeNumbers': 'Nur ganze Zahlen',
    'validation.max':            'Max {amount}'
  },

  ca: {
    'app.subtitle':              'El Compte · Seguiment de Punts',
    'setup.playerCount':         'Nombre de Jugadors',
    'setup.playerNames':         'Noms dels Jugadors (3 lletres)',
    'setup.startGame':           'Començar Partida',
    'setup.playerLabel':         'Jugador {n}',
    'faq.title':                 'FAQ · Preguntes Freqüents',
    'faq.q1':                    'Això és un joc per jugar?',
    'faq.a1':                    'Això no és el joc complet. T\'ajuda a portar la puntuació mentre jugues a <strong>La Cuenta</strong> amb les cartes reals.',
    'faq.q2':                    'És gratuït?',
    'faq.a2':                    'Sí, és completament gratuït.',
    'faq.q3':                    'Les meves dades o puntuacions s\'envien a algú?',
    'faq.a3':                    'No. Les teves puntuacions es queden al teu propi dispositiu i no es comparteixen per aquesta app.',
    'faq.q4':                    'Puc utilitzar-lo sense connexió a internet?',
    'faq.a4':                    'Sí. Obre\'l una vegada amb internet i després el pots fer servir sense internet.',
    'faq.q5':                    'Puc instal·lar-lo com una app?',
    'faq.a5':                    'Sí. Pots afegir-lo a la pantalla d\'inici del teu mòbil, tauleta o ordinador i obrir-lo com una app normal.',
    'game.billThisRound':        'Compte d\'aquesta ronda',
    'game.round':                'Ronda {n}',
    'game.undo':                 '↩ Desfer',
    'game.submitRound':          'Enviar Ronda',
    'game.roundHistory':         'Historial de Rondes',
    'game.newGame':              '＋ Nova Partida',
    'game.gameOver':             'Fi de la Partida',
    'game.winnerMsg':            '🏆 <strong>{name}</strong> guanya!',
    'game.remaining':            '{amount} restant',
    'game.historyRound':         'Ronda',
    'game.historyTotal':         'Total',
    'validation.onlyWholeNumbers': 'Només nombres enters',
    'validation.max':            'Màx {amount}'
  },

  es: {
    'app.subtitle':              'La Cuenta · Seguimiento de Puntos',
    'setup.playerCount':         'Número de Jugadores',
    'setup.playerNames':         'Nombres de Jugadores (3 letras)',
    'setup.startGame':           'Iniciar Juego',
    'setup.playerLabel':         'Jugador {n}',
    'faq.title':                 'FAQ · Preguntas Frecuentes',
    'faq.q1':                    '¿Esto es un juego para jugar?',
    'faq.a1':                    'Esto no es el juego completo. Te ayuda a llevar la puntuación mientras juegas a <strong>La Cuenta</strong> con las cartas reales.',
    'faq.q2':                    '¿Es gratis?',
    'faq.a2':                    'Sí, es completamente gratis.',
    'faq.q3':                    '¿Mis datos o puntuaciones se envían a alguien?',
    'faq.a3':                    'No. Tus puntuaciones se quedan en tu propio dispositivo y no se comparten por esta app.',
    'faq.q4':                    '¿Puedo usarlo sin conexión a internet?',
    'faq.a4':                    'Sí. Ábrelo una vez con internet y luego puedes usarlo sin internet.',
    'faq.q5':                    '¿Puedo instalarlo como una app?',
    'faq.a5':                    'Sí. Puedes añadirlo a la pantalla de inicio de tu móvil, tableta u ordenador y abrirlo como una app normal.',
    'game.billThisRound':        'Cuenta de esta ronda',
    'game.round':                'Ronda {n}',
    'game.undo':                 '↩ Deshacer',
    'game.submitRound':          'Enviar Ronda',
    'game.roundHistory':         'Historial de Rondas',
    'game.newGame':              '＋ Nuevo Juego',
    'game.gameOver':             'Fin del Juego',
    'game.winnerMsg':            '🏆 <strong>{name}</strong> gana!',
    'game.remaining':            '{amount} restante',
    'game.historyRound':         'Ronda',
    'game.historyTotal':         'Total',
    'validation.onlyWholeNumbers': 'Solo números enteros',
    'validation.max':            'Máx {amount}'
  },

  fr: {
    'app.subtitle':              'L\'Addition · Suivi des Points',
    'setup.playerCount':         'Nombre de Joueurs',
    'setup.playerNames':         'Noms des Joueurs (3 lettres)',
    'setup.startGame':           'Commencer la Partie',
    'setup.playerLabel':         'Joueur {n}',
    'faq.title':                 'FAQ · Questions Fréquentes',
    'faq.q1':                    'Est-ce un jeu à jouer ?',
    'faq.a1':                    'Ce n\'est pas le jeu complet. Cela vous aide à suivre le score pendant que vous jouez à <strong>La Cuenta</strong> avec les vraies cartes.',
    'faq.q2':                    'Est-ce gratuit ?',
    'faq.a2':                    'Oui, c\'est entièrement gratuit.',
    'faq.q3':                    'Mes données ou scores sont-ils envoyés à quelqu\'un ?',
    'faq.a3':                    'Non. Vos scores restent sur votre propre appareil et ne sont pas partagés par cette application.',
    'faq.q4':                    'Puis-je l\'utiliser hors ligne sans internet ?',
    'faq.a4':                    'Oui. Ouvrez-le une fois avec internet, puis vous pourrez l\'utiliser plus tard sans internet.',
    'faq.q5':                    'Puis-je l\'installer comme une application ?',
    'faq.a5':                    'Oui. Vous pouvez l\'ajouter à l\'écran d\'accueil de votre téléphone, tablette ou ordinateur et l\'ouvrir comme une application normale.',
    'game.billThisRound':        'Addition de cette manche',
    'game.round':                'Manche {n}',
    'game.undo':                 '↩ Annuler',
    'game.submitRound':          'Valider la Manche',
    'game.roundHistory':         'Historique des Manches',
    'game.newGame':              '＋ Nouvelle Partie',
    'game.gameOver':             'Fin de la Partie',
    'game.winnerMsg':            '🏆 <strong>{name}</strong> gagne !',
    'game.remaining':            '{amount} restant',
    'game.historyRound':         'Manche',
    'game.historyTotal':         'Total',
    'validation.onlyWholeNumbers': 'Nombres entiers uniquement',
    'validation.max':            'Max {amount}'
  }
};

const I18N_SUPPORTED = Object.keys(I18N_TRANSLATIONS);
const I18N_DEFAULT   = 'en';

/* current language */
let i18nLang = I18N_DEFAULT;

/**
 * Return translated string for key, with optional {placeholder} replacement.
 * Falls back to English, then to the raw key.
 */
function t(key, params) {
  let str = (I18N_TRANSLATIONS[i18nLang] && I18N_TRANSLATIONS[i18nLang][key])
         || I18N_TRANSLATIONS[I18N_DEFAULT][key]
         || key;

  if (params) {
    Object.keys(params).forEach(function (k) {
      str = str.replace('{' + k + '}', params[k]);
    });
  }
  return str;
}

/**
 * Walk all elements with data-i18n / data-i18n-html attributes
 * and replace their text / innerHTML.
 */
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
}

/**
 * Set the active language, persist choice, and re-translate the page.
 * Calls the optional onLanguageChange callback so app.js can re-render
 * dynamic content.
 */
function setLang(lang) {
  if (I18N_SUPPORTED.indexOf(lang) === -1) lang = I18N_DEFAULT;
  i18nLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('lacuenta-lang', lang);

  // update manifest link
  var manifestHref = lang === I18N_DEFAULT ? 'manifest.json' : 'manifest.' + lang + '.json';
  var link = document.querySelector('link[rel="manifest"]');
  if (link) link.setAttribute('href', manifestHref);

  // highlight active language button
  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  applyTranslations();

  // notify app.js so it can re-render dynamic content
  if (typeof window.onLanguageChange === 'function') {
    window.onLanguageChange();
  }
}

/**
 * Initialise i18n: read saved preference, wire up language switcher buttons.
 */
function initI18n() {
  var saved = localStorage.getItem('lacuenta-lang') || I18N_DEFAULT;
  setLang(saved);

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.dataset.lang);
    });
  });
}
