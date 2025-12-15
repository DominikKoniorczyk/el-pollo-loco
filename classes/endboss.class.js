class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;

    constructor(){
        super();
        this.x = (this.world.level.world_tiles * 720) - 1020;
        console.log(this.x);
        
        super.loadImage(ImageHub.endboss.alert[0]);
        super.loadImages(ImageHub.endboss.alert);
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(ImageHub.endboss.alert);
        }, 200);
    }
}