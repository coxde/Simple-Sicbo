'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceAllEl = document.querySelectorAll('.dice');
const dice0El = document.querySelector('.dice--0');
const dice1El = document.querySelector('.dice--1');
const dice2El = document.querySelector('.dice--2');

const btnNew = document.querySelector('.btn--new');
const btnBig = document.querySelector('.btn--big');
const btnSmall = document.querySelector('.btn--small');
const btnRule = document.querySelector('.btn--rule');

let dices,
    dicesAll,
    activePlayer,
    playerActiveEl,
    scoreActiveEl,
    currentActiveEl;

// Init function
const init = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = '...';
    current1El.textContent = '...';

    dices = [0, 0, 0];
    dicesAll = 0;
    activePlayer = 0;
    playerActiveEl = document.querySelector('.player--0');
    scoreActiveEl = score0El;
    currentActiveEl = current0El;

    btnBig.classList.remove('hidden');
    btnSmall.classList.remove('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    for (let i = 0; i < dices.length; i++) {
        diceAllEl[i].classList.add('hidden');
    }
};

init();

// Switching function
const switchPlayer = function () {
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerActiveEl = document.querySelector(`.player--${activePlayer}`);
    scoreActiveEl = document.getElementById(`score--${activePlayer}`);
    currentActiveEl = document.getElementById(`current--${activePlayer}`);
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Big button (>= 11)
btnBig.addEventListener('click', function () {
    for (let i = 0; i < dices.length; i++) {
        dices[i] = Math.trunc(Math.random() * 6) + 1;
        dicesAll += dices[i];
        diceAllEl[i].classList.remove('hidden');
    }

    dice0El.src = `/img/dice-${dices[0]}.png`;
    dice1El.src = `/img/dice-${dices[1]}.png`;
    dice2El.src = `/img/dice-${dices[2]}.png`;

    document.getElementById(
        `current--${Number(!Boolean(activePlayer))}`
    ).textContent = '...';

    if (dicesAll >= 11) {
        currentActiveEl.textContent = `${dicesAll}: WIN!`;
        scoreActiveEl.textContent = Number(scoreActiveEl.textContent) + 1;

        if (scoreActiveEl.textContent >= 10) {
            playerActiveEl.classList.add('player--winner');
            btnBig.classList.add('hidden');
            btnSmall.classList.add('hidden');
            for (let i = 0; i < dices.length; i++) {
                diceAllEl[i].classList.add('hidden');
            }
        } else {
            switchPlayer();
        }
    } else {
        currentActiveEl.textContent = `${dicesAll}: LOSE...`;
        switchPlayer();
    }

    dicesAll = 0;
});

// Small button (<= 10)
btnSmall.addEventListener('click', function () {
    for (let i = 0; i < dices.length; i++) {
        dices[i] = Math.trunc(Math.random() * 6) + 1;
        dicesAll += dices[i];
        diceAllEl[i].classList.remove('hidden');
    }

    dice0El.src = `/img/dice-${dices[0]}.png`;
    dice1El.src = `/img/dice-${dices[1]}.png`;
    dice2El.src = `/img/dice-${dices[2]}.png`;

    document.getElementById(
        `current--${Number(!Boolean(activePlayer))}`
    ).textContent = '...';

    if (dicesAll <= 10) {
        currentActiveEl.textContent = `${dicesAll}: WIN!`;
        scoreActiveEl.textContent = Number(scoreActiveEl.textContent) + 1;

        if (scoreActiveEl.textContent >= 10) {
            playerActiveEl.classList.add('player--winner');
            btnBig.classList.add('hidden');
            btnSmall.classList.add('hidden');
            for (let i = 0; i < dices.length; i++) {
                diceAllEl[i].classList.add('hidden');
            }
        } else {
            switchPlayer();
        }
    } else {
        currentActiveEl.textContent = `${dicesAll}: LOSE...`;
        switchPlayer();
    }

    dicesAll = 0;
});

// New button
btnNew.addEventListener('click', init);
