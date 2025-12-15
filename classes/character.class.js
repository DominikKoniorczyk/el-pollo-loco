class Character extends MovableObject {
    width = 122;
    height = 240;
    y = 190;
    world;
    speed = 10;

    constructor(){
        super();
        super.loadImage(ImageHub.character.idle[0]);
        super.loadImages(ImageHub.character.walk);
        this.animate();
    }

    jump(){

    }

    animate(){

        setInterval(() => {
            if(this.world.keyboard.RIGHT && (this.x < this.world.level.level_end_x - 720)){
                this.x += this.speed;
                this.otherDirection = false;
            } else if(this.world.keyboard.LEFT && this.x > 100){
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                const i = this.currentImageIndex % ImageHub.character.walk.length;
                const path = ImageHub.character.walk[i];
                this.img = this.imageCache[path];
                this.currentImageIndex++;
            }
        }, 50);
    }
}