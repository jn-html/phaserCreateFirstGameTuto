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
var platforms;

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

        this.physics.add.collider(player, platforms);
        
    }

function update () {

}
