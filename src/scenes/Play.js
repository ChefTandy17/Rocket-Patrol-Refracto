class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }
  
    create() {
          //place tile sprite
          //add.titleSprint have five parameters (x-pos, y-pos, width, height, key string what image to use)
          //"The setOrigin method chained to the end of each line tells Phaser to adjust the rectangle’s origin—
          // the point on the rectangle used to position it in coordinate space—from the default at its center to its upper left."
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
  
        //green UI background
        //using borderUISixe, borderPadding from main.js.
        //game.config.width is from Phaser 
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
  
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
  
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
  
        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
  
        // initialize score
        this.p1Score = 0
  
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        //MOD: Display time remaining
        this.p1Time = game.settings.gameTimer / 1000;   //Converts milliseconds to seconds
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#5F947C',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeLeft = this.add.text(game.config.width - borderUISize - borderPadding - 100, borderUISize + borderPadding*2, this.p1Time, timeConfig)
  
        // GAME OVER flag
        this.gameOver = false
  
        // 60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        
        //MODDED: Adding background music
        this.backgroundMusic = this.sound.add('backgroundMusic', {
            volume: 0.3,
            loop: true
        });
        this.backgroundMusic.play();
    }
  
    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
            this.backgroundMusic.stop();    //MODDED: Stop the music when the game restarts
        }
  
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
            this.backgroundMusic.stop();    //MODDED: Stop the music when the game restarts
        }
  
        this.starfield.tilePositionX -= 4
  
        if(!this.gameOver) {
            this.p1Rocket.update()  // update rocket sprite        
            this.ship01.update()    // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()

            //MOD: Since the game is not over yet, update the time remaining
            this.p1Time -= this.game.loop.delta / 1000
            this.timeLeft.text = Math.max(0, this.p1Time.toFixed(1));
            }
  
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
    }
  
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }
  
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        //MODDED: Randomize explosion sound effect
        this.explosionArray = ['sfx-explosion1', 'sfx-explosion2', 'sfx-explosion3', 'sfx-explosion4'];
        this.sound.play(this.explosionArray[Math.floor(Math.random() * this.explosionArray.length)]);
        //creates psudo-randomness by using Math.random, a common use for psudo-random, to generate a number from 0 to 1, then multiplying it by the length of the array,
        // and rounding it down using Math.floor to get a whole number from index 0 and 3

        //this.sound.play('sfx-explosion');
    }
  }