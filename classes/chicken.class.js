class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 365;

    constructor(){
        super();
        super.loadImage(ImageHub.chicken.walk[0]);
        super.loadImages(ImageHub.chicken.walk);
        this.calculateSpeeds();
        this.animate();      
    }

    calculateSpeeds(){
        this.x = 200 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.5; 
        this.animation_interval = 1000 / (this.speed * 10); 
    }

    animate(){
        this.moveLeft();
        setInterval(() => {
            const i = this.currentImageIndex % ImageHub.chicken.walk.length;
            const path = ImageHub.chicken.walk[i];
            this.img = this.imageCache[path];
            this.currentImageIndex++;
        }, this.animation_interval);
    }
}