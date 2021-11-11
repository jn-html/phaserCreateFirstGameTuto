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

var platforms;

    function create (){
      this.add.image(400, 300, 'sky');

      platforms = this.physics.add.staticGroup();

      platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      platforms.create(600, 400, 'ground');
      platforms.create(50, 250, 'ground');
      platforms.create(750, 220, 'ground');
    }

function update () {

}
