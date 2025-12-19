import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "./imagehub.class.js";

export class Coin extends CollectableObject {
    minHeight = 360;
    maxHeight = 60;
    offset = { top: 35, bottom: 35, left: 35, right: 35 };

    
    constructor(world_tiles){
        super();
        this.loadImage(ImageHub.coin[0]);   
        this.loadImages(ImageHub.coin);
        this.setWorldPosition(world_tiles);
    }

    interval10ms(globalIntervalCounter){
        if(globalIntervalCounter % 250 === 0) this.playAnimation(ImageHub.coin);
    }

    interval60FPS(){
        super.interval60FPS();
    }

    setWorldPosition(world_tiles){
        this.y = this.getRandomHeight();  
        this.x = this.getRandomX(world_tiles);
    }

    getRandomHeight(){
        const difference = this.maxHeight - this.minHeight;
        let random = Math.random();
        return Math.floor(random * difference) + this.minHeight; 
    }
}