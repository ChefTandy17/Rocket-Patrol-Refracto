//MODDED:Supership prefab
class Supership extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        //MODDED: To give the supership a unique speed
        this.moveSpeed = game.settings.supershipSpeed
    
        //From Phaser, to change the size of the supership
        this.setDisplaySize(16,22)
    }

    update(){
        this.x -= this.moveSpeed

        if(this.x <= 0 - this.width){
            this.x = game.config.width
        }
    }
    
    //reset
    reset(){
        this.x = game.config.width
    }
}