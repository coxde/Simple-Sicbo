'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const dice0El = document.querySelector('.dice--0');
const dice1El = document.querySelector('.dice--1');
const dice2El = document.querySelector('.dice--2');

const btnNew = document.querySelector('.btn--new');
const btnBig = document.querySelector('.btn--big');
const btnSmall = document.querySelector('.btn--small');
const btnRule = document.querySelector('.btn--rule');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = '...';
current1El.textContent = '...';
