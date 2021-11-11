import Phaser from "phaser";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300},
      debug: false
    }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload () {
  this.load.image('sky', require('../public/assets/images/sky.png'));
  this.load.image('ground', require('../public/assets/images/platform.png'));
  this.load.image('star', require('../public/assets/images/star.png'));
  this.load.image('bomb', require('../public/assets/images/bomb.png'));
  this.load.spritesheet('dude', 
    require('../public/assets/images/dude.png'),
    { frameWidth: 32, frameHeight: 48 }
  );
}

    function create (){
      // Game Background
      this.add.image(400, 300, 'sky');

      // Ground Logic
      platforms = this.physics.add.staticGroup();

      platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      platforms.create(600, 400, 'ground');
      platforms.create(50, 250, 'ground');
      platforms.create(750, 220, 'ground');

      // Player logic
      player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // keyboard event listener
        cursors = this.input.keyboard.createCursorKeys();

        // Star Popping Logic
        stars = this.physics.add.group({
          key: 'star',
          // 1 child +11 repeat = 12
          repeat: 11,
          // x +70 for each repeat
          setXY: { x: 12, y: 0, stepX: 70 }
      });

      // iterate each child for bounce
      stars.children.iterate(function (child) {

          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

      });

      bombs = this.physics.add.group();

      scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

      // player collider with platforms
      this.physics.add.collider(player, platforms);
      // Star and Ground Collider
      this.physics.add.collider(stars, platforms);
      this.physics.add.collider(bombs, platforms);

      // check to see if the player overlaps with a star
      this.physics.add.overlap(player, stars, collectStar, null, this);
        
      this.physics.add.collider(player, bombs, hitBomb, null, this);
    }

function update () {
  if (gameOver)
    {
      return;
    }

  // Movement Logic
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    }
    else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
  }

  // When start collected, it delete
  function collectStar (player, star) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);
  if (stars.countActive(true) === 0)
    {
      //  A new batch of stars to collect
      stars.children.iterate(function (child) {

          child.enableBody(true, child.x, 0, true, true);

      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;

  }
}

function hitBomb (player, bomb)
{
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}
