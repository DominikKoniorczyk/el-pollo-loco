class Character extends MovableObject {
    width = 122;
    height = 240;
    y = 190;

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
            const i = this.currentImageIndex % ImageHub.character.walk.length;
            const path = ImageHub.character.walk[i];
            this.img = this.imageCache[path];
            this.currentImageIndex++;
        }, 1000 / 10);
    }
}