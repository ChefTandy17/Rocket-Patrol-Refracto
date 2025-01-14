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
    }


    create(){
        this.add.text(20, 20, "Rocket Patrol Menu") 
        this.scene.start("playScene");
    }
}