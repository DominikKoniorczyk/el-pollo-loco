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

    jump(){
        setInterval(() => {
            if(this.isInAir() || this.speedY > 0){
                this.playAnimation(ImageHub.character.jump);
            }}, 200);
    }

    animate(){

        setInterval(() => {
            if(this.world.keyboard.RIGHT && (this.x < this.world.level.level_end_x - 720)){
                this.x += this.speed;
                this.otherDirection = false;
            } else if(this.world.keyboard.LEFT && this.x > 100){
                this.x -= this.speed;
                this.otherDirection = true;
            } else if(this.world.keyboard.SPACE && !this.isInAir()){
                this.speedY = this.jump_height;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        this.walking();       
        this.jump(); 
    }

    walking(){
        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                this.playAnimation(ImageHub.character.walk);
            }
        }, 50);
    }
}
