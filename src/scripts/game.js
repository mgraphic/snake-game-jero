import { Config } from './config';
import { Food } from './food';
import { Snake } from './snake';
import { Helper } from './helper';

export class Game {
    gameBoard;
    gameOverElement;
    gameOver;
    food;
    snake;
    speed;
    lastRenderTime;
    currentDirection;
    previousDirection;

    constructor(gameBoard) {
        this.reset();
        this.gameBoard = gameBoard;
        this.snake = new Snake(this);
        this.food = new Food(this);
        this.init();
    }

    init = () => {
        this.gameOverElement = document.querySelector('.gameover');
        this.gameBoard.style.gridTemplateRows = `repeat(${Config.GRID_SIZE}, 1fr)`;
        this.gameBoard.style.gridTemplateColumns = `repeat(${Config.GRID_SIZE}, 1fr)`;
        this.addListener();
    };

    run = () => {
        window.requestAnimationFrame(this.cycle);
    };

    reset = () => {
        this.speed = Config.SNAKE_SPEED;
        this.lastRenderTime = 0;
        this.gameOver = false;
        this.currentDirection = { x: 0, y: 0 };
        this.previousDirection = { x: 0, y: 0 };
    };

    cycle = (currentTime) => {
        if (this.gameOver) {
            // if (confirm('Sorry you lost - Press OK to start new game')) {
            //     window.location.reload();
            //     return;
            // }

            this.gameOverElement.style.display = '';

            setTimeout(() => {
                this.snake.reset();
                this.food.reset();
                this.reset();
                this.gameOverElement.style.display = 'none';
                window.requestAnimationFrame(this.cycle);
            }, 3000);

            return;
        }

        window.requestAnimationFrame(this.cycle);

        const secondsSinceLastRender =
            (currentTime - this.lastRenderTime) / 1000;

        if (secondsSinceLastRender < 1 / this.speed) {
            return;
        }

        this.lastRenderTime = currentTime;

        this.update();
        this.draw();
    };

    addListener = () => {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    if (this.previousDirection.y === 0) {
                        this.currentDirection = { x: 0, y: -1 };
                    }
                    break;
                case 'ArrowDown':
                    if (this.previousDirection.y === 0) {
                        this.currentDirection = { x: 0, y: 1 };
                    }
                    break;
                case 'ArrowLeft':
                    if (this.previousDirection.x === 0) {
                        this.currentDirection = { x: -1, y: 0 };
                    }
                    break;
                case 'ArrowRight':
                    if (this.previousDirection.x === 0) {
                        this.currentDirection = { x: 1, y: 0 };
                    }
                    break;
            }
        });
    };

    updateDirection = () => {
        this.previousDirection = this.currentDirection;
    };

    getDirection = () => {
        return this.currentDirection;
    };

    getSnake = () => {
        return this.snake;
    };

    getFood = () => {
        return this.food;
    };

    goFaster = () => {
        this.speed += Config.SNAKE_SPEED_RATE;
    };

    update = () => {
        this.updateDirection();
        this.snake.update();
        this.food.update();
        this.checkDeath();
    };

    draw = () => {
        this.gameBoard.innerHTML = '';
        this.snake.draw(this.gameBoard);
        this.food.draw(this.gameBoard);
    };

    checkDeath = () => {
        this.gameOver =
            (!Config.ALLOW_SNAKE_TELEPORT &&
                Helper.isOutsideGrid(this.snake.getHead())) ||
            this.snake.isIntersected();
    };
}
