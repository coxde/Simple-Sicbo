'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceAllEl = document.querySelectorAll('.dice');
const dice0El = document.querySelector('.dice--0');
const dice1El = document.querySelector('.dice--1');
const dice2El = document.querySelector('.dice--2');

const btnNew = document.querySelectorAll('.btn--new');
const btnAI = document.querySelector('.btn--ai');
const btnBig = document.querySelector('.btn--big');
const btnSmall = document.querySelector('.btn--small');

const modal = document.querySelector('.rule-modal');
const overlay = document.querySelector('.rule-overlay');
const btnOpenRule = document.querySelector('.btn--rule');
const btnCloseRule = document.querySelector('.close-modal');

let dices,
    dicesAll,
    activePlayer,
    isAIRunning,
    playerActiveEl,
    scoreActiveEl,
    currentActiveEl;

// Init function
const init = function () {
    name0El.textContent = 'Player 1';
    name1El.textContent = 'Player 2';
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = '...';
    current1El.textContent = '...';

    dices = [0, 0, 0];
    dicesAll = 0;
    activePlayer = 0;
    isAIRunning = false;
    playerActiveEl = document.querySelector('.player--0');
    scoreActiveEl = score0El;
    currentActiveEl = current0El;

    btnBig.classList.remove('hidden');
    btnSmall.classList.remove('hidden');
    btnAI.classList.remove('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    for (let i = 0; i < dices.length; i++) {
        diceAllEl[i].classList.add('hidden');
    }
};

init();

// Reset current score function
const resetCurrent = function () {
    document.getElementById(
        `current--${Number(!Boolean(activePlayer))}`
    ).textContent = '...';
};

// Switching function
const switchPlayer = function () {
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerActiveEl = document.querySelector(`.player--${activePlayer}`);
    scoreActiveEl = document.getElementById(`score--${activePlayer}`);
    currentActiveEl = document.getElementById(`current--${activePlayer}`);
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Dices generator function
const dicesGenerator = function () {
    for (let i = 0; i < dices.length; i++) {
        dices[i] = Math.trunc(Math.random() * 6) + 1;
        dicesAll += dices[i];
        diceAllEl[i].classList.remove('hidden');
    }

    dice0El.src = `img/dice-${dices[0]}.png`;
    dice1El.src = `img/dice-${dices[1]}.png`;
    dice2El.src = `img/dice-${dices[2]}.png`;
};

// Current winner function
const currentWinner = function () {
    currentActiveEl.textContent = `${dicesAll}: WIN!`;
    scoreActiveEl.textContent = Number(scoreActiveEl.textContent) + 1;
};

// Current loser function
const currentLoser = function () {
    currentActiveEl.textContent = `${dicesAll}: LOSE...`;
};

// Final winner function
const winner = function () {
    if (scoreActiveEl.textContent >= 10) {
        playerActiveEl.classList.add('player--winner');
        document.getElementById(
            `name--${activePlayer}`
        ).textContent = `Player ${activePlayer + 1} 🎉`;
        btnBig.classList.add('hidden');
        btnSmall.classList.add('hidden');
        btnAI.classList.add('hidden');
        for (let i = 0; i < dices.length; i++) {
            diceAllEl[i].classList.add('hidden');
        }
    } else {
        switchPlayer();
    }
};

// Open and close modal function
const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// Sleep function
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

//////////////////////////////////////////////////////

// Big button (>= 11)
btnBig.addEventListener('click', function () {
    dicesGenerator();
    resetCurrent();

    if (dicesAll >= 11) {
        currentWinner();
        winner();
    } else {
        currentLoser();
        switchPlayer();
    }

    dicesAll = 0;
});

// Small button (<= 10)
btnSmall.addEventListener('click', function () {
    dicesGenerator();
    resetCurrent();

    if (dicesAll <= 10) {
        currentWinner();
        winner();
    } else {
        currentLoser();
        switchPlayer();
    }

    dicesAll = 0;
});

// New button
for (let i = 0; i < btnNew.length; i++) {
    btnNew[i].addEventListener('click', init);
}

// Rule button
btnOpenRule.addEventListener('click', openModal);

btnCloseRule.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// AI button
btnAI.addEventListener('click', async function () {
    isAIRunning = true;
    btnAI.classList.add('hidden');
    while (scoreActiveEl.textContent < 10 && isAIRunning) {
        if (Math.random() >= 0.5) {
            btnBig.click();
            await sleep(500);
        } else {
            btnSmall.click();
            await sleep(500);
        }
    }
});
