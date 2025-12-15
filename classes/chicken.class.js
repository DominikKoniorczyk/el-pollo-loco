class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 363;
    standingGroundY = 363;
    offset = { top: 5, bottom: 10, left: 5, right: 10 };

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
        setInterval(() => { 
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(ImageHub.chicken.walk);
        }, this.animation_interval);
    }
}