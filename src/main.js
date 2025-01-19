//Tyvin Tandy
//Rocket Patrol: The Cooler Version
//Approx Time:
//Mods Used:
/////Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
////Create 4 new explosion sound effects and randomize which one plays on impact (3)
////Display the time remaining (in seconds) on the screen (3)


//Citations: 

//To create a screen using Phaser
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [ Menu, Play ] //"The scene property expects an array with the object names of any Phaser scenes we’ve created."
}

//creating a live server of Phaser
let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

//reserve keyboard bindings that will be defined in play.js
//keyboard variables in the global scope
let keyFIRE, keyRESET, keyLEFT, keyRIGHT


