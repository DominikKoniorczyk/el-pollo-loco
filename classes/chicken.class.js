import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./imagehub.class.js";

export class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 363;
    standingGroundY = 363;
    offset = { top: 5, bottom: 10, left: 5, right: 10 };
    shouldDrawCollisionFrame = true;

    constructor(){
        super();
        super.loadImage(ImageHub.chicken.walk[0]);
        super.loadImages(ImageHub.chicken.walk);
        this.calculateSpeeds();  
    }

    calculateSpeeds(){
        this.x = 200 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.5; 
    }

    interval60FPS(){
        super.interval60FPS();
        this.moveLeft();
    }

    interval10ms(globalIntervalCounter){
        if(globalIntervalCounter % 110 === 0){
            this.animate();
        }
    }

    animate(){
        this.playAnimation(ImageHub.chicken.walk);   
    }
}