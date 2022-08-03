import { Config } from './config';

export class Helper {
    static randomGridPosition() {
        return {
            x: Math.floor(Math.random() * Config.GRID_SIZE) + 1,
            y: Math.floor(Math.random() * Config.GRID_SIZE) + 1,
        };
    }

    static isOutsideGrid(position) {
        return (
            this.isOffGridByCoordinate('x', position) ||
            this.isOffGridByCoordinate('y', position)
        );
    }

    static isOffGridByCoordinate(coordinate, position) {
        return (
            position[coordinate] < 1 || position[coordinate] > Config.GRID_SIZE
        );
    }

    static drawSegment(className, x, y, gameBoard, optionalStyles = {}) {
        const gridElement = document.createElement('div');

        gridElement.style.gridRowStart = y;
        gridElement.style.gridColumnStart = x;
        gridElement.classList.add(className);

        if (typeof optionalStyles === 'function') {
            optionalStyles = optionalStyles(gridElement);
        }

        for (let style of Object.keys(optionalStyles)) {
            gridElement.style[style] = optionalStyles[style];
        }

        gameBoard.appendChild(gridElement);
    }
}
