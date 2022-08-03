import { Helper } from './helper';

export class Food {
    game;
    foodPellet;

    constructor(game) {
        this.game = game;
        this.reset();
    }

    reset = () => {
        this.foodPellet = this.getRandomFoodPosition();
    };

    update = () => {
        if (this.game.getSnake().isOnSnake(this.foodPellet)) {
            this.game.getSnake().expand();
            this.game.goFaster();
            this.foodPellet = this.getRandomFoodPosition();
        }
    };

    draw = (gameBoard) => {
        Helper.drawSegment(
            'food',
            this.foodPellet.x,
            this.foodPellet.y,
            gameBoard
        );
    };

    getRandomFoodPosition = () => {
        let newFoodPosition;

        while (
            newFoodPosition == null ||
            this.game.getSnake().isOnSnake(newFoodPosition)
        ) {
            newFoodPosition = Helper.randomGridPosition();
        }

        return newFoodPosition;
    };
}
