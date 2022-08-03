# Snake Game

## Generated from Webpack Frontend Starterkit

[![Dependabot badge](https://flat.badgen.net/dependabot/wbkd/webpack-starter?icon=dependabot)](https://dependabot.com/)

A simple snake game based from Web Dev Simplified.
https://www.youtube.com/watch?v=QTcIXok9wNY

Working Demo: http://kmarshall.com/snake-game/

### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Features:

-   Gameplay gets faster each time you successfully eat a food pellet
-   Optional snake teleport for when the snake travels off the game board, it reappears on the oppisite side
-   Optional gradient through the snake body to easily help identify the head of the snake
-   Direction lines drawn in the snake body to show where the snake direction is going
-   Customizable configuration in one place
-   Customizable SASS CSS options

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
