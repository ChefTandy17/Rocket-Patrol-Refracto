class Menu extends Phaser.Scene{
  constructor(){
      super("menuScene");
  }

  preload(){
      //load images/tile sprites
      //load.images(string of the graphic, url of the graphic is located)
      this.load.image('rocket', './assets/rocket.png')
      this.load.image('spaceship', './assets/spaceship.png')
      this.load.image('starfield', './assets/starfield.png')
      
      // load spritesheet
      this.load.spritesheet('explosion', './assets/explosion.png', {
          frameWidth: 64,
          frameHeight: 32,
          startFrame: 0,
          endFrame: 9
      })

      //load audio from assets
      this.load.audio('sfx-select','./assets/sfx-select.wav')
      this.load.audio('sfx-explosion','./assets/sfx-explosion.wav')
      this.load.audio('sfx-shot','./assets/sfx-shot.wav')
  }

  create(){
   //to create animation
  this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
      frameRate: 30
  })
      
  let menuConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      aligh: 'right',
      padding: {
      top: 5,
      botton: 5, 
      },
      fixedWidth: 0
  }


  //displays menu texts
  this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL',
  menuConfig).setOrigin(0.5)
  this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
  menuConfig.backgroundColor = '#00FF00'
  menuConfig.color = '#000'
  this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding,  'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)
  
  menuConfig.fixedWidth = 0
  this.clock = this.time.delayedCall(60000, () => { //Phaser calling a function after a delay. 60,000 is 60 seconds
      this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
      this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5)
      this.gameOver = true //flag set to true
      }, null, this)

      //this.add.text(20, 20, "Rocket Patrol Menu") 
      //this.scene.start("playScene");
  
  //define keys
  keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
  keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
  }


  update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000    
        }
        this.sound.play('sfx-select')
        this.scene.start('playScene')    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
        game.settings = {
          spaceshipSpeed: 4,
          gameTimer: 45000    
        }
        this.sound.play('sfx-select')
        this.scene.start('playScene')    
      }
    }
}