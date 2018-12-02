const modal = document.querySelector('.modal');
const replay = document.getElementById('reset');
// Enemies our player must avoid
class Enemy {
  constructor(speed, x, y) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-pink-girl.png';
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
  this.collision();
};

//the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.speed = 100;
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

// END OF THE GAME
Player.prototype.end = function() {
  return this.y <= 50 ? true : false;
}
// congratulations popup modal
Player.prototype.update = function(dt) {
  if (this.end()) {
    modal.classList.toggle('show');
    this.x = 200;
    this.y = 400;
  }
};

// check collisions
Enemy.prototype.collision = function() {
  if (
    player.x  + 40 >= this.x &&
    this.x + 40 >= player.x &&
    player.y + 40 >= this.y &&
    this.y + 40 >= player.y
  ) {
    player.x = 200;
    player.y = 400;
  }
}

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

replay.addEventListener('click', function() {
  modal.classList.add('show');
});
