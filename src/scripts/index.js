import '../styles/index.scss';
import { Game } from './game';

document.addEventListener('DOMContentLoaded', (event) => {
    const gameBoard = document.getElementById('game-board');
    const game = new Game(gameBoard);

    game.run();
});
