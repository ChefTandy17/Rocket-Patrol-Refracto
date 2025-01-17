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


