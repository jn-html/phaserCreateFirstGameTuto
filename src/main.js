import Phaser from "phaser";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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

function create () {
  // this.add.image(0, 0, 'sky').setOrigin(0, 0),
  // reset draw pos to top-left instead of center
  this.add.image(400, 300, 'sky');
  // order image are display matches the order they're place in
  // if we put star first it will be covered by sky
  this.add.image(400, 300, 'star');
}

function update () {

}
