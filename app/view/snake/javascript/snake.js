/*!
 * Lightweight Snake Game Engine v1.0.0
 * 
 * Written by Sabrina J. Ward
 * JS code for a small leightweight game to put in `waiter` loading screens to
 * alleviate boredom.
 *
 */

class SnakeGame {
  static LeftKey = 37;
  static RightKey = 39;
  static UpKey = 38;
  static DownKey = 40;
  
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  constructor(canvas_id) {
    this.canvas = document.getElementById(canvas_id);
	  this.canvas.width = 400;
	  this.canvas.height = 400;
    this.context = this.canvas.getContext('2d');
	  this.resetGame();
	  this.keyPressHandler = this.processKeyPressEvent.bind(this);
	  document.addEventListener('keydown', this.keyPressHandler);
  }
    
  resetSnake () {
    this.snake = {
      x: 160,
      y: 160,
      
      // snake velocity. moves one grid length every frame in either the x or y direction
      dx: this.grid,
      dy: 0,
    
      // keep track of all grids the snake body occupies
      cells: [],
      // length of the snake. grows when eating an apple
      maxCells: 4
    }
  }
  
  resetApple () {
    this.apple = {
      x: 320,
      y: 320
    }
  }
  
  resetGame () {
    // The canvas width & height, snake x & y, and the apple x & y, all need to be a multiples of the grid size in order for collision detection to work
    // (e.g. 16 * 25 = 400)
    this.grid  = 16;
    this.count = 0;
	  this.resetSnake();
    this.resetApple();
  }
    
  moveApple () {
    // canvas is 400x400 which is 25x25 grids
    this.apple.x = SnakeGame.getRandomInt(0, 25) * this.grid;
    this.apple.y = SnakeGame.getRandomInt(0, 25) * this.grid;
  }
    
  wrapVerticalPos (pos) {
    if (pos < 0) {
      return this.canvas.height - this.grid;
    } else if (pos >= this.canvas.height) {
      return 0;
    } else {
      return pos;
    }
  }
    
  wrapHorizontalPos (pos) {
    if (pos < 0) {
      return this.canvas.width - this.grid;
    } else if (pos >= this.canvas.width) {
      return 0;
    } else {
      return pos;
    }
  }
    
  moveSnake () {
    this.snake.x = this.wrapHorizontalPos(this.snake.x + this.snake.dx);
    this.snake.y = this.wrapVerticalPos(this.snake.y + this.snake.dy);
    
    // keep track of where snake has been. front of the array is always the head
    this.snake.cells.unshift({x: this.snake.x, y: this.snake.y});
    // remove cells as we move away from them
    if (this.snake.cells.length > this.snake.maxCells) {
      this.snake.cells.pop();
    }
  }
  
  drawApple () {
    // draw apple
    this.context.fillStyle = 'red';
    this.context.fillRect(this.apple.x, this.apple.y, this.grid - 1, this.grid - 1);
  }
  
  drawSnakeCell (cell, index) {
	// drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    this.context.fillRect(cell.x, cell.y, this.grid - 1, this.grid - 1);
	// snake ate apple
    if (cell.x === this.apple.x && cell.y === this.apple.y) {
      this.snake.maxCells++;
      this.moveApple();
    }
	
	// check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < this.snake.cells.length; i++) {
    
      // snake occupies same space as a body part. reset game
      if (cell.x === this.snake.cells[i].x && cell.y === this.snake.cells[i].y) {
        this.resetSnake();
        this.moveApple();
      }
    }
  }
  
  drawSnake () {
    // draw snake one cell at a time
    this.context.fillStyle = 'green';
	  var self = this;
    this.snake.cells.forEach(function(cell, index) { self.drawSnakeCell(cell, index); });
  }
  
  clearCanvas () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  moveUp () {
	  this.snake.dy = -this.grid;
    this.snake.dx = 0;
  }
  
  moveDown () {
	  this.snake.dy = this.grid;
    this.snake.dx = 0;
  }
  
  moveLeft () {
	  this.snake.dx = -this.grid;
    this.snake.dy = 0;
  }
  
  moveRight() {
	  this.snake.dx = this.grid;
    this.snake.dy = 0;
  }
  
  processKeyPressEvent (e) {
    var key = e.which;
	  if (key === SnakeGame.LeftKey && this.snake.dx === 0) {
      this.moveLeft();
    } else if (key === SnakeGame.UpKey && this.snake.dy === 0) {
      this.moveUp();
    } else if (key === SnakeGame.RightKey && this.snake.dx === 0) {
      this.moveRight();
    } else if (key === SnakeGame.DownKey && this.snake.dy === 0) {
      this.moveDown();
    }
  }
  
  loop() {
    requestAnimationFrame(this.loop.bind(this));
    
    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    if (++this.count < 4) {
      return;
    }
    this.count = 0;
    
    this.clearCanvas();
    this.moveSnake();
    this.drawApple();
    this.drawSnake();
  }
  
}