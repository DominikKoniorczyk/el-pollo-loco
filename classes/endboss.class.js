import { ImageHub } from "./imagehub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {
    height = 400;
    width = 343;
    y = 60;
    otherDirection = true;
    offset = { top: 80, bottom: 150, left: 25, right: 70 };
    shouldDrawCollisionFrame = true;

    constructor(world_tiles, size){
        super();
        this.x = (world_tiles * 720) - 720;
        this.height = size.height;
        this.width = size.width;
        super.loadImage(ImageHub.endboss.alert[0]);
        super.loadImages(ImageHub.endboss.alert);
        this.animate();
    }

    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
        if(globalIntervalCounter % 200 === 0){
            this.animate();
        }
    }
    
    animate(){
        this.playAnimation(ImageHub.endboss.alert);
    }
}