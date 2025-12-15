class Character extends MovableObject {
    width = 122;
    height = 240;
    y = 190;
    speed = 10;
    standing_ground_y = 190;
    offset = { top: 95, bottom: 105, left: 30, right: 60 };

    constructor(){
        super();
        this.applyGravity();
        this.loadImage(ImageHub.character.idle[0]);
        this.loadImages(ImageHub.character.walk);
        this.loadImages(ImageHub.character.jump);
        this.loadImages(ImageHub.character.death);
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
        setInterval(() => {
            this.walking();       
            this.jumpAnimation();
            this.checkLifeState();
        }, 50); 
    }

    walking(){
        if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.isInAir() && !this.world.keyboard.SPACE && !this.checkIsDead()){
            this.playAnimation(ImageHub.character.walk);
        }
    }

    jumpAnimation(){
        if(this.isInAir() || this.speedY > 0 && !this.checkIsDead()){
            this.playAnimation(ImageHub.character.jump);
        }
    }

    checkLifeState(){
        if(this.checkIsDead()){
            this.playAnimation(ImageHub.character.death);
            if(!this.isInAir() && this.speedY <= 0){
                this.standing_ground_y = 1000;
                this.jump();
            }
        }
    }
}
