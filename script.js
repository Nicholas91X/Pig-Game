'use strict';

// --- SELEZIONI GLI ELEMENTI ---
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerSection0 = document.querySelector('.player--0');
const playerSection1 = document.querySelector('.player--1');

// --- SET CONDIZIONI INIZIALI ---

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  playerSection0.classList.remove('player--winner');
  playerSection1.classList.remove('player--winner');
  playerSection0.classList.add('player--active');
  playerSection1.classList.remove('player--active');
};

init();
// --- TIRARE IL DADO ---

//   - FUNZIONE SWITCH PLAYER -
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  switchGrafica();
};

// - FUNZIONE SWITCH GRAFICA -
const switchGrafica = function () {
  playerSection0.classList.toggle('player--active');
  playerSection1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing === true) {
    // - GENERO NUMERO -
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //   -MOSTRO IL DADO -
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    //   - CONTROLLO GLI 1 -
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// -- HOLD RISULTATO LANCIO DADI --

// - FUNZIONE HOLD -

btnHold.addEventListener('click', function () {
  if (playing === true) {
    // - AGGIUNGO PUNTEGGIO AL GIOCATORE ATTIVO -
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // - CONTROLLO PUNTEGGIO GLOBALE < 100 -
    // - FINE GIOCO -
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
    // - CAMBIO GIOCATORE -
  }
});

// ---REFRESH BUTTON ---
btnNew.addEventListener('click', function () {
  init();
});
