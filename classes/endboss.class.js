class Endboss extends MovableObject {
    height = 400;
    width = 343;
    y = 60;

    constructor(world_tiles, size){
        super();
        this.x = (world_tiles * 720) - 720;
        this.height = size.height;
        this.width = size.width;
        super.loadImage(ImageHub.endboss.alert[0]);
        super.loadImages(ImageHub.endboss.alert);
        this.animate();
    }

    interval10ms(){
        super.interval10ms();
        if(this.ms_counter % 200 === 0){
            this.animate();
        }
    }
    
    animate(){
        this.playAnimation(ImageHub.endboss.alert);
    }
}