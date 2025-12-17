import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "./imagehub.class.js";

export class Coin extends CollectableObject {
    minHeight = 360;
    maxHeight = 60;
    offset = { top: 30, bottom: 60, left: 30, right: 60 };

    
    constructor(world_tiles){
        super();
        this.loadImage(ImageHub.coin);   
        this.setWorldPosition(world_tiles);
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