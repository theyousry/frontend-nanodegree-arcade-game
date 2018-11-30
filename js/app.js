// Enemies our player must avoid
class Enemy {
  constructor(speed, x, y) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
  }
};

//the enemy's position
Enemy.prototype.update = function(dt) {
  let renderSpeed = this.speed * dt;
  if (this.x < 400) {
    this.x = this.x + renderSpeed;
  } else {
    this.x = 0;
  }
};

//the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
  constructor() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 400;
  }
}

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case 'left':
      if (this.x >= 40) {
        this.x = this.x - 40;
      }
      break;
    case 'right':
      if (this.x <= 360) {
        this.x = this.x + 40;
      }
      break;
    case 'up':
      if (this.y >= 40) {
        this.y = this.y - 40;
      }
      break;
    case 'down':
      if (this.y <= 360) {
        this.y = this.y + 40;
      }
    }
  }

let player = new Player();

// all enemies positions
let allEnemies = [new Enemy(250,1,300),new Enemy(300,0,65) ,new Enemy(100,1,145), new Enemy(200, 0, 230)];

// listens for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
