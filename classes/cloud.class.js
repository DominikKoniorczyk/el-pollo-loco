import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
    y = 0;
    width = 720;
    height = 480;
    
    constructor(imagePath, xPos, tiles){
        super();
        super.loadImage(imagePath);
        this.x = xPos;
        this.world_tiles = tiles;
    }
    
    interval60FPS(){
        super.interval60FPS();
        this.moveLeft();
    }

    moveLeft(){
        super.moveLeft();
        this.checkIfOffScreen();
    }
}