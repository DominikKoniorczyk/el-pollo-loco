import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "./imagehub.class.js";
import { SoundHub } from "./soundhub.class.js";

export class Coin extends CollectableObject {
    minHeight = 360;
    maxHeight = 60;
    offset = { top: 35, bottom: 35, left: 35, right: 35 };
    collectingSound = new Audio('./assets/audio/collectibles/collectSound.wav');
    
    constructor(world_tiles){
        super();
        this.loadImage(ImageHub.coin[0]);   
        this.loadImages(ImageHub.coin);
        this.setWorldPosition(world_tiles);
    }

    /**
     * Plays a coin animation every 250 intervals of a 10ms timer.
     * @param {number} globalIntervalCounter - Current count of the global interval.
     */
    interval10ms(globalIntervalCounter){
        if(globalIntervalCounter % 250 === 0) this.playAnimation(ImageHub.coin);
    }

    /**
     * Calls the parent class's 60 FPS update routine.
     */
    interval60FPS(){
        super.interval60FPS();
    }

    /**
     * Sets the object's world position to a random x and y coordinate.
     * @param {Array} world_tiles - Array representing the world tiles for x positioning.
     */
    setWorldPosition(world_tiles){
        this.y = this.getRandomHeight();  
        this.x = this.getRandomX(world_tiles);
    }

    /**
     * Returns a random height within the object's min and max height bounds.
     * @returns {number} Random height value.
     */
    getRandomHeight(){
        const difference = this.maxHeight - this.minHeight;
        let random = Math.random();
        return Math.floor(random * difference) + this.minHeight; 
    }
}