class Character extends MovableObject {
    width = 122;
    height = 240;
    y = 80; //190;
    speed = 10;
    standing_ground_y = 185;

    constructor(){
        super();
        this.applyGravity();
        this.loadImage(ImageHub.character.idle[0]);
        this.loadImages(ImageHub.character.walk);
        this.loadImages(ImageHub.character.jump);
        this.animate();
    }

    animate(){

        setInterval(() => {
            if(this.world.keyboard.RIGHT && (this.x < this.world.level.level_end_x - 720)){
                this.moveRight();
            } else if(this.world.keyboard.LEFT && this.x > 100){
                this.moveLeft();
            }
            if(this.world.keyboard.SPACE && !this.isInAir()){
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        this.walking();       
        this.jumpAnimtion(); 
    }

    walking(){
        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.isInAir() && !this.world.keyboard.SPACE){
                this.playAnimation(ImageHub.character.walk);
            }
        }, 50);
    }

    jumpAnimtion(){
        setInterval(() => {
            if(this.isInAir() || this.speedY > 0){
                this.playAnimation(ImageHub.character.jump);
            }}, 200);
    }
}
