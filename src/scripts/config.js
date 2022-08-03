export class Config {
    /**
     * Grid Size (squared)
     */
    static GRID_SIZE = 21;

    /**
     * How many snake body segments the snake grows
     * after eating each food pellet
     */
    static EXPANSION_RATE = 6;

    /**
     * How fast the snake travels
     * grid blocks moved per second
     */
    static SNAKE_SPEED = 6;

    /**
     * How much speed increments when snake eats food
     * increased grid blocks moved per second
     */
    static SNAKE_SPEED_RATE = 0.1;

    /**
     * Allow snake to teleport on oppisite side of grid when
     * the snake travels outside of the grid space
     */
    static ALLOW_SNAKE_TELEPORT = false;

    /**
     * Allow snake segments to get brighter in color
     * as snake segments continue to grow
     */
    static ALLOW_SNAKE_GRADIENT = true;

    /**
     * Allow snake segments to include direction line
     */
    static ALLOW_SNAKE_DIRECTION_LINES = false;
}
