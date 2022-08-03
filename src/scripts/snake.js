import { Config } from './config';
import { Helper } from './helper';

export class Snake {
    game;
    snakeBody;
    newSegments;

    constructor(game) {
        this.game = game;
        this.reset();
    }

    reset = () => {
        this.snakeBody = [];
        this.newSegments = 0;
        const gridCenter = Math.ceil(Config.GRID_SIZE / 2);
        this.snakeBody.push({ x: gridCenter, y: gridCenter });
    };

    update = () => {
        this.addSegments();

        const direction = this.game.getDirection();
        const currentHeadPosition = this.getHead();
        const newHeadPosition = {
            x: currentHeadPosition.x + direction.x,
            y: currentHeadPosition.y + direction.y,
        };

        // remove last tail segment
        this.snakeBody.pop();

        if (Config.ALLOW_SNAKE_TELEPORT) {
            if (Helper.isOffGridByCoordinate('x', newHeadPosition)) {
                if (newHeadPosition.x > Config.GRID_SIZE) {
                    newHeadPosition.x = 1;
                } else {
                    newHeadPosition.x = Config.GRID_SIZE;
                }
            }

            if (Helper.isOffGridByCoordinate('y', newHeadPosition)) {
                if (newHeadPosition.y > Config.GRID_SIZE) {
                    newHeadPosition.y = 1;
                } else {
                    newHeadPosition.y = Config.GRID_SIZE;
                }
            }
        }

        // add new head segment
        this.snakeBody.unshift(newHeadPosition);
    };

    draw = (gameBoard) => {
        this.snakeBody.forEach((segment, index, segments) => {
            Helper.drawSegment(
                'snake',
                segment.x,
                segment.y,
                gameBoard,
                Config.ALLOW_SNAKE_GRADIENT
                    ? () => {
                          const brightness = index / segments.length + 1;
                          return { filter: `brightness(${brightness})` };
                      }
                    : {}
            );

            // Add direction lines
            if (Config.ALLOW_SNAKE_DIRECTION_LINES && segments.length > 1) {
                const nextSegment = segments[index + 1] || null;
                const prevSegment = segments[index - 1] || null;

                for (let compSegment of [nextSegment, prevSegment]) {
                    if (compSegment !== null) {
                        if (compSegment.x > segment.x) {
                            Helper.drawSegment(
                                'direction-right',
                                segment.x,
                                segment.y,
                                gameBoard
                            );
                        }

                        if (compSegment.x < segment.x) {
                            Helper.drawSegment(
                                'direction-left',
                                segment.x,
                                segment.y,
                                gameBoard
                            );
                        }

                        if (compSegment.y > segment.y) {
                            Helper.drawSegment(
                                'direction-down',
                                segment.x,
                                segment.y,
                                gameBoard
                            );
                        }

                        if (compSegment.y < segment.y) {
                            Helper.drawSegment(
                                'direction-up',
                                segment.x,
                                segment.y,
                                gameBoard
                            );
                        }
                    }
                }
            }
        });
    };

    expand = () => {
        this.newSegments += Config.EXPANSION_RATE;
    };

    isOnSnake = (position, { ignoreHead = false } = {}) => {
        return this.snakeBody.some((segment, index) => {
            if (ignoreHead && index === 0) return false;
            return this.isEqual(segment, position);
        });
    };

    getHead = () => {
        return this.snakeBody[0];
    };

    isIntersected = () => {
        return this.isOnSnake(this.getHead(), { ignoreHead: true });
    };

    isEqual = (pos1, pos2) => {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    };

    addSegments = () => {
        for (let i = 0; i < this.newSegments; i++) {
            this.snakeBody.push({
                ...this.snakeBody[this.snakeBody.length - 1],
            });
        }

        this.newSegments = 0;
    };
}
